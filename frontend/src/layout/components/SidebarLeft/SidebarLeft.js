import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine,
    faCircleChevronRight,
    faCircleDot,
    faClock,
    faCloudUpload,
    faFilterCircleXmark,
    faGuitar,
    faIcons,
    faListNumeric,
    faMusic,
    faPlus,
    faStar,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';

import config from '../../../config/config';
import images from '../../../assets/images';
import styles from './SidebarLeft.module.scss';
import Menu from './Menu/Menu.js';
import { faSymfony } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

const navbarMainItems = [
    {
        id: 0,
        icon: <FontAwesomeIcon icon={faCircleDot} />,
        title: 'Discovery',
        current: true,
        path: './',
    },
    {
        id: 1,
        icon: <FontAwesomeIcon icon={faIcons} />,
        title: 'Individual',
        current: false,
        path: './',
    },
    {
        id: 2,
        icon: <FontAwesomeIcon icon={faChartLine} />,
        title: 'Chart',
        current: false,
        path: './',
    },
    {
        id: 3,
        icon: <FontAwesomeIcon icon={faListNumeric} />,
        title: 'Follow',
        current: false,
        path: './',
    },
];

const navbarScrollItems = [
    {
        id: 0,
        icon: <FontAwesomeIcon icon={faMusic} />,
        title: 'New music',
        current: false,
        path: './',
    },
    {
        id: 1,
        icon: <FontAwesomeIcon icon={faSymfony} />,
        title: 'Category',
        current: false,
        path: './',
    },
    {
        id: 2,
        icon: <FontAwesomeIcon icon={faStar} />,
        title: 'Top 100',
        current: false,
        path: './',
    },
    {
        id: 3,
        icon: <FontAwesomeIcon icon={faVideo} />,
        title: 'MV',
        current: false,
        path: './',
    },
];

const navbarLibraryItems = [
    {
        id: 0,
        icon: <FontAwesomeIcon icon={faGuitar} />,
        title: 'Song',
        current: false,
        color: '#2d9dff',
        path: './',
    },
    {
        id: 1,
        icon: <FontAwesomeIcon icon={faFilterCircleXmark} />,
        title: 'Playlist',
        current: false,
        color: '#93cb56',
        path: './',
    },
    {
        id: 2,
        icon: <FontAwesomeIcon icon={faCircleChevronRight} />,
        title: 'Album',
        current: false,
        color: '#447aff',
        path: './',
    },
    {
        id: 3,
        icon: <FontAwesomeIcon icon={faCloudUpload} />,
        title: 'Music Upload',
        current: false,
        color: '#fe6632',
        path: './',
    },
    {
        id: 4,
        icon: <FontAwesomeIcon icon={faClock} />,
        title: 'Music recently',
        current: false,
        color: '#fece6f',
        path: './',
    },
];

const navbar = Array.of(navbarMainItems, navbarScrollItems, navbarLibraryItems);

function SidebarLeft() {
    const [items, setItems] = useState(navbarMainItems);
    const handleClick = (item) => {
        navbar.map((nav) => {
            if (nav != item) {
                console.log(nav);
                nav.map((itemNav) => {
                    itemNav.current = false;
                });
            }
        });
        setItems(item);
    };

    return (
        <div className={cx('wrapper')}>
            <Link to={config.routes.home} className={cx('logo-link')}>
                <img src={images.logo} alt="Music" />
                <h2 className={cx('text')}>Music</h2>
            </Link>
            <Menu items={navbarMainItems} onClick={handleClick} />
            <div className={cx('seperate')}></div>
            <div className={cx('navbar-scroll')}>
                <Menu items={navbarScrollItems} onClick={handleClick} />
                <p>Library</p>
                <Menu items={navbarLibraryItems} onClick={handleClick} />
            </div>
            <div className={cx('add-playlist')}>
                <span>
                    <FontAwesomeIcon icon={faPlus} />
                </span>
                <span>Add new play list</span>
            </div>
        </div>
    );
}

export default SidebarLeft;
