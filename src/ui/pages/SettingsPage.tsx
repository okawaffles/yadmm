import React, {useState} from "react";


export default function() {
    const [pathValue, setPathValue] = useState('');

    return(
        <>
            <div className={"yadmm-page"}>
                <h1 className={"title"}>Settings</h1>

                <div className={"path-setup"}>
                    <h2>Game Path</h2>
                    <p>Set the path to your Project Diva folder.</p>
                    <p>This is required to use YADMM.</p>
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
            </div>
        </>
    )
}