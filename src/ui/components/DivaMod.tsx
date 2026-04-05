import React, {useEffect, useState} from "react";
import './DivaMod.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faCircleMinus} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";
import DMALogo from '../assets/divamodarchive.png';
import GameBananaLogo from '../assets/gamebanana.png';
import {ModJSONData} from "../../types/ui";

export default function ({name, author, enabled, version, imageUrl, path, refresh, edit_mode, priority, is_last, onClickUp, onClickDown, mod_site, mod_json, updatable, callbackSetUpdatable}: {
    // this is getting ridiculous
    name: string,
    author: string,
    enabled: boolean,
    version: string,
    path: string,
    imageUrl?: string,
    refresh: CallableFunction,
    edit_mode: boolean,
    priority?: number,
    is_last: boolean,
    onClickUp?: CallableFunction,
    onClickDown?: CallableFunction,
    mod_site: 'none' | 'dma' | 'gamebanana',
    mod_json?: ModJSONData,
    updatable: 'unknown' | 'yes' | 'no',
    callbackSetUpdatable: CallableFunction
}) {
    const {t} = useTranslation();

    const [modEnabled, setModEnabled] = useState(enabled);
    const [imageShown, setImageShown] = useState(imageUrl != undefined);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [updateText, setUpdateText] = useState(t('ui.manage.mod.update_checking'));
    const [updateTextColor, setUpdateTextColor] = useState('');
    const [allowUpdating, setAllowUpdating] = useState(false);


    useEffect(() => {
        if (mod_site == 'none') return setUpdateText('');
        // jank ass way of not spamming requests after checking once ig
        if (updatable != 'unknown') {
            if (updatable == 'yes') {
                setUpdateTextColor('blue');
                setUpdateText(t('ui.manage.mod.updatable'));
                setAllowUpdating(true);
            } else setUpdateText('');
            return;
        }

        // dma update checker
        // TODO: Add check to make sure names match/add confirmation (DMA is reusing IDs???)
        if (mod_site == 'dma') {
            const current_mod_time = new Date(mod_json.lastupdate || Date.now())

            try {
                fetch(`https://divamodarchive.com/api/v1/posts/${mod_json.id}`).then(res => {
                    if (!res.ok) {
                        setUpdateTextColor('red');
                        setUpdateText(t('ui.manage.mod.update_failed'));
                        return;
                    }

                    res.json().then(data => {
                        console.log(data);

                        if (data.name != mod_json.name) {
                            setUpdateTextColor('red');
                            setUpdateText(t('ui.manage.mod.update_failed_mismatch'));
                            return;
                        }

                        const post_date = new Date(data.time);
                        if (post_date.getTime() > current_mod_time.getTime()) {
                            setUpdateTextColor('blue');
                            setUpdateText(t('ui.manage.mod.updatable'));
                            setAllowUpdating(true);
                            callbackSetUpdatable(name);
                            return;
                        }
                        else setUpdateText('');
                    }).catch(err => {
                        console.error(err);
                        setUpdateTextColor('red');
                        setUpdateText(t('ui.manage.mod.update_failed'));
                        return;
                    });
                });
            } catch (err) {
                console.error(err);
                setUpdateTextColor('red');
                setUpdateText(t('ui.manage.mod.update_failed'));
                return;
            }
        }

        // gamebanana updating doesn't need metadata checks
        // because they're sane and don't reuse ids
        if (mod_site == 'gamebanana') {
            // @ts-expect-error .at() works fine, ts just complaining for no reason
            const gb_id = mod_json.homepage.split('/').at(-1);
            const url = `https://gamebanana.com/apiv11/Mod/${gb_id}/Updates?_nPage=1&_nPerpage=5`
            fetch(url).then(resp => {
                if (!resp.ok) {
                    setUpdateTextColor('red');
                    setUpdateText(t('ui.manage.mod.update_failed'));
                    return;
                }

                try {
                    resp.json().then(data => {
                        console.log(data);
                        if (data._aRecords[0]._sVersion != version) {
                            setUpdateTextColor('blue');
                            setUpdateText(t('ui.manage.mod.updatable'));
                            setAllowUpdating(true);
                            return;
                        } else setUpdateText('');
                    });
                } catch (err) {
                    console.error(err);
                    setUpdateTextColor('red');
                    setUpdateText(t('ui.manage.mod.update_failed'));
                    return;
                }
            });
        }
    }, []);

    return (
        <>
            <div className={"yadmm-mod"}>
                <div className={"left"}>
                    {edit_mode && <p className={"priority"}>{priority + 1}</p>}

                    <div className={"left-content"}>
                        <div className={"top"}>
                            <p>{name}</p>

                            {mod_site == 'dma' && <img
                                className={"dma-logo"}
                                alt={"DMA Logo"}
                                data-tooltip-id={"mod-site-tooltip"}
                                data-tooltip-content={t('ui.manage.mod.dma')}
                                data-tooltip-place={"top"}
                                src={DMALogo}/>}

                            {mod_site == 'gamebanana' && <img
                                className={"gb-logo"}
                                alt={"GameBanana Logo"}
                                data-tooltip-id={"mod-site-tooltip"}
                                data-tooltip-content={t('ui.manage.mod.gamebanana')}
                                data-tooltip-place={"top"}
                                src={GameBananaLogo}/>}
                        </div>

                        <p>{author} - {version != 'null' ? version : t('ui.manage.mod.no_version')} <span
                            className={"update-text " + updateTextColor}
                            onClick={() => {
                                if (!allowUpdating) return;
                                if (confirm(t('ui.manage.mod.update_confirm'))) {
                                    setAllowUpdating(false);
                                    setUpdateText(t('ui.manage.mod.updating'))
                                    window.electronAPI.updateMod(path).then(success => {
                                        if (success) alert(t('ui.manage.mod.update_ok'))
                                        else alert(t('ui.manage.mod.update_download_fail'))
                                    })
                                }
                            }}
                        >{updateText}</span>
                        </p>
                    </div>
                </div>

                {!edit_mode && <div className={"right"}>
                    <button
                        disabled={buttonDisabled}
                        className={modEnabled ? "enabled" : "disabled"}
                        onClick={() => {
                            setButtonDisabled(true);
                            window.electronAPI.toggleModEnabled(path, !modEnabled)
                            setModEnabled(!modEnabled)
                            setTimeout(() => setButtonDisabled(false), 500);
                        }}
                    >{modEnabled ? t('ui.manage.mod.enabled') : t('ui.manage.mod.disabled')}</button>
                    <button
                        data-tooltip-id={"uninstall-tooltip"}
                        data-tooltip-content={t('ui.manage.mod.uninstall')}
                        data-tooltip-place={"top"}
                        className={"uninstall-mod"}
                        onClick={() => {
                            const confirmation = confirm(`Are you sure you want to uninstall ${name}?`);
                            if (confirmation) window.electronAPI.uninstallMod(path).then((success) => {
                                if (!success) alert('Mod could not be uninstalled due to some error.');
                                else alert('Mod was uninstalled successfully.');

                                return refresh();
                            });
                        }}
                    >
                        <FontAwesomeIcon icon={faCircleMinus}/>
                    </button>
                </div>}


                {edit_mode && <div className={"right"}>
                    <button
                        data-tooltip-id={"move-up-tooltip"}
                        data-tooltip-content={t('ui.manage.mod.move_up')}
                        data-tooltip-place={"left"}
                        className={"move-mod"}
                        disabled={priority == 0}
                        onClick={() => onClickUp()}
                    >
                        <FontAwesomeIcon icon={faArrowUp}/>
                    </button>
                    <button
                        data-tooltip-id={"move-down-tooltip"}
                        data-tooltip-content={t('ui.manage.mod.move_down')}
                        data-tooltip-place={"left"}
                        className={"move-mod"}
                        disabled={is_last}
                        onClick={() => onClickDown()}
                    >
                        <FontAwesomeIcon icon={faArrowDown}/>
                    </button>
                </div>}
            </div>
        </>
    )
}