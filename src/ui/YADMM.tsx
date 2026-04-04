import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import ManagePage from "./pages/ManagePage";
import SettingsPage from "./pages/SettingsPage";
// import '../core/i18n';
import {useTranslation} from "react-i18next";
import i18n from "../core/i18n";

export default function() {
    // probably replace this in the future with a proper navigation library
    const [managePageShown, setManagePageShown] = useState(false);
    const [settingsPageShown, setSettingsPageShown] = useState(false);
    const [selectedPage, setSelectedPage] = useState('none');
    const [dmlStatus, setDmlStatus] = useState('ok' as 'ok' | 'not-found' | 'out-of-date' | 'raw-text');
    const [dmlRawText, setDmlRawText] = useState('');
    const [updateCheckRan, setUpdateCheckRan] = useState(false);
    const [updatables, setUpdatables] = useState([] as Array<string>);

    const {t} = useTranslation();

    useEffect(() => {
        window.electronAPI.cfg_getLang().then((r) => {
            if (i18n.language == r) return;
            i18n.changeLanguage(r);
        });
    }, []);

    window.electronAPI.onDownloadProgressUpdate((data) => {
        if (data.status == 'downloading') {
            setDmlStatus('raw-text');
            setDmlRawText(`Downloading mod update ${data.percent}%`)
        }

        if (data.status == 'installing') {
            setDmlStatus('raw-text');
            setDmlRawText(`Installing mod update...`)
        }

        if (data.status == 'done') {
            setDmlStatus('raw-text');
            setDmlRawText(`Update complete!`);
            setTimeout(() => {
                setDmlStatus('ok');
            }, 3_000);
        }
    });

    const handlePageChange = function(page: 'manage' | 'download' | 'settings') {
        switch (page) {
            case "manage":
                console.log(!updateCheckRan ? 'update check not ran yet' : updatables);
                setSettingsPageShown(false);
                setManagePageShown(true);
                setSelectedPage('manage');
                break;

            case "download":
                alert(t('ui.navbar.download_none'));
                break;

            case "settings":
                setSettingsPageShown(true);
                setManagePageShown(false);
                setSelectedPage('settings');
                break;
        }
    }


    useEffect(() => {
        const valid_path = window.electronAPI.cfg_checkGamePath();
        if (valid_path) handlePageChange('manage')
        else handlePageChange('settings')
    }, [])

    return(
        <>
            <NavBar dmlStatus={dmlStatus} dmlRawText={dmlRawText} selectedPage={selectedPage} callback={handlePageChange} />

            { managePageShown &&
                <ManagePage callbackDmlStatus={(found: boolean) => {
                    setDmlStatus(found ? 'ok' : 'not-found');
                }}
                updatables={{checked: updateCheckRan, list: updatables}}
                callbackAddUpdatable={(mod_name: string) => {
                    const u = updatables;
                    u.push(mod_name);
                    setUpdatables(u);
                    setUpdateCheckRan(true);
                }}
                />
            }

            { settingsPageShown &&
                <SettingsPage />
            }
        </>
    )
}