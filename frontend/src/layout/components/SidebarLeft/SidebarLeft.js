import classNames from 'classnames/bind';
import styles from './SidebarLeft.module.scss';

const cx = classNames.bind(styles);

function SidebarLeft() {
    return <div className={cx('wrapper')}>SidebarLeft</div>;
}

export default SidebarLeft;
