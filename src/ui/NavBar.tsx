import React from "react";

import './NavBar.css';
import NavTab from "./NavTab";
import LaunchGame from "./components/LaunchGame";
import DMMNotice from "./components/DMLNotice";
import {useTranslation} from "react-i18next";

export default function({callback, selectedPage, dmlStatus}: {callback: CallableFunction, selectedPage: string, dmlStatus: 'ok' | 'not-found' | 'out-of-date'}) {
    const {t} = useTranslation();

    return(
        <>
            <div className={"yadmm-topbar"}>
                <div className={"left"}>
                    <h1>YADMM</h1>
                    <hr className={"vertical-divider"} />
                    <NavTab onClick={() => callback('manage')} name={t('ui.navbar.manage')} active={selectedPage == 'manage'} />
                    <NavTab onClick={() => callback('download')} name={t('ui.navbar.download')} active={selectedPage == 'download'} />
                </div>

                <div className={"right"}>
                    { dmlStatus != 'ok' &&
                        <DMMNotice notice={"not-found"} />
                    }
                    <LaunchGame />
                    <NavTab onClick={() => callback('settings')} name={t('ui.navbar.settings')} active={selectedPage == 'settings'} />
                </div>
            </div>
        </>
    )
}