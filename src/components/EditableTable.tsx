import {Form, Popconfirm, Space, Table, Typography} from "antd";
import React, {useState} from "react";
import {EditableCell} from "./EditableCell";
import {Url} from "../core/DataRestClient";

type Item = Url;

export type LinkTableProps = {
    data: Item[];
    onChangeData: (newData: Item[]) => void;
    onEdit: (item: Item) => void;
    onDelete: (item: Item) => void;
    loading: boolean;
}

export function LinkTable({data, onChangeData, loading, onEdit, onDelete}: LinkTableProps) {
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState<string | number>();

    const isEditing = (record: Item) => record._id === editingId;

    const edit = (record: Item) => {
        form.setFieldsValue({name: '', age: '', address: '', ...record});
        setEditingId(record._id);
    };

    const remove = (record: Item) => {
        const newData = data.filter(_ => _._id !== record._id);
        onChangeData(newData);
        onDelete(record)
    };

    const cancel = () => setEditingId(undefined);

    const save = async (record: Item) => {
        try {
            const row = (await form.validateFields()) as Item;
            const newItem = {...record, ...row};
            const newData = [...data];
            const index = newData.findIndex(item => record._id === item._id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...newItem,
                });
                onChangeData(newData);
                onEdit(newItem);
                setEditingId(undefined);
            } else {
                newData.push(newItem);
                onChangeData(newData);
                onEdit(newItem);
                setEditingId(undefined);
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'id',
            dataIndex: '_id',
        },
        {
            title: 'Url',
            dataIndex: 'origUrl',
            editable: true,
            width: 400,
            render: (_: any, record: Item) => {
                return (
                    <a target="_blank" style={{wordBreak: 'break-all'}} href={record.origUrl}
                       rel="noreferrer">{record.origUrl}</a>
                )
            }
        },
        {
            title: 'Shortened link',
            dataIndex: 'shortUrl',
            editable: false,
            render: (_: any, record: Item) => {
                const url = `${process.env.REACT_APP_API_URL}${record.shortUrl}`;
                return <a target="_blank" style={{wordBreak: 'break-all'}} href={url} rel="noreferrer">{url}</a>
            }
        },
        {
            title: 'Clicks',
            dataIndex: 'clicks',
            editable: false,
        },
        {
            title: '',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record)} style={{marginRight: 8}}>
                          Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                          <Typography.Link>Cancel</Typography.Link>
                        </Popconfirm>
                    </span>
                ) : (
                    <Space>
                        <Typography.Link disabled={editingId !== undefined} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>

                        <Typography.Link disabled={editingId !== undefined} onClick={() => remove(record)}>
                            Delete
                        </Typography.Link>
                    </Space>
                );
            },
        },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table<Item>
                loading={loading}
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                rowKey={_ => _._id}
                pagination={{
                    showSizeChanger: true,
                    showQuickJumper: true,
                    pageSize: 30,
                    onChange: cancel,
                }}
            />
        </Form>
    );
}
