import { useState, useEffect, Fragment } from 'react';
import classNames from 'classnames/bind';

import * as api from '../../services';
import styles from './MV.module.scss';
import MVItem from '../../components/MV/MVItem'

const cx = classNames.bind(styles);
const type = ['VN', 'US-UK', 'KPOP', 'OTHERS']

function MV() {
    const [MVItems, setMVItems] = useState({})
    const [MVType, setMVType] = useState('VN')

    useEffect(() => {
        const fetchDataNewMusic = async () => {
            const responseVN = await api.getListMV('IWZ9Z08I');
            const responseUSUK = await api.getListMV('IWZ9Z08O')
            const responseKPOP = await api.getListMV('IWZ9Z08W')
            const responseOTHER = await api.getListMV('IWZ9Z086')

            const MVItemsApi = {
                'VN': responseVN.data.data.items,
                'US-UK': responseUSUK.data.data.items,
                'KPOP': responseKPOP.data.data.items,
                'OTHERS': responseOTHER.data.data.items,
            }

            console.log(MVItemsApi)

            setMVItems(MVItemsApi)
        };

        fetchDataNewMusic();
    }, []);

    return<Fragment>
         {Object.keys(MVItems).length > 0 ? <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <h2>MV</h2>
                <div>
                    {type.map((item, index) => <button key={item} className={cx('btn-type', { active: MVType == item })} onClick={() => {
                        setMVType(item)
                        }}>
                        {item}
                    </button>)}
                </div>
            </div>
            <div className={cx('container')}>
            {
                console.log(MVItems[MVType])
            }
                {MVItems[MVType].map((item, index) => <span key={index} className={cx('item')}>
                    <MVItem data={item}/>
                </span>)}
            </div>
        </div> : <></>}
    </Fragment>
}

export default MV;
