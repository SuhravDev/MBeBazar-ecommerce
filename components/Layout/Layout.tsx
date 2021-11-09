import dynamic from 'next/dynamic';
import React from 'react';
import { ReactNode } from 'react-is/node_modules/@types/react';
import styles from '../../styles/components/layout/layout.module.scss';

const Header = dynamic(() => import('../header/Heading'), {
    loading: () => <p>loading</p>,
});
type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <>
            <Header />
            <div className={styles.layout}>{children}</div>
        </>
    );
}
