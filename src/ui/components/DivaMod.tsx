import React, {useState} from "react";
import './DivaMod.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleMinus} from "@fortawesome/free-solid-svg-icons";


export default function({name, author, enabled, version, imageUrl, path, refresh}: {name: string, author: string, enabled: boolean, version: string, path: string, imageUrl?: string, refresh: CallableFunction}) {
    const [modEnabled, setModEnabled] = useState(enabled);
    const [imageShown, setImageShown] = useState(imageUrl != undefined);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    return(
        <>
            <div className={"yadmm-mod"}>
                <div className={"left"}>
                    {imageUrl && (
                        <div className={"left-image"}>
                            {imageShown && <img src={imageUrl} alt={""} onError={() => {setImageShown(false)}} />}
                        </div>
                    )}

                    <div className={"left-content"}>
                        <p>{name}</p>
                        <p>{author} - {version}</p>
                    </div>
                </div>

                <div className={"right"}>
                    <button
                        disabled={buttonDisabled}
                        className={modEnabled ? "enabled" : "disabled"}
                        onClick={() => {
                            setButtonDisabled(true);
                            window.electronAPI.toggleModEnabled(path, !modEnabled)
                            setModEnabled(!modEnabled)
                            setTimeout(() => setButtonDisabled(false), 500);
                        }}
                    >{modEnabled ? "Enabled" : "Disabled"}</button>
                    <button
                        data-tooltip-id={"uninstall-tooltip"}
                        data-tooltip-content={"Uninstall"}
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
                        <FontAwesomeIcon icon={faCircleMinus} />
                    </button>
                </div>
            </div>
        </>
    )
}