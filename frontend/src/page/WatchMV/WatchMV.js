import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import * as api from '../../services';
import styles from './WatchMV.module.scss';

const cx = classNames.bind(styles);

function WatchMV() {
    const videoRef = useRef();
    const [videoApi, setVideoApi] = useState({});
    const [src, setSrc] = useState('');

    useEffect(() => {
        const fetchApiVideo = async () => {
            const currentVideo = JSON.parse(localStorage.getItem('curMv'));
            if (currentVideo) {
                const id = currentVideo.encodeId;
                const response = await api.getVideo(id);
                const results = response.data.data;
                setVideoApi(results);

                const url = results.streaming.mp4;
                if (url) {
                    if (url['720p']) {
                        setSrc(url['720p']);
                    } else if (url['480p']) {
                        setSrc(url['480p']);
                    } else if (url['360p']) {
                        setSrc(url['360p']);
                    }
                }
            }
        };

        fetchApiVideo();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <video ref={videoRef}>
                    <source src={src}/>
                </video>
                <div className={cx('controller')}></div>
            </div>
        </div>
    );
}

export default WatchMV;
