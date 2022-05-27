import React from 'react';
import 'antd/dist/antd.css';
import en from 'antd/lib/locale-provider/en_US';
import {ConfigProvider} from 'antd';
import {BrowserRouter} from "react-router-dom";
import {RootProvider} from "./core";
import Router from "./Router";

function App() {
    return (
        <BrowserRouter>
            <ConfigProvider locale={en}>
                <RootProvider>
                    <Router/>
                </RootProvider>
            </ConfigProvider>
        </BrowserRouter>
    )
}

export default App;
