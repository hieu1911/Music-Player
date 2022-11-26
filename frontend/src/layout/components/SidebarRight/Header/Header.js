import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faUpload,
    faGear,
    faBan,
    faMusic,
    faPlayCircle,
    faToggleOff,
    faInfoCircle,
    faHeadset,
    faFile,
    faLock,
    faIdCard,
    faArrowRightFromBracket,
    faUserCheck,
} from '@fortawesome/free-solid-svg-icons';

import Menu from '../../../../components/Menu/Menu';
import styles from './Header.module.scss';
import images from '../../../../assets/images';

const cx = classNames.bind(styles);

const SETTING_MENU = [
    {
        icon: <FontAwesomeIcon icon={faBan} />,
        title: 'Block list',
    },
    {
        icon: <FontAwesomeIcon icon={faMusic} />,
        title: 'Music quality',
    },
    {
        icon: <FontAwesomeIcon icon={faPlayCircle} />,
        title: 'Display',
        children: {
            title: 'Display',
            data: [
                {
                    icon: <FontAwesomeIcon icon={faToggleOff} />,
                    title: 'Music full screen',
                },
                {
                    icon: <FontAwesomeIcon icon={faToggleOff} />,
                    title: 'Effect',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faInfoCircle} />,
        title: 'Introduce',
    },
    {
        icon: <FontAwesomeIcon icon={faHeadset} />,
        title: 'Contact',
    },
    {
        icon: <FontAwesomeIcon icon={faFile} />,
        title: 'Terms of use',
    },
    {
        icon: <FontAwesomeIcon icon={faLock} />,
        title: 'Privacy Policy',
    },
];

const USER_MENU = [
    {
        icon: <FontAwesomeIcon icon={faUserCheck} />,
        title: 'Account',
    },
    {
        icon: <FontAwesomeIcon icon={faIdCard} />,
        title: ' Profile',
    },
];

function Header() {
    var currentUser = true;
    const userMenu = currentUser
        ? [
              ...USER_MENU,
              {
                  icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
                  title: ' Logout',
              },
          ]
        : USER_MENU;
    return (
        <div className={cx('wrapper')}>
            <button className={cx('notification')}>
                <FontAwesomeIcon icon={faBell} />
            </button>

            <button className={cx('upload')}>
                <FontAwesomeIcon icon={faUpload} />
            </button>

            <Menu items={SETTING_MENU}>
                <button className={cx('setting')}>
                    <FontAwesomeIcon icon={faGear} />
                </button>
            </Menu>
            <Menu items={userMenu}>
                <img src={images.user} className={cx('user')} />
            </Menu>
        </div>
    );
}

export default Header;
