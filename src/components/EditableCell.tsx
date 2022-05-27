import React from "react";
import {Form, Input, InputNumber} from "antd";

export type EditableCellProps = React.HTMLAttributes<HTMLElement> & {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    index: number;
    children: React.ReactNode;
}
export const EditableCell: React.FC<EditableCellProps> = (props) => {
    const {
        editing,
        dataIndex,
        title,
        inputType,
        index,
        children,
        ...restProps
    } = props;
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
