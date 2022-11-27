import { useState } from 'react';
import classNames from 'classnames/bind';
import Item from './Item';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Menu({ items = [], onClick }) {
    const [index, setIndex] = useState(10);

    const handleClick = (id) => {
        items.map((item) => {
            if (item.id == id) {
                item.current = true;
            } else {
                item.current = false;
            }
        });
        setIndex(id);
    };

    const renderItems = () => {
        return items.map((item) => <Item key={item.id} data={item} onClick={handleClick} />);
    };

    return (
        <div className={cx('wrapper-menu')} onClick={() => onClick(items)}>
            {renderItems()}
        </div>
    );
}

export default Menu;
