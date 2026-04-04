import React from "react";

import './NavBar.css';
import NavTab from "./NavTab";
import LaunchGame from "./components/LaunchGame";
import {useTranslation} from "react-i18next";
import DMLNotice from "./components/DMLNotice";

export default function({callback, selectedPage, dmlStatus, dmlRawText}: {callback: CallableFunction, selectedPage: string, dmlStatus: 'ok' | 'not-found' | 'out-of-date' | 'raw-text', dmlRawText?: string}) {
    const {t} = useTranslation();

    return(
        <>
            <div className={"yadmm-topbar"}>
                <div className={"left"}>
                    <h1>yadmm</h1>
                    <hr className={"vertical-divider"} />
                    <NavTab onClick={() => callback('manage')} name={t('ui.navbar.manage')} active={selectedPage == 'manage'} />
                    <NavTab onClick={() => callback('download')} name={t('ui.navbar.download')} active={selectedPage == 'download'} />
                </div>

                <div className={"right"}>
                    { dmlStatus != 'ok' &&
                        <DMLNotice notice={dmlStatus} rawText={dmlRawText} />
                    }
                    <LaunchGame />
                    <NavTab onClick={() => callback('settings')} name={t('ui.navbar.settings')} active={selectedPage == 'settings'} />
                </div>
            </div>
        </>
    )
}