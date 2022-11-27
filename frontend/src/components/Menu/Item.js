import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Item({ data, onClick }) {
    return (
        <button className={cx('menu-item')} onClick={onClick}>
            <span className={cx('menu-icon')}>{data.icon}</span>
            <span className={cx('menu-title')}>{data.title}</span>
            {!!data.children ? (
                <span className={cx('get-children-btn')}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </span>
            ) : (
                <></>
            )}
        </button>
    );
}

export default Item;
