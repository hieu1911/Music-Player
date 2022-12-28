import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import * as api from '../../services';
import styles from './MV.module.scss';
import MVItem from '../../components/MV/MVItem'

const cx = classNames.bind(styles);
const type = ['VN', 'US-UK', 'KPOP', 'OTHERS']

function MV() {
    
    const [MVApi, setMVApi] = useState({})
    const [MVItems, setMVItems] = useState([])
    const [MVType, setMVType] = useState('VN')

    useEffect(() => {
        const fetchDataNewMusic = async () => {
            const response = await api.getMV();
            const results = response.data[0].data.items;
            setMVApi(results)
            setMVItems(results[0])
            // console.log(results);
        };

        fetchDataNewMusic();
    }, []);

    return <div className={cx('wrapper')}>
        <div className={cx('navbar')}>
            <h2>MV</h2>
            <div>
                {type.map((item, index) => <button key={item} className={cx('btn-type', { active: MVType == item })} onClick={() => {
                    setMVType(item)
                    setMVItems(MVApi[index])
                    }}>
                    {item}
                </button>)}
            </div>
        </div>
        <div className={cx('container')}>
            {MVItems.map((item, index) => <span key={index} className={cx('item')}>
                <MVItem data={item}/>
            </span>)}
        </div>
    </div>
}

export default MV;
