import {Layout} from 'antd';
import classNames from 'classnames';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';

import styles from './appLayout.module.css';
import {LayoutHeader} from './LayoutHeader';
import {LayoutSider} from './LayoutSider';
import {useRoot} from "../../core";

const {Content} = Layout;

export const HEADER_HEIGHT = 64;

export default observer(() => {
    const navigate = useNavigate();
    const root = useRoot();
    const handleLogout = useCallback(async () => {
        await root.auth.signOut();
        navigate('/');
    }, [navigate, root]);
    return (
        <Layout style={{height: '100vh'}}>
            <LayoutSider />
            <Layout className={classNames(styles.root)}>
                <LayoutHeader onLogoutClick={handleLogout}/>
                <Content className={styles.content}>
                    <main className={styles.main}>
                        <Outlet />
                    </main>
                </Content>
            </Layout>
        </Layout>
    );
});
