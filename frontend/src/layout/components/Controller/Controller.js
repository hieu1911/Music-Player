import { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBackwardStep,
    faComment,
    faEllipsis,
    faFilm,
    faForwardStep,
    faHeart,
    faMicrophoneAlt,
    faPause,
    faPlay,
    faRandom,
    faRepeat,
    faShare,
    faSquareUpRight,
    faVolumeHigh,
    faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

import { DataContext } from '../../../dataContext';
import { fomatTime } from '../../../components/func';
import config from '../../../config/config'
import * as api from '../../../services';
import Menu from '../../../components/Menu/Menu';
import Song from '../../../components/Song/Song';
import styles from './Controller.module.scss';

const cx = classNames.bind(styles);

const moreMenu = [
    {
        icon: <FontAwesomeIcon icon={faComment} />,
        title: 'Comments',
    },
    {
        icon: <FontAwesomeIcon icon={faSquareUpRight} />,
        title: 'Copy link',
    },
    {
        icon: <FontAwesomeIcon icon={faShare} />,
        title: 'Share',
        children: {
            title: 'Share',
            data: [
                {
                    icon: <FontAwesomeIcon icon={faFacebook} />,
                    title: 'Facebook',
                },
                {
                    icon: <FontAwesomeIcon icon={faInstagram} />,
                    title: 'Instagram',
                },
                {
                    icon: <FontAwesomeIcon icon={faTwitter} />,
                    title: 'Twitter',
                },
            ],
        },
    },
];

function Controller() {
    const [addLibrary, setAddLibrary] = useState(false);
    const [play, setPlay] = useState(false);
    const [random, setRandom] = useState(false);
    const [loop, setLoop] = useState(false);
    const [mute, setMute] = useState(false);

    const [curTime, setCurTime] = useState(0);
    const [volume, setVolume] = useState(0);
    const [curSong, setCurSong] = useState(JSON.parse(localStorage.getItem('currentSong')))

    const inputRef = useRef([]);
    const audioRef = useRef(new Audio());
    const animationRef = useRef();

    const value = useContext(DataContext);

    useEffect(() => {
        let song =
            Object.keys(value.currentSong).length > 0
                ? value.currentSong
                : JSON.parse(localStorage.getItem('currentSong'));
        if (song && song.status) {
            delete song.status;
        }
        setCurSong(song);

        const fetchApiSong = async () => {
            let response = await api.getSong(song.encodeId);
            if (response.data.data['128']) {
                let results = response.data.data['128'];
                audioRef.current.pause();
                audioRef.current.src = results;
                audioRef.current.load();
            }

            if (play) {
                audioRef.current.play();
            }
        };

        fetchApiSong();
    }, [value.currentSong]);

    const handleClickPlay = () => {
        if (audioRef.current.src) {
            if (!play) {
                audioRef.current.play();
                animationRef.current = requestAnimationFrame(whilePlaying);
            } else {
                audioRef.current.pause();
                cancelAnimationFrame(animationRef.current);
            }
            setPlay(!play);
        }
    };

    const whilePlaying = () => {
        setCurTime((Math.floor(audioRef.current.currentTime) / curSong.duration) * 100);
        animationRef.current = requestAnimationFrame(whilePlaying);

        if (audioRef.current.currentTime > curSong.duration - 0.1 && loop) {
            audioRef.current.load();
            audioRef.current.play();
        }
    };

    const handleClickAdd = () => {
        setAddLibrary(!addLibrary);
    };

    const handleClickRandom = () => {
        let data = JSON.parse(localStorage.getItem('listSongCurrent'));
        let curSong = data[Math.floor(Math.random() * data.length) - 1];
        value.setCurrentSong(curSong);
        localStorage.setItem('currentSong', JSON.stringify(curSong));
    };

    // loop a song (If the song ends, it will play again)
    const handleClickLoop = () => {
        setLoop(!loop);
    };

    const handleClickMute = () => {
        audioRef.current.muted = !mute;
        setMute(!mute);
    };

    const handleClickNext = () => {
        let data = JSON.parse(localStorage.getItem('listSongCurrent'));
        let curId = data.findIndex((item) => item.status == 'current');
        let curSong;
        if (curId < data.length) {
            curSong = data[curId + 1];
        } else {
            curSong = data[0];
        }
        value.setCurrentSong(curSong);
        localStorage.setItem('currentSong', JSON.stringify(curSong));
    };

    const handleClickPrev = () => {
        let data = JSON.parse(localStorage.getItem('listSongCurrent'));
        let curId = data.findIndex((item) => item.status == 'current');
        let curSong;
        if (curId > 0) {
            curSong = data[curId - 1];
        } else {
            curSong = data[data.length - 1];
        }
        value.setCurrentSong(curSong);
        localStorage.setItem('currentSong', JSON.stringify(curSong));
    };

    const handleChangeTime = (value) => {
        setCurTime(value);
        audioRef.current.currentTime = (value / 100) * curSong.duration;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('controls-left')}>
                <div>{curSong ? <Song data={curSong} bigImg /> : <Song data={{}} bigImg />}</div>
                <div className={cx('icon-left')}>
                    <span className={cx({ addLibrary })} onClick={handleClickAdd}>
                        <FontAwesomeIcon icon={faHeart} />
                    </span>
                    <Menu items={moreMenu}>
                        <span>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </span>
                    </Menu>
                </div>
            </div>
            <div className={cx('player-bar')}>
                <div className={cx('player-bar-btn')}>
                    <span className={cx({ random })} onClick={handleClickRandom}>
                        <FontAwesomeIcon icon={faRandom} />
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faBackwardStep} onClick={handleClickPrev} />
                    </span>
                    <span onClick={handleClickPlay}>
                        <div className={cx('player-play-btn')}>
                            {play ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                        </div>
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faForwardStep} onClick={handleClickNext} />
                    </span>
                    <span className={cx({ loop })} onClick={handleClickLoop}>
                        <FontAwesomeIcon icon={faRepeat} />
                    </span>
                </div>
                <div className={cx('player-bar-time')}>
                    {audioRef.current ? (
                        <span className={cx('time-left')}>{fomatTime(audioRef.current.currentTime)}</span>
                    ) : (
                        <></>
                    )}
                    <input
                        className={cx('progress-time')}
                        type="range"
                        ref={(el) => (inputRef.current[0] = el)}
                        value={curTime}
                        onChange={(e) => handleChangeTime(e.target.value)}
                        step="1"
                        min="0"
                        max="100"
                    />
                    <span className={cx('time-right')}>{curSong ? fomatTime(curSong.duration) : '00:00'}</span>
                </div>
            </div>
            <div className={cx('controls-right')}>
                <span className={cx('video')}>
                    <FontAwesomeIcon icon={faFilm} />
                </span>
                <Link to={config.routes.lyric}>
                    <span>
                        <FontAwesomeIcon icon={faMicrophoneAlt} />
                    </span>
                </Link>
                <span onClick={handleClickMute}>
                    {mute ? <FontAwesomeIcon icon={faVolumeMute} /> : <FontAwesomeIcon icon={faVolumeHigh} />}
                </span>
                <input
                    className={cx('progress-volume')}
                    type="range"
                    ref={(el) => (inputRef.current[1] = el)}
                    value={volume}
                    onChange={(e) => {
                        setVolume(e.target.value);
                        audioRef.current.volume = volume;
                    }}
                    step="0.01"
                    min="0"
                    max="1"
                />
            </div>
        </div>
    );
}

export default Controller;
