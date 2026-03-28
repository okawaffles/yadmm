import React from "react";

import './NavBar.css';
import NavTab from "./NavTab";

export default function() {
    return(
        <>
            <div className={"yadmm-topbar"}>
                <div className={"left"}>
                    <h1>YADMM</h1>
                    <hr className={"vertical-divider"} />
                    <NavTab name={"Manage"} active={true} />
                    <NavTab name={"Download"} active={false} />
                </div>

                <div className={"right"}>
                    <NavTab name={"Settings"} active={false} />
                </div>
            </div>
        </>
    )
}