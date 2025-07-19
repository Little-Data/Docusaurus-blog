import React from 'react';
import MDXContent from '@theme/MDXContent';
import styles from './style.module.css'

export default function Block({children, title}) {
    return (<div className={styles.mathnotesBlock}>
        <MDXContent>
            {title && <div className={styles.title}>{title}</div>}
            {children}
        </MDXContent>
    </div>);
}