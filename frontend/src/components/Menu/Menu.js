import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import Item from './Item';
import Header from './Header';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);
const defaultFn = (item) => {};

function Menu({ children, items = [], onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItem = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <Item
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    return (
        <div>
            <Tippy
                interactive
                placement="bottom-end"
                delay={[0, 0]}
                offset={[12, 8]}
                render={(attrs) => (
                    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                        <div className={cx('wrapper')}>
                            {history.length > 1 && (
                                <Header
                                    title={current.title}
                                    onBack={() => {
                                        setHistory((prev) => prev.slice(0, prev.length - 1));
                                    }}
                                />
                            )}
                            <div className={cx('menu-body')}>{renderItem()}</div>
                        </div>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Menu;
