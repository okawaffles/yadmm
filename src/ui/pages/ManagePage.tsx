import React, {useEffect, useState} from "react";
import './GenericPage.css';
import DivaMod from "../components/DivaMod";

export default function() {
    const [modsLoaded, setModsLoaded] = useState(false);
    const [modList, setModList] = useState([] as Array<{name: string, author: string, enabled: boolean, id: number, version: string, path: string, imageUrl?: string}>);

    useEffect(() => {
        window.electronAPI.getInstalledMods().then((result: {
                success: boolean;
                mods: Array<{name: string, author: string, enabled: boolean, id: number, version: string, path: string, imageUrl?: string}>;
                error?: string;
            }) => {
            if (!result.success) {
                return alert(result.error);
            }

            setModList(result.mods);
        })
        setModsLoaded(true);
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
                                imageUrl={item.imageUrl || undefined}
                            />
                        ))}
                    </div>
                }

                { !modsLoaded &&
                    <div className={"flex-centered"}>
                        <h2>Loading, please wait...</h2>
                    </div>
                }
            </div>
        </>
    )
}