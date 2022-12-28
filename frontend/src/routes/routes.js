import config from '../config/config.js';
import Home from '../page/Home/Home';
import ChartPage from '../page/Chart/Chart';
import Radio from '../page/Radio/Radio';
import NewMusic from '../page/NewMusic/NewMusic';
import Category from '../page/Category/Category';
import Top100 from '../page/Top100/Top100';
import MV from '../page/MV/MV';
import LibrarySong from '../page/LibrarySong/LibrarySong';
import Playlist from '../page/Playlist/Playlist';
import Album from '../page/Album/Album';
import MusicUpload from '../page/MusicUpload/MusicUpload';
import MusicRecently from '../page/MusicRecently/MusicRecently';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.individula, component: LibrarySong },
    { path: config.routes.chart, component: ChartPage },
    { path: config.routes.radio, component: Radio },
    { path: config.routes.newMusic, component: NewMusic },
    { path: config.routes.category, component: Category },
    { path: config.routes.top100, component: Top100 },
    { path: config.routes.mv, component: MV },
    { path: config.routes.song, component: LibrarySong },
    { path: config.routes.playlist, component: Playlist },
    { path: config.routes.album, component: Album },
    { path: config.routes.musicUpload, component: MusicUpload },
    { path: config.routes.musicRecently, component: MusicRecently },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
