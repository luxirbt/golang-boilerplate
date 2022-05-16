import React from 'react';
import Logo from '../assets/logo.png';
import Image from 'next/image';

export const Banner = () => {
    return (
        <div className="logo-cliris">
            <div>
                <Image src={Logo} alt="logo-cliris" />
            </div>
        </div>
    );
};
