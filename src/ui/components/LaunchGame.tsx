import React, {useState} from "react";
import './LaunchGame.css';

export default function() {
    const [disabled, setDisabled] = useState(false);

    return(
        <>
            <button
                disabled={disabled}
                className={"yadmm-launch"}
                onClick={() => {
                    setDisabled(true);
                    window.electronAPI.launchGame().then(() => {
                        setDisabled(false);
                    });
                }}
            >Launch</button>
        </>
    )
}