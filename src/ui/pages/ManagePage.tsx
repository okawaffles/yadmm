import React, {useEffect, useState} from "react";
import './GenericPage.css';
import DivaMod from "../components/DivaMod";
import {Tooltip} from "react-tooltip";
import {Mod, ModWithPriority} from "../../types/ui";
import {useTranslation} from "react-i18next";

export default function({callbackDmlStatus}: {callbackDmlStatus: CallableFunction}) {
    const [modsLoaded, setModsLoaded] = useState(false);
    const [modList, setModList] = useState([] as Array<Mod>);
    const [modListByPriority, setModListByPriority] = useState([] as Array<ModWithPriority>);
    const [loadingText, setLoadingText] = useState('Loading mods, please wait...');
    const [showOnlyEnabled, setShowOnlyEnabled] = useState(false);
    const [editPriorityMode, setEditPriorityMode] = useState(false);

    const {t} = useTranslation();

    function loadModList() {
        setLoadingText(t('ui.manage.loading'));
        window.electronAPI.getInstalledMods().then((result: {
                success: boolean;
                dml_found: boolean;
                mods: Array<Mod>;
                error?: string;
            }) => {
            callbackDmlStatus(result.dml_found);
            if (!result.success) {
                setModsLoaded(false);
                return setLoadingText(t('ui.manage.failed'));
            }

            setModList(result.mods);

            if (result.mods.length == 0) {
                setLoadingText(t('ui.manage.no_mods'));
            } else setModsLoaded(true);
        })
    }

    function loadModPriorities() {
        setLoadingText(t('ui.manage.loading_priority'));
        setModsLoaded(false);
        window.electronAPI.getModsPriority().then(result => {
            if (!result.success) return setLoadingText(result.error)
            if (result.mods.length == 0) {
                setLoadingText(t('ui.manage.no_mods'));
                setModListByPriority([]);
            } else {
                setModListByPriority(result.mods);
                setModsLoaded(true);
            }
        });
    }
    function saveModPriorities() {
        if (modListByPriority.length == 0) return loadModList();
        setLoadingText(t('ui.manage.saving_priority'));
        setModsLoaded(false);
        window.electronAPI.saveModsPriority(modListByPriority).then(() => {
            setModsLoaded(true);
        });
    }

    function moveModPriorityUp(priority_id: number) {
        const modified_mod_list: Array<ModWithPriority> = [];
        // arrays are so weird man
        modListByPriority.forEach(mod => {
            modified_mod_list.push(mod);
        });
        modified_mod_list.find(m => m.priority == priority_id).priority--;
        modified_mod_list.find(m => m.priority == priority_id - 1).priority++;
        console.log(modified_mod_list);
        setModListByPriority(modified_mod_list);
    }
    function moveModPriorityDown(priority_id: number) {
        const modified_mod_list: Array<ModWithPriority> = [];
        // arrays are so weird man
        modListByPriority.forEach(mod => {
            modified_mod_list.push(mod);
        });
        console.log(modified_mod_list.find(m => m.priority == priority_id));
        modified_mod_list.find(m => m.priority == priority_id + 1).priority--;
        modified_mod_list.find(m => m.priority == priority_id).priority++;
        console.log(modified_mod_list.find(m => m.priority == priority_id));
        setModListByPriority(modified_mod_list);
    }

    useEffect(() => {
        loadModList();
    }, [])

    return(
        <>
            <div className={"yadmm-page yadmm-manage"}>
                <div className={"header"}>
                    <h1 className={"title"}>{t('ui.manage.title')}</h1>
                    <div className={"toggles"}>
                        <button
                            className={"yadmm-toggle-button " + (showOnlyEnabled ? 'enabled' : '')}
                            onClick={() => {
                                if (editPriorityMode) return;
                                setShowOnlyEnabled(!showOnlyEnabled);
                            }}
                            data-tooltip-id={editPriorityMode ? "enable-priority-locked" : undefined}
                            data-tooltip-content={t('ui.manage.toggles.enable_locked')}
                            data-tooltip-place={"bottom"}
                            disabled={editPriorityMode}
                        >{t('ui.manage.toggles.enabled')}</button>
                        <button
                            className={"yadmm-toggle-button " + (editPriorityMode ? 'enabled' : '')}
                            onClick={() => {
                                setShowOnlyEnabled(!editPriorityMode);
                                setEditPriorityMode(!editPriorityMode);
                                if (!editPriorityMode) loadModPriorities();
                                else saveModPriorities();
                            }}
                        >{t('ui.manage.toggles.priority')}</button>
                    </div>
                    { editPriorityMode &&
                        <p>{t('ui.manage.toggles.priority_warning')}</p>
                    }
                </div>
                { modsLoaded &&
                    <div className={"yadmm-mod-list"}>
                        {(!editPriorityMode ? modList : modListByPriority)
                            .filter(showOnlyEnabled ? (mod) => mod.enabled : () => true)
                            .sort(editPriorityMode ? (a: ModWithPriority, b: ModWithPriority) => a.priority - b.priority : () => 0)
                            .map((item) => (
                            <DivaMod
                                version={item.version}
                                name={item.name}
                                enabled={item.enabled}
                                author={item.author}
                                key={item.id}
                                path={item.path}
                                edit_mode={editPriorityMode}
                                priority={editPriorityMode ? (item as ModWithPriority).priority : 0}
                                refresh={() => {
                                    setModsLoaded(false)
                                    // I add an artificial delay here because
                                    // it generally just "feels" better as a user.
                                    // It gives an impression of, "oh, something just happened,
                                    // now I need to refresh because it DID happen".
                                    // I don't run this on launch though, because it feels better
                                    // when the app opens snappily
                                    // That's just my thought process. Open for debate.
                                    setTimeout(loadModList, 500)
                                    // loadModList()
                                }}
                                imageUrl={item.imageUrl || undefined}
                                is_last={ modListByPriority
                                    .sort((a, b) => a.priority - b.priority)
                                    .indexOf(item as ModWithPriority) == modListByPriority.length - 1
                                }
                                onClickUp={() => moveModPriorityUp((item as ModWithPriority).priority)}
                                onClickDown={() => moveModPriorityDown((item as ModWithPriority).priority)}
                            />
                        ))}
                        <Tooltip id={'uninstall-tooltip'}></Tooltip>
                        <Tooltip id={'move-up-tooltip'}></Tooltip>
                        <Tooltip id={'move-down-tooltip'}></Tooltip>
                        <Tooltip id={'enable-priority-locked'}></Tooltip>
                    </div>
                }

                { !modsLoaded &&
                    <div className={"flex-centered"}>
                        <h2>{loadingText}</h2>
                    </div>
                }
            </div>
        </>
    )
}