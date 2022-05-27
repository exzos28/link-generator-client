import {Card, Col, Row, Spin} from 'antd';
import {observer} from 'mobx-react-lite';
import React, {PropsWithChildren} from 'react';

import {HEADER_HEIGHT} from '../AppLayout';
import styles from './index.module.css';
import {LayoutBreadcrumb} from './LayoutBreadcrumb';

export type PageContainerProps = {
    extra?: React.ReactNode;
    loading?: boolean;
};

export default observer(function PageContainer(
    props: PropsWithChildren<PageContainerProps>,
) {
    const {extra, loading, children} = props;
    return (
        <div className={styles.root}>
            <Card className={styles.header} style={{top: HEADER_HEIGHT}}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <LayoutBreadcrumb />
                    </Col>
                    <Col>{extra}</Col>
                </Row>
            </Card>
            {loading ? (
                <div className={styles.spinner}>
                    <Spin size="large" />
                </div>
            ) : (
                <div className={styles.content}>{children}</div>
            )}
        </div>
    );
});
