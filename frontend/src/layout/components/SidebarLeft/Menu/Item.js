import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Item({ data, onClick }) {
    const current = data.current;
    const color = data.color;
    const id = data.id;
    return (
        <Link to={data.path}>
            <button className={cx('menu-item', { current })} onClick={() => onClick(id)}>
                <span className={cx('menu-icon', { color })} style={{ backgroundColor: color }}>
                    {data.icon}
                </span>
                <span className={cx('menu-title')}>{data.title}</span>
            </button>
        </Link>
    );
}

export default Item;
