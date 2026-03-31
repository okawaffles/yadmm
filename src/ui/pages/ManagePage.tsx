import React, {useEffect, useState} from "react";
import './GenericPage.css';
import DivaMod from "../components/DivaMod";
import {Tooltip} from "react-tooltip";

export default function({callbackDmlStatus}: {callbackDmlStatus: CallableFunction}) {
    const [modsLoaded, setModsLoaded] = useState(false);
    const [modList, setModList] = useState([] as Array<{name: string, author: string, enabled: boolean, id: number, version: string, path: string, imageUrl?: string}>);
    const [loadingText, setLoadingText] = useState('Loading mods, please wait...');

    function loadModList() {
        setLoadingText('Loading mods, please wait...');
        window.electronAPI.getInstalledMods().then((result: {
                success: boolean;
                dml_found: boolean;
                mods: Array<{name: string, author: string, enabled: boolean, id: number, version: string, path: string, imageUrl?: string}>;
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
                <h1 className={"title"}>Manage Installed Mods</h1>
                { modsLoaded &&
                    <div className={"yadmm-mod-list"}>
                        {modList.map((item) => (
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