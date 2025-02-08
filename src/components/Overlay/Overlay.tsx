import { ReactNode } from 'react';
import styles from './Overlay.module.scss';

export const Overlay = ({children}: {children: ReactNode}) => {
    return <div className={styles.overlay}>
        {children}
    </div>;
};