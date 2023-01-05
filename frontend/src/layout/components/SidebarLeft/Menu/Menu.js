import { useState } from 'react';
import classNames from 'classnames/bind';
import Item from './Item';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Menu({ items = [], onClick }) {
    const renderItems = () => {
        return items.map((item) => <Item key={item.id} data={item}/>);
    };

    return (
        <div className={cx('wrapper-menu')}>
            {renderItems()}
        </div>
    );
}

export default Menu;
