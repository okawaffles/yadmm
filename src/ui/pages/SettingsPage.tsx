import React, {useEffect, useState} from "react";
import './GenericPage.css';

export default function() {
    const [pathValue, setPathValue] = useState('');
    const [currentPath, setCurrentPath] = useState('Not Set');
    const [debugString, setDebugString] = useState('yadmm debug string')

    useEffect(() => {
        setCurrentPath(window.electronAPI.cfg_getGamePath());
        setDebugString(window.electronAPI.getDebugString());
    }, []);

    return(
        <>
            <div className={"yadmm-page"}>
                <h1 className={"title"}>Settings</h1>

                <div className={"path-setup"}>
                    <h2>Game Path</h2>
                    <p>Set the path to your Project Diva folder.</p>
                    <p>This is required to use YADMM.</p>
                    <p className={"current-path"}>Currently, your path is set to: [ {currentPath} ]</p>
                    <div className={"options"}>
                        <input
                            value={pathValue}
                            placeholder={"path/to/your/diva"}
                            onChange={(e) => setPathValue(e.target.value)}
                        />
                        <button
                            className={"yadmm-button-submit"}
                            onClick={() => {
                                window.electronAPI.cfg_setGamePath(pathValue)
                                const valid = window.electronAPI.cfg_checkGamePath();
                                if (!valid) return alert('DivaMegaMix.exe was not found in this folder, please check your input!');
                            }}
                        >Update Game Path</button>
                    </div>
                </div>

                <footer>
                    <p>{debugString}</p>
                    <p>made with 💖 by okawaffles | yadmm is developed with no profit incentive,
                        but if you are feeling generous, you can still choose to support me on <a onClick={() => window.electronAPI.openKoFi()}>ko-fi</a></p>
                </footer>
            </div>
        </>
    )
}