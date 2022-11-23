import classNames from 'classnames/bind';
import styles from './Controller.module.scss';

const cx = classNames.bind(styles);

function Controller() {
    return <div className={cx('wrapper')}>controller</div>;
}

export default Controller;
