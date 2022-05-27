import {MessageOutlined} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import {observer} from 'mobx-react-lite';
import React, {useMemo} from 'react';
import {Link, useLocation} from 'react-router-dom';

import styles from './layoutSider.module.css';
import {RoutePath, routerMap} from "../../../app-routes";

const {Sider} = Layout;
const {SubMenu} = Menu;

export default observer(function LayoutSider() {
    const location = useLocation();
    const defaultKeys = useMemo(() => {
        const candidate = routerMap.get(location.pathname as RoutePath);
        if (candidate) {
            return [candidate.path];
        }
        return [];
    }, [location]);
    const appRoutes = useMemo(
        () => [
            routerMap.get(RoutePath.LinkList),
            routerMap.get(RoutePath.VisitList),
        ],
        [],
    );
    return (
        <>
            <div className={styles.mockRoot} />
            <Sider className={styles.root}>
                <Menu
                    theme="dark"
                    defaultOpenKeys={['0', '1']}
                    selectedKeys={defaultKeys}
                    mode="inline"
                >
                    <SubMenu
                        icon={<MessageOutlined/>}
                        title="App"
                        key="0"
                    >
                        {appRoutes.map(
                            (_) =>
                                _ && (
                                    <Menu.Item key={_.path}>
                                        <Link to={_.path}>{_.name}</Link>
                                    </Menu.Item>
                                )
                        )}
                    </SubMenu>
                </Menu>
            </Sider>
        </>
    );
});
