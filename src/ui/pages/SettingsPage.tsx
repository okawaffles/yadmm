import React, {useEffect, useState} from "react";
import './GenericPage.css';
import {useTranslation} from "react-i18next";
import i18n from "../../core/i18n";

export default function() {
    const [pathValue, setPathValue] = useState('');
    const [currentPath, setCurrentPath] = useState('Not Set');
    const [debugString, setDebugString] = useState('yadmm debug string');
    const {t} = useTranslation();

    useEffect(() => {
        setCurrentPath(window.electronAPI.cfg_getGamePath());
        setDebugString(window.electronAPI.getDebugString());
    }, []);

    return(
        <>
            <div className={"yadmm-page"}>
                <div className={"header"}>
                    <h1 className={"title"}>{t('ui.settings.title')}</h1>
                </div>

                <div className={"path-setup"}>
                    <h2>{t('ui.settings.path.heading')}</h2>
                    <p>{t('ui.settings.path.desc')}</p>
                    <p>{t('ui.settings.must_set')}</p>
                    <p className={"current-path"}>{t('ui.settings.path.current_path')} [ {currentPath} ]</p>
                    <div className={"options"}>
                        <input
                            value={pathValue}
                            placeholder={"path/to/your/diva"}
                            onChange={(e) => setPathValue(e.target.value)}
                        />
                        <button
                            className={"yadmm-button-submit"}
                            onClick={() => {
                                window.electronAPI.cfg_setGamePath(pathValue)
                                const valid = window.electronAPI.cfg_checkGamePath();
                                if (!valid) return alert(t('ui.settings.path.bad_path'));
                                alert(t('ui.settings.path.good_path'));
                                setCurrentPath(pathValue);
                            }}
                        >{t('ui.settings.path.update')}</button>
                    </div>
                </div>

                <div className={"language"}>
                    <h2>{t('ui.settings.lang.heading')}</h2>
                    <select
                        value={i18n.language}
                        onChange={(e) => {
                            i18n.changeLanguage(e.target.value).then(() => {
                                window.electronAPI.cfg_setLang(e.target.value as 'en' | 'es' | 'ja');
                            })
                        }}
                    >
                        <option value={'en'}>English (USA)</option>
                        <option value={'es'}>Español (LATAM)</option>
                    </select>
                </div>

                <footer>
                    <p>{debugString}</p>
                    <p>{t('ui.settings.made_with_love')} <a onClick={() => window.electronAPI.openKoFi()}>ko-fi</a></p>
                </footer>
            </div>
        </>
    )
}