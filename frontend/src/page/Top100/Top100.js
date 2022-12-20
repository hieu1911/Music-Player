import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'

import * as api from '../../services'
import Playlist from '../../components/Playlist/Playlist'
import styles from './Top100.module.scss'

const cx = classNames.bind(styles)

function Top100() {
    const [apiTop100, setApiTop100] = useState([])

    useEffect(() => {
        const fetchApiTop100 = async () => {
            const response = await api.getTop100()
            const result = response.data.data
            setApiTop100(result)
        }

        fetchApiTop100()
    }, [])

    return <div className={cx('wrapper')}>
        {
            apiTop100.map((item, index) => (
                <div key={index} className={cx('container')}>
                    <h3>{item.title}</h3>
                    <div className={cx('item')}>
                        {item.items.slice(1).map((item, index) => (
                            <Playlist data={item} key={index}/>
                        ))}
                    </div>
                </div>
            ))
        }
    </div>;
}

export default Top100;
