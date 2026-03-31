import React, {useEffect, useState} from "react";
import './GenericPage.css';
import DivaMod from "../components/DivaMod";
import {Tooltip} from "react-tooltip";
import {Mod} from "../../types/ui";
import {useTranslation} from "react-i18next";

export default function({callbackDmlStatus}: {callbackDmlStatus: CallableFunction}) {
    const [modsLoaded, setModsLoaded] = useState(false);
    const [modList, setModList] = useState([] as Array<Mod>);
    const [loadingText, setLoadingText] = useState('Loading mods, please wait...');
    const [showOnlyEnabled, setShowOnlyEnabled] = useState(false);

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
                                setShowOnlyEnabled(!showOnlyEnabled);
                            }}
                        >{t('ui.manage.toggles.enabled')}</button>
                        <button className={"yadmm-toggle-button"}>{t('ui.manage.toggles.priority')}</button>
                    </div>
                </div>
                { modsLoaded &&
                    <div className={"yadmm-mod-list"}>
                        {modList.filter(showOnlyEnabled ? (mod) => mod.enabled : () => true).map((item) => (
                            <DivaMod
                                version={item.version}
                                name={item.name}
                                enabled={item.enabled}
                                author={item.author}
                                key={item.id}
                                path={item.path}
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
                            />
                        ))}
                        <Tooltip id={'uninstall-tooltip'}></Tooltip>
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