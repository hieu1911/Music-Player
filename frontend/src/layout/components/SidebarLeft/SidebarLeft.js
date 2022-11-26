import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import config from '../../../config/config';
import images from '../../../assets/images';
import styles from './SidebarLeft.module.scss';

import Menu from './Menu/Menu.js';

const cx = classNames.bind(styles);

function SidebarLeft() {
    return (
        <div className={cx('wrapper')}>
            <Link to={config.routes.home} className={cx('logo-link')}>
                <img src={images.logo} alt="Music" />
                <h2 className={cx('text')}>Music</h2>
            </Link>
            <Menu />
        </div>
    );
}

export default SidebarLeft;
