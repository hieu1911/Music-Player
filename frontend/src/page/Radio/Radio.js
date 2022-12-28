import { useState, useEffect, Fragment } from 'react';
import classNames from 'classnames/bind';

import * as api from '../../services';
import LiveItem from './LiveItem/LiveItem';
import Postcast from './Postcast/Postcast';
import styles from './Radio.module.scss'

const cx = classNames.bind(styles)

function Radio() {
    
    const [radioApi, setRadioApi] = useState({})
    
    useEffect(() => {
        const fetchDateRadio = async () => {
            const response = await api.getRadio();
            const results = response.data[0].data;
            setRadioApi(results);
            console.log(results)
        }

        fetchDateRadio()
    }, [])

    return <Fragment>
        {radioApi.items ? <div className={cx('wrapper')}>
            <div className={cx('live-item')}>
                {radioApi.items[0].items.slice(0, 5).map((item, index) => <span key={index}>
                    <LiveItem data={item}/>
                </span>)}
            </div>
            <div className={cx('wrapper-postcast')}>
                <h3>{radioApi.items[2].title}</h3>
                <div className={cx('items-postcast')}>
                    {radioApi.items[2].items.slice(0, 4).map((item, index) => <span key={index}>
                        <Postcast data={item}/>
                    </span>)}
                </div>
            </div>
            <div className={cx('content-postcast')}>
                <h3>{radioApi.items[3].title}</h3>
                <img src={radioApi.items[3].items[0].thumbnail} />
            </div>
            <div className={cx('type-postcast')}>
                <h3>{radioApi.items[4].title}</h3>
                <div>
                    {radioApi.items[4].items.slice(0, 4).map((item, index) => <img key={index} src={item.thumbnail}/>)}
                </div>
            </div>
            {radioApi.items.slice(8).map((item, index) => <div key={index} className={cx('wrapper-postcast')}>
                <h3>{item.title}</h3>
                <div className={cx('items-postcast')}>
                    {item.items.slice(0, 4).map((item, index) => <span key={index}>
                        <Postcast data={item}/>
                    </span>)}
                </div>
            </div>)}
        </div> : <></>}
    </Fragment>;
}

export default Radio;
