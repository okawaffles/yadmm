import React, {useEffect, useState} from "react";
import './GenericPage.css';
import DivaMod from "../components/DivaMod";
import {Tooltip} from "react-tooltip";
import {Mod} from "../../types/ui";

export default function({callbackDmlStatus}: {callbackDmlStatus: CallableFunction}) {
    const [modsLoaded, setModsLoaded] = useState(false);
    const [modList, setModList] = useState([] as Array<Mod>);
    const [loadingText, setLoadingText] = useState('Loading mods, please wait...');
    const [showOnlyEnabled, setShowOnlyEnabled] = useState(false);

    function loadModList() {
        setLoadingText('Loading mods, please wait...');
        window.electronAPI.getInstalledMods().then((result: {
                success: boolean;
                dml_found: boolean;
                mods: Array<Mod>;
                error?: string;
            }) => {
            callbackDmlStatus(result.dml_found);
            if (!result.success) {
                setModsLoaded(false);
                return setLoadingText(`Failed to load mods (${result.error}). Please set your install path in settings!`);
            }

            setModList(result.mods);

            if (result.mods.length == 0) {
                setLoadingText(`Looks like you have no mods installed! yadmm can't help with that right now. I promise it'll be able to soon!`);
            } else setModsLoaded(true);
        })
    }

    useEffect(() => {
        loadModList();
    }, [])

    return(
        <>
            <div className={"yadmm-page yadmm-manage"}>
                <div className={"header"}>
                    <h1 className={"title"}>Manage Installed Mods</h1>
                    <div className={"toggles"}>
                        <button
                            className={"yadmm-toggle-button " + (showOnlyEnabled ? 'enabled' : '')}
                            onClick={() => {
                                setShowOnlyEnabled(!showOnlyEnabled);
                            }}
                        >Show Only Enabled</button>
                        <button className={"yadmm-toggle-button"}>Edit Priority Mode</button>
                    </div>
                </div>
                { modsLoaded &&
                    <div className={"yadmm-mod-list"}>
                        {modList.filter(showOnlyEnabled ? (mod) => mod.enabled : () => true).map((item) => (
                            <DivaMod
                                version={item.version}
                                name={item.name}
                                enabled={item.enabled}
                                author={item.author}
                                key={item.id}
                                path={item.path}
                                refresh={() => {
                                    setModsLoaded(false)
                                    // I add an artificial delay here because
                                    // it generally just "feels" better as a user.
                                    // It gives an impression of, "oh, something just happened,
                                    // now I need to refresh because it DID happen".
                                    // I don't run this on launch though, because it feels better
                                    // when the app opens snappily
                                    // That's just my thought process. Open for debate.
                                    setTimeout(loadModList, 500)
                                    // loadModList()
                                }}
                                imageUrl={item.imageUrl || undefined}
                            />
                        ))}
                        <Tooltip id={'uninstall-tooltip'}></Tooltip>
                    </div>
                }

                { !modsLoaded &&
                    <div className={"flex-centered"}>
                        <h2>{loadingText}</h2>
                    </div>
                }
            </div>
        </>
    )
}