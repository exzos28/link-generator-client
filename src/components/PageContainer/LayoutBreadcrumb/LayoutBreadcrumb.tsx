import {Breadcrumb} from 'antd';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import {Link, useLocation} from 'react-router-dom';

import {matchRoutes} from 'react-router';
import {first} from 'lodash';
import {RoutePath, routerMap} from "../../../app-routes";

export default observer(function LayoutBreadcrumb() {
    const location = useLocation();
    const getBreadcrumbsRoutes = useCallback(() => {
        const matchedRoutes = matchRoutes([...routerMap.keys()].map(_ => ({path: _})), location);
        const originalRoutePath = first(matchedRoutes)?.route.path;
        if (!originalRoutePath) {
            return [];
        }
        const currentRoute = routerMap.get(originalRoutePath as RoutePath);
        if (!currentRoute) {
            return [];
        }
        const result = [currentRoute];
        let parentKey = currentRoute.parent;
        while (parentKey !== undefined) {
            const candidate = routerMap.get(parentKey);
            if (candidate) result.push(candidate);
            parentKey = candidate?.parent;
        }
        return result.reverse();
    }, [location]);
    const count = getBreadcrumbsRoutes().length;
    if (count === 0) {
        return null;
    }
    return (
        <Breadcrumb>
            {getBreadcrumbsRoutes().map((_, index) => {
                const isDisabled = index + 1 === count || _.disabled;
                return (
                    <Breadcrumb.Item key={_.path}>
                        {isDisabled ? (
                            _.name
                        ) : (
                            <Link to={_.path}>{_.name}</Link>
                        )}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
});
