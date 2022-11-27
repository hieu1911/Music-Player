import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Item({ data, onClick }) {
    const current = data.current;
    const color = data.color;
    const id = data.id;
    return (
        <button className={cx('menu-item', { current }, { color })} onClick={() => onClick(id)}>
            <span className={cx('menu-icon')} style={{ backgroundColor: color }}>
                {data.icon}
            </span>
            <span className={cx('menu-title')}>{data.title}</span>
        </button>
    );
}

export default Item;
