import React, {useEffect, useState} from "react";
import './LaunchGame.css';
import {useTranslation} from "react-i18next";

export default function() {
    const {t} = useTranslation();
    const [disabled, setDisabled] = useState(false);
    const [label, setLabel] = useState(t('ui.navbar.launch.ready'));
    let was_launched = false;


    useEffect(() => {
        window.electronAPI.onGameStatusUpdate((data) => {
            if (data.status) {
                setLabel(t('ui.navbar.launch.ready'));
                setDisabled(true);
                was_launched = true;
            } if (!data.status && was_launched) {
                setLabel(t('ui.navbar.launch.running'));
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
                    setLabel(t('ui.navbar.launch.in_progress'));
                    if (!window.electronAPI.cfg_checkGamePath()) {
                        alert(t('ui.navbar.launch.bad_path'));
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