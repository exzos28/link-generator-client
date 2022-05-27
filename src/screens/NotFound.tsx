import {Button, Card, Result} from 'antd';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {PageContainer} from "../components/PageContainer";

export default observer(() => {
    const navigate = useNavigate();
    return (
        <PageContainer>
            <Card>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={
                        <Button onClick={() => navigate('/')} type="primary">
                            Back Home
                        </Button>
                    }
                />
            </Card>
        </PageContainer>
    );
});
