import config from '../config/config.js';
import { HomeLayout } from '../layout';
import Home from '../page/Home';
import Search from '../page/Search';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.search, component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
