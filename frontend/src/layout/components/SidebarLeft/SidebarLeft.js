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
    faMusic,
    faPlus,
    faRadio,
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
        path: '/',
    },
    {
        id: 1,
        icon: <FontAwesomeIcon icon={faIcons} />,
        title: 'Individual',
        path: '/individula',
    },
    {
        id: 2,
        icon: <FontAwesomeIcon icon={faChartLine} />,
        title: 'Chart',
        path: '/chart',
    },
    {
        id: 3,
        icon: <FontAwesomeIcon icon={faRadio} />,
        title: 'Radio',
        path: '/radio',
    },
];

const navbarScrollItems = [
    {
        id: 0,
        icon: <FontAwesomeIcon icon={faMusic} />,
        title: 'New music',
        path: '/newMusic',
    },
    {
        id: 1,
        icon: <FontAwesomeIcon icon={faSymfony} />,
        title: 'Category',
        path: '/category',
    },
    {
        id: 2,
        icon: <FontAwesomeIcon icon={faStar} />,
        title: 'Top 100',
        path: '/top100',
    },
    {
        id: 3,
        icon: <FontAwesomeIcon icon={faVideo} />,
        title: 'MV',
        path: '/mv',
    },
];

const navbarLibraryItems = [
    {
        id: 0,
        icon: <FontAwesomeIcon icon={faGuitar} />,
        title: 'Song',
        color: '#2d9dff',
        path: '/library/song',
    },
    {
        id: 1,
        icon: <FontAwesomeIcon icon={faFilterCircleXmark} />,
        title: 'Playlist',
        color: '#93cb56',
        path: '/library/playlist',
    },
    {
        id: 2,
        icon: <FontAwesomeIcon icon={faCloudUpload} />,
        title: 'Music Upload',
        color: '#fe6632',
        path: '/library/musicUpload',
    },
    {
        id: 3,
        icon: <FontAwesomeIcon icon={faClock} />,
        title: 'Music recently',
        color: '#fece6f',
        path: '/library/musicRecently',
    },
];


function SidebarLeft() {
    const handleClickLogo = () => {
        navbarMainItems[0].current = true;
        localStorage.setItem('curPageItem', navbarMainItems[0].path);
    };

    return (
        <div className={cx('wrapper')}>
            <Link to={config.routes.home} className={cx('logo-link')}>
                <img src={images.logo} alt="Music" onClick={handleClickLogo} />
                <h2 className={cx('text')} onClick={handleClickLogo}>
                    Music
                </h2>
            </Link>
            <Menu items={navbarMainItems}/>
            <div className={cx('seperate')}></div>
            <div className={cx('navbar-scroll')}>
                <Menu items={navbarScrollItems}/>
                <p>Library</p>
                <Menu items={navbarLibraryItems}/>
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
