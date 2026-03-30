import React from "react";

import './NavBar.css';
import NavTab from "./NavTab";
import LaunchGame from "./components/LaunchGame";
import DMMNotice from "./components/DMLNotice";

export default function({callback, selectedPage, dmlStatus}: {callback: CallableFunction, selectedPage: string, dmlStatus: 'ok' | 'not-found' | 'out-of-date'}) {
    return(
        <>
            <div className={"yadmm-topbar"}>
                <div className={"left"}>
                    <h1>YADMM</h1>
                    <hr className={"vertical-divider"} />
                    <NavTab onClick={() => callback('manage')} name={"Manage"} active={selectedPage == 'manage'} />
                    <NavTab onClick={() => callback('download')} name={"Download"} active={selectedPage == 'download'} />
                </div>

                <div className={"right"}>
                    { dmlStatus != 'ok' &&
                        <DMMNotice notice={"not-found"} />
                    }
                    <LaunchGame />
                    <NavTab onClick={() => callback('settings')} name={"Settings"} active={selectedPage == 'settings'} />
                </div>
            </div>
        </>
    )
}