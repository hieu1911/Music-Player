import classNames from 'classnames/bind';
import Header from '../components/Header/Header';
import SidebarLeft from '../components/SidebarLeft/SidebarLeft';
import SidebarRight from '../components/SidebarRight/SidebarRight';
import Controller from '../components/Controller/Controller';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <SidebarLeft />
                <div className={cx('container')}>
                    <Header />
                    <div className={cx('content')}>{children}</div>
                </div>
                <SidebarRight />
            </div>
            <Controller />
        </div>
    );
}

export default MainLayout;
