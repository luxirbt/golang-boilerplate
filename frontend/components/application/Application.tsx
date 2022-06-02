import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import Application from '../../lib/types/models/application/application';
import useDisplayForm from '../common/hook/DisplayFormHook';

type ApplicationProps = {
    application: Application;
    setApplication: Dispatch<SetStateAction<Application>>;
    currentApplication: Application;
};

export default function ApplicationDetail({ application, setApplication, currentApplication }: ApplicationProps) {
    const { t } = useTranslation();
    const { displayFormUpdate } = useDisplayForm();

    return (
        <tr>
            <td>
                <input
                    type="radio"
                    value={application.id}
                    name="check"
                    onChange={() => setApplication(application)}
                    onClick={() => displayFormUpdate()}
                    checked={application.id === currentApplication.id}
                />
            </td>
            <td>{application.appname}</td>
            <td>{application.url}</td>
            <td>{application.displayname}</td>
            <td>
                {application.webapp == true ? t('applications.list.is_web_app') : t('applications.list.is_not_web_app')}
            </td>
        </tr>
    );
}
