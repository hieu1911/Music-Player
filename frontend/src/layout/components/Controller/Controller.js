import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleLeft,
    faCircleRight,
    faComment,
    faEllipsis,
    faFilm,
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

import Menu from '../../../components/Menu/Menu';
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

    const handleClickPlay = () => {
        setPlay(!play);
    };

    const handleClickAdd = () => {
        setAddLibrary(!addLibrary);
    };

    const handleClickRandom = () => {
        setRandom(!random);
    };

    const handleClickLoop = () => {
        setLoop(!loop);
    };

    const handleClickMute = () => {
        setMute(!mute);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('controls-left')}>
                <img />
                <div className={cx('song-info')}>
                    <a>Something Just Like This</a>
                    <h3>The Chainsmokers</h3>
                </div>
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
                        <FontAwesomeIcon icon={faCircleLeft} />
                    </span>
                    <span onClick={handleClickPlay}>
                        <div className={cx('player-play-btn')}>
                            {play ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                        </div>
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faCircleRight} />
                    </span>
                    <span className={cx({ loop })} onClick={handleClickLoop}>
                        <FontAwesomeIcon icon={faRepeat} />
                    </span>
                </div>
                <div className={cx('player-bar-time')}>
                    <span className={cx('time-left')}>00:00</span>
                    <input className={cx('progress-time')} type="range" value="0" step="1" min="0" max="100" />
                    <span className={cx('time-right')}>03:01</span>
                </div>
            </div>
            <div className={cx('controls-right')}>
                <span>
                    <FontAwesomeIcon icon={faFilm} />
                </span>
                <span>
                    <FontAwesomeIcon icon={faMicrophoneAlt} />
                </span>
                <span onClick={handleClickMute}>
                    {mute ? <FontAwesomeIcon icon={faVolumeMute} /> : <FontAwesomeIcon icon={faVolumeHigh} />}
                </span>
                <input className={cx('progress-volume')} type="range" value="0" step="1" min="0" max="100" />
            </div>
        </div>
    );
}

export default Controller;
