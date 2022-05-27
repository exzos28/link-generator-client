import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useState} from 'react';
import {PageContainer} from "../components/PageContainer";
import {Table} from "antd";
import {Visit} from "../core/DataRestClient";
import {ColumnsType} from "antd/es/table";
import {useRoot} from "../core";


export default observer(function VisitList() {
    const {dataRestClient} = useRoot();
    const [tableData, setTableData] = useState<Visit[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const fetchData = useCallback(async () => {
        setIsLoading(true)
        const response = await dataRestClient.getVisits();
        if (response.success) {
            setTableData(response.right.data.reverse())
        }
        setIsLoading(false)
    }, [dataRestClient]);
    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchData()
    }, [fetchData])
    const columns: ColumnsType<Visit> = [
        {
            title: 'id',
            dataIndex: '_id',
        },
        {
            title: 'ip',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Region',
            dataIndex: 'region',
            key: 'region',
        },
        {
            title: 'Timezone',
            dataIndex: 'timezone',
            key: 'timezone',
        },
        {
            title: 'Area',
            dataIndex: 'area',
            key: 'area',
        },
        {
            title: 'Shortened link',
            key: 'url',
            render: (_: any, record: Visit) => {
                const url = `${process.env.REACT_APP_API_URL}${record.url.shortUrl}`;
                return <a target="_blank" style={{wordBreak: 'break-all'}}  href={url} rel="noreferrer">{url}</a>
            }
        },
        {
            title: 'Origin url',
            key: 'origUrl',
            width: 400,
            render: (_: any, record: Visit) => {
                return <a target="_blank" style={{wordBreak: 'break-all'}}  href={record.url.origUrl} rel="noreferrer">{record.url.origUrl}</a>
            }
        },
    ];

    return (
        <PageContainer>
            <Table
                rowKey={_ => _._id}
                bordered
                columns={columns}
                dataSource={tableData}
                loading={isLoading}
                pagination={{
                    showSizeChanger: true,
                    showQuickJumper: true,
                    pageSize: 30,
                }}/>
        </PageContainer>
    );
});
