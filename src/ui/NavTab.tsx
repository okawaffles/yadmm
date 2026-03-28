import React from "react";
import './NavTab.css';

export default function({name, active, onClick}: {name: string, active: boolean, onClick: CallableFunction}) {
    return (
        <>
            <div
                className={"yadmm-nav-button " + (active ? 'active' : '')}
                onClick={() => onClick()}
            >
                <h1>{name}</h1>
            </div>
        </>
    )
}