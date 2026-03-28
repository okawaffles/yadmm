import React, {useEffect, useState} from "react";
import './GenericPage.css';
import DivaMod from "../components/DivaMod";

export default function() {
    const [modsLoaded, setModsLoaded] = useState(false);
    const [modList, setModList] = useState([] as Array<{name: string, author: string, enabled: boolean, id: number, version: string}>);

    useEffect(() => {
        setModList([
            {name: 'Mod', author: 'Author', id: 0, enabled: true, version: '1.0.0'}
        ]);
        setModsLoaded(true);
    }, [])

    return(
        <>
            <div className={"yadmm-page"}>
                <h1 className={"title"}>Manage Installed Mods</h1>
                { modsLoaded &&
                    <div className={"yadmm-mod-list"}>
                        {modList.map((item) => (
                            <DivaMod
                                version={item.version}
                                name={item.name}
                                enabled={item.enabled}
                                author={item.author}
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