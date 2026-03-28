import React, {useState} from "react";
import './DivaMod.css';


export default function({name, author, enabled, version, imageUrl, path}: {name: string, author: string, enabled: boolean, version: string, path: string, imageUrl?: string}) {
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
                    <button className={"disabled"}>Uninstall</button>
                </div>
            </div>
        </>
    )
}