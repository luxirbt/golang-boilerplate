import React from 'react';
import { ReactElement } from 'react';
import styles from '../../styles/title-bar.module.scss';

interface HeroProps {
    heroTitle: string;
    heroSubTitle: string;
}

export default function Hero({ heroTitle, heroSubTitle }: HeroProps): ReactElement {
    return (
        <div className={styles.title_bar}>
            <h2>{heroTitle}</h2>
            <p>{heroSubTitle}</p>
        </div>
    );
}
