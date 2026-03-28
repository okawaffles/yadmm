import React from "react";
import './NavTab.css';

export default function({name, active}: {name: string, active: boolean}) {
    return (
        <>
            <div className={"yadmm-nav-button " + (active ? 'active' : '')}>
                <h1>{name}</h1>
            </div>
        </>
    )
}