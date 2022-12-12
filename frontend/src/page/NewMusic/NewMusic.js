import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './NewMusic.module.scss';
import Song from '../../components/Song/Song';
import * as api from '../../services';

const cx = classNames.bind(styles);

function NewMusic() {
    const [newMusic, setNewMusic] = useState([])
    
    useEffect(() => {
        const fetchDataNewMusic = async () => {
            const response = await api.getNewReleaseChart();
            const results = response.data.data.items;
            setNewMusic(results)
            // console.log(results);
        };

        fetchDataNewMusic();
    }, []);

    const fomatTime = (time) => {
        let surplusTime = time % 60
        let integerTime = (time - surplusTime) / 60
        let integerTimeS = integerTime
        let surplusTimeS = surplusTime
        if (integerTime < 10)  {
            integerTimeS = '0' + integerTime.toString()
        }
        if (surplusTime < 10)  {
            surplusTimeS = '0' + surplusTime.toString()
        }
        return integerTimeS + ':' + surplusTimeS
    }

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>New Music</h2>
            {newMusic.map((item, index) => (
                <div key={index} className={cx('item-wrapper')}>
                    <span className={cx('top-song', {top1:index==0, top2:index==1, top3:index==2})}>{index + 1}</span>
                    <span className={cx('song')}>
                        <Song data={item} />
                    </span>
                    <span className={cx('album')}>{item.hasOwnProperty('album') ? item.album.title : ''}</span>
                    <span className={cx('time')}>{fomatTime(item.duration)}</span>
                </div>
            ))}
        </div>
    );
}

export default NewMusic;
