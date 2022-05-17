import React from 'react';
import Router from 'next/router';
import axios from 'axios';

export const Menu = () => {
    const disconnect = () => {
        localStorage.clear();
        axios.post('/login/disconnect').then(() => Router.push('/login'));
    };

    return (
        <div className="Menu">
            <div className="Account-manager">
                <div className="Items-Account-Manager">
                    <ul>
                        <li onClick={() => Router.push('/user')}>Users</li>
                        <li onClick={() => Router.push('/permission')}>Permissions</li>
                        <li onClick={() => Router.push('/application')}>Applications</li>
                        <li onClick={() => Router.push('/company')}>Companies</li>
                    </ul>
                </div>
                <button className="Button_Disconnect" type="button" onClick={disconnect}>
                    Disconnect
                </button>
            </div>
        </div>
    );
};
