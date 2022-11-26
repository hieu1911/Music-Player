import classNames from 'classnames/bind';
import styles from './SidebarRight.module.scss';

import Header from './Header/Header.js';

const cx = classNames.bind(styles);

function SidebarRight() {
    return (
        <div className={cx('wrapper')}>
            <Header />
        </div>
    );
}

export default SidebarRight;
