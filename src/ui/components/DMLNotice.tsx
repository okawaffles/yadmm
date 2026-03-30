import React from "react";
import './DMLNotice.css';

export default function({notice}: {notice: 'not-found' | 'out-of-date'}) {
    return(
        <>
            <p className={'yadmm-dmm-notice ' + notice}>DivaModLoader Not Found</p>
        </>
    )
}