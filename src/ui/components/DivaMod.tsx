import React, {useState} from "react";
import './DivaMod.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faCircleMinus} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";


export default function({name, author, enabled, version, imageUrl, path, refresh, edit_mode, priority, is_last, onClickUp, onClickDown}: {
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
}) {
    const [modEnabled, setModEnabled] = useState(enabled);
    const [imageShown, setImageShown] = useState(imageUrl != undefined);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const {t} = useTranslation();

    return(
        <>
            <div className={"yadmm-mod"}>
                <div className={"left"}>
                    {imageUrl && (
                        <div className={"left-image"}>
                            {imageShown && <img src={imageUrl} alt={""} onError={() => {setImageShown(false)}} />}
                        </div>
                    )}

                    { edit_mode && <p className={"priority"}>{priority + 1}</p> }

                    <div className={"left-content"}>
                        <p>{name}</p>
                        <p>{author} - {version != 'null' ? version : t('ui.manage.mod.no_version')}</p>
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