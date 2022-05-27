import NotFound from "./screens/NotFound";
import LinkList from "./screens/LinkList";
import VisitList from "./screens/VisitList";

export enum RoutePath {
    App = '/app',
    LinkList = '/app/link-list',
    VisitList = '/app/visit-List',
    Login = '/login',
    Registration = '/registration',
    NotFound = '*'
}

export const routerMap = new Map([
    // Only for display in breadcrumbs and sidebar only.
    [RoutePath.App, {
        path: RoutePath.App,
        name: 'App',
        disabled: true,
    }],
    [RoutePath.LinkList, {
        path: RoutePath.LinkList,
        name: 'Link list',
        Element: LinkList,
        parent: RoutePath.App,
    }],
    [RoutePath.VisitList, {
        path: RoutePath.VisitList,
        name: 'Visit list',
        Element: VisitList,
        parent: RoutePath.App,
    }],
    [RoutePath.NotFound, {
        path: RoutePath.NotFound,
        name: 'Not found',
        Element: NotFound,
    }],
]);
