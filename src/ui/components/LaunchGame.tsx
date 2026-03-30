import React, {useEffect, useState} from "react";
import './LaunchGame.css';

export default function() {
    const [disabled, setDisabled] = useState(false);
    const [label, setLabel] = useState('Launch');
    let was_launched = false;

    useEffect(() => {
        window.electronAPI.onGameStatusUpdate((data) => {
            if (data.status) {
                setLabel('Running');
                setDisabled(true);
                was_launched = true;
            } if (!data.status && was_launched) {
                setLabel('Launch');
                setDisabled(false);
            }
        });
    }, [])

    return(
        <>
            <button
                disabled={disabled}
                className={"yadmm-launch"}
                onClick={() => {
                    setDisabled(true);
                    setLabel('Launching...');
                    if (!window.electronAPI.cfg_checkGamePath()) {
                        alert("You must set the path to your Project Diva install first!");
                        return setDisabled(false);
                    }
                    window.electronAPI.launchGame().then(() => {
                        was_launched = true;
                    });
                }}
            >{label}</button>
        </>
    )
}