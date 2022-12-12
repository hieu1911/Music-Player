import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './NewMusic.module.scss';
import Song from '../../components/Song/Song';

import * as api from '../../services';

const cx = classNames.bind(styles);

function NewMusic() {
    const newMusic = [];

    useEffect(() => {
        const fetchDataNewMusic = async () => {
            const response = await api.getNewReleaseChart();
            console.log(response);
            console.log('123');
        };

        fetchDataNewMusic();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h2>New Music</h2>
            {newMusic.map((index, item) => (
                <div>
                    <span className={cx('top-song')}>{index}</span>
                    <Song key={index} data={item} />
                    <span className={cx('time')}>'04.01'</span>
                </div>
            ))}
        </div>
    );
}

export default NewMusic;
