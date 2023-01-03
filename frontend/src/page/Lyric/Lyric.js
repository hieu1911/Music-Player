import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';

import { DataContext } from '../../dataContext';
import * as api from '../../services';
import styles from './Lyric.module.scss';

const cx = classNames.bind(styles);

function Lyric() {
    const value = useContext(DataContext);
    const [curSong, setCurSong] = useState(JSON.parse(localStorage.getItem('currentSong')));
    const [lyric, setLyric] = useState([]);

    useEffect(() => {
        let song =
            Object.keys(value.currentSong).length > 0
                ? value.currentSong
                : JSON.parse(localStorage.getItem('currentSong'));

        if (Object.keys(value.currentSong).length > 0) setCurSong(value.currentSong);

        const fetchApiLyric = async () => {
            let response = await api.getLyric(song.encodeId);
            let result = response.data.data.sentences;
            let sentences;
            if (result) {
                sentences = result.map((item) => item.words.reduce((total, word) => total + word.data + ' ', ''));
            } else {
                sentences = ['The lyrics are being updated'];
            }
            setLyric(sentences);
        };

        fetchApiLyric();
    }, [value.currentSong]);

    return (
        <>
            {curSong ? (
                <div className={cx('wrapper')}>
                    <div className={cx('info')}>
                        <img src={curSong.thumbnailM} className={cx({playmusic: value.playMusic})}/>
                        <h3>{curSong.title}</h3>
                        <p>{curSong.artistsNames}</p>
                    </div>
                    <div className={cx('content')}>
                        <h2>Lyric</h2>
                        {lyric ? (
                            <div className={cx('lyric-line')}>
                                {lyric.map((item, index) => (
                                    <p key={index}>{item}</p>
                                ))}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default Lyric;
