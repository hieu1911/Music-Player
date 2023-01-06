import { useState, useEffect, useRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { faPlay, faPause, faVolumeMute, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

import { DataContext } from '../../dataContext';
import * as api from '../../services';
import MV from '../MV/MV'
import styles from './WatchMV.module.scss';

const cx = classNames.bind(styles);

function WatchMV() {
    const value = useContext(DataContext)
    const videoRef = useRef();
    const inputRef = useRef();
    const ref = useRef();
    const animationRef = useRef();

    const [src, setSrc] = useState('');
    const [videoApi, setVideoApi] = useState({})
    const [curTime, setCurTime] = useState(0);
    const [play, setPlay] = useState(false);
    const [mute, setMute] = useState(false)

    useEffect(() => {
        const fetchApiVideo = async () => {
            const currentVideo = value.curVideo.encodeId ? value.curVideo : JSON.parse(localStorage.getItem('curMv'));
            if (currentVideo) {
                const id = currentVideo.encodeId;
                const response = await api.getVideo(id);
                const results = response.data.data;
                setVideoApi(results)

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
        ref.current.scrollTo({top: 0, left: 0});
    }, [value.curVideo]);

    const handleChangeTime = (value) => {
        setCurTime(value);
        videoRef.current.currentTime = (value / 100) * videoApi.duration;
    };

    const handleClickPlay = () => {
        if (videoRef.current.src) {
            if (!play) {
                videoRef.current.play();
                animationRef.current = requestAnimationFrame(whilePlaying);
            } else {
                videoRef.current.pause();
                cancelAnimationFrame(animationRef.current);
            }

            setPlay(!play);
        }
    };

    const whilePlaying = () => {
        setCurTime((Math.floor(videoRef.current.currentTime) / videoApi.duration) * 100);
        animationRef.current = requestAnimationFrame(whilePlaying);
    };

    const handleClickMute = () => {
        videoRef.current.muted = !mute;
        setMute(!mute);
    };

    return (
        <div className={cx('wrapper')} ref={ref}>
            <div className={cx('content')}>
                <video src={src} ref={videoRef} />
                <div className={cx('controller')}>
                    <span onClick={handleClickPlay} className={cx('play-btn')}>
                        {play ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                    </span>
                    <span onClick={handleClickMute} className={cx('mute-btn')}>
                        {mute ? <FontAwesomeIcon icon={faVolumeMute} /> : <FontAwesomeIcon icon={faVolumeHigh} />}
                    </span>
                    <input
                        className={cx('progress-time')}
                        type="range"
                        ref={(el) => (inputRef.current = el)}
                        value={curTime}
                        onChange={(e) => handleChangeTime(e.target.value)}
                        step="1"
                        min="0"
                        max="100"
                    />
                </div>
                <div className={cx('mv-container')}>
                    <MV />
                </div>
            </div>
        </div>
    );
}

export default WatchMV;
