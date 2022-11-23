import classNames from 'classnames/bind';
import styles from './SidebarRight.module.scss';

const cx = classNames.bind(styles);

function SidebarRight() {
    return <div className={cx('wrapper')}>SidebarRight</div>;
}

export default SidebarRight;
