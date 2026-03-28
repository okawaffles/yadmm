import React, {useState} from "react";
import NavBar from "./NavBar";
import ManagePage from "./pages/ManagePage";


export default function() {
    const [managePageShown, setManagePageShown] = useState(true);

    return(
        <>
            <NavBar />

            { managePageShown &&
                <ManagePage />
            }
        </>
    )
}