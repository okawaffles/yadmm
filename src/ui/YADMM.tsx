import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import ManagePage from "./pages/ManagePage";
import SettingsPage from "./pages/SettingsPage";


export default function() {
    // probably replace this in the future with a proper navigation library
    const [managePageShown, setManagePageShown] = useState(false);
    const [settingsPageShown, setSettingsPageShown] = useState(false);
    const [selectedPage, setSelectedPage] = useState('none');

    const handlePageChange = function(page: 'manage' | 'download' | 'settings') {
        switch (page) {
            case "manage":
                setSettingsPageShown(false);
                setManagePageShown(true);
                setSelectedPage('manage');
                break;

            case "download":
                alert('Download is not implemented yet, sorry.');
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
            <NavBar selectedPage={selectedPage} callback={handlePageChange} />

            { managePageShown &&
                <ManagePage />
            }

            { settingsPageShown &&
                <SettingsPage />
            }
        </>
    )
}