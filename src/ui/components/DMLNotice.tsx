import React from "react";
import './DMLNotice.css';
import {useTranslation} from "react-i18next";

export default function({notice}: {notice: 'not-found' | 'out-of-date'}) {
    const {t} = useTranslation();

    return(
        <>
            <p className={'yadmm-dmm-notice ' + notice}>{t('ui.navbar.dml_notice.not_found')}</p>
        </>
    )
}