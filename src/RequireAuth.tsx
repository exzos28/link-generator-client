import {observer} from 'mobx-react-lite';
import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';

import {FULFILLED, useRoot} from './core';

export type RequireAuthProps = {
    children: React.ReactNode;
};

export default observer(function RequireAuth({children}: RequireAuthProps) {
    const location = useLocation();
    const {auth} = useRoot();

    if (auth.state?.status === FULFILLED) {
        return <>{children}</>;
    }

    return <Navigate to="/login" state={{from: location}} replace />;
});
