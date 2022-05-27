import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useState} from 'react';
import {PageContainer} from "../components/PageContainer";
import {Url} from "../core/DataRestClient";
import {useRoot} from "../core";
import {LinkTable} from "../components/EditableTable";
import {Button, Card, Input, message, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";

export default observer(function LinkList() {
    const {dataRestClient, errorParser} = useRoot();
    const [tableData, setTableData] = useState<Url[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [inputUrlValue, setInputUrlValue] = useState('');
    const fetchData = useCallback(async () => {
        setIsLoading(true)
        const response = await dataRestClient.getUrls();
        if (response.success) {
            setTableData(response.right.data.reverse())
        }
        setIsLoading(false)
    }, [dataRestClient]);
    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchData()
    }, [fetchData])
    const onCreateClick = useCallback(async () => {
        const response = await dataRestClient.createUrl({url: inputUrlValue});
        if (!response.success) {
            message.error(errorParser.describe(response.left).summary);
        }
        await fetchData();
    }, [dataRestClient, errorParser, fetchData, inputUrlValue])
    const onChangeData = useCallback((newData: Url[]) => {
        setTableData(newData);
    }, []);
    const onEdit = useCallback(async (item: Url) => {
        const response = await dataRestClient.editUrl({id: item._id, url: {origUrl: item.origUrl}});
        if (!response.success) {
            message.error(errorParser.describe(response.left).summary);
        }
    }, [dataRestClient, errorParser]);
    const onDelete = useCallback(async (item: Url) => {
        const response = await dataRestClient.deleteUrl({id: item._id});
        if (!response.success) {
            message.error(errorParser.describe(response.left).summary);
        }
    }, [dataRestClient, errorParser]);
    return (<PageContainer>
            <Card>
                <Space direction="vertical" style={{width: '100%'}} size={10}>
                    <Space size={10} style={{display: 'flex', width: '100%'}}>
                        <Input placeholder="Enter url:" value={inputUrlValue}
                               onChange={e => setInputUrlValue(e.target.value)}
                               style={{width: 500}}/>
                        <Button
                            key="button"
                            icon={<PlusOutlined/>}
                            type="primary"
                            onClick={onCreateClick}
                            disabled={inputUrlValue.length === 0}
                        >
                            Create
                        </Button>
                    </Space>
                    <LinkTable onEdit={onEdit} onDelete={onDelete} data={tableData} onChangeData={onChangeData}
                               loading={isLoading}/>
                </Space>
            </Card>
        </PageContainer>
    );
});


