import React, {useState} from "react";
import './DivaMod.css';


export default function({name, author, enabled, version}: {name: string, author: string, enabled: boolean, version: string}) {
    const [modEnabled, setModEnabled] = useState(enabled);

    return(
        <>
            <div className={"yadmm-mod"}>
                <div className={"left"}>
                    <p>{name}</p>
                    <p>{author} - {version}</p>
                </div>

                <div className={"right"}>
                    <button
                        className={modEnabled ? "enabled" : "disabled"}
                        onClick={() => setModEnabled(!modEnabled)}
                    >{modEnabled ? "Enabled" : "Disabled"}</button>
                    <button className={"disabled"}>Uninstall</button>
                </div>
            </div>
        </>
    )
}