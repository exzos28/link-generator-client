import {observer} from 'mobx-react-lite';
import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';

import {FULFILLED, useRoot} from './core';

export type CheckAuthProps = {
    children: React.ReactNode;
};

export default observer(function CheckAuth({children}: CheckAuthProps) {
    const location = useLocation();
    const {auth} = useRoot();

    if (auth.state?.status === FULFILLED) {
        return <Navigate to="/" state={{from: location}} replace />;
    }

    return <>{children}</>;
});
