import React from "react";
import './DMLNotice.css';
import {useTranslation} from "react-i18next";

export default function({notice, rawText}: {notice: 'not-found' | 'out-of-date' | 'raw-text', rawText?: string}) {
    const {t} = useTranslation();

    return(
        <>
            <p className={'yadmm-dmm-notice ' + notice}>{ notice == 'raw-text' ? rawText :
                t('ui.navbar.dml_notice.not_found')
            }</p>
        </>
    )
}