import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import {Route, Routes} from 'react-router-dom';

import CheckAuth from './CheckAuth';
import {routerMap} from './app-routes';
import RequireAuth from "./RequireAuth";
import {AppLayout} from "./components/AppLayout";
import Login from "./screens/Login";
import Register from "./screens/Register";
import {PENDING, useRoot} from "./core";
import {Card, Spin} from "antd";

export default observer(function Router() {
    const {auth} = useRoot();
    const getContent = useCallback(() => {
        return [...routerMap.values()].map(route => {
            const Element = route.Element;
            if (!Element) {
                return null;
            }
            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<Element/>}
                />
            );
        });
    }, []);
    return auth.state === undefined || auth.state.status === PENDING ? (
        <Card style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Spin size="large"/>
        </Card>
    ) : (
        <Routes>
            <Route
                path='/'
                element={
                    <RequireAuth>
                        <AppLayout/>
                    </RequireAuth>
                }
            >
                {getContent()}
            </Route>

            <Route
                path='/login'
                element={
                    <CheckAuth>
                        <Login/>
                    </CheckAuth>
                }
            />
            <Route
                path='/registration'
                element={
                    <CheckAuth>
                        <Register/>
                    </CheckAuth>
                }
            />
        </Routes>
    );
});
