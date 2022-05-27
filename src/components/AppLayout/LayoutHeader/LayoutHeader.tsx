import {UserOutlined} from '@ant-design/icons';
import {Avatar, Button, Col, Layout, Row, Space} from 'antd';
import classNames from 'classnames';
import {observer} from 'mobx-react-lite';
import React from 'react';

import styles from '../appLayout.module.css';

const {Header} = Layout;

export type LayoutHeaderProps = {
    onLogoutClick: () => void;
};

export default observer(function LayoutHeader({
    onLogoutClick,
}: LayoutHeaderProps) {
    return (
        <>
            <div className={classNames(styles.baseHeader)} />
            <Header
                className={classNames(
                    styles.baseHeader,
                    styles.realHeader,
                )}
            >
                <Row justify="end">
                    <Col>
                        <Space>
                            <Avatar
                                shape="square"
                                size={30}
                                icon={<UserOutlined />}
                            />
                            <Button onClick={onLogoutClick} type="link" block>
                                Log out
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Header>
            {/*<LayoutBreadcrumb />*/}
        </>
    );
});
