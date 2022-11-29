import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Song.module.scss';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Song({ id, data, bigImg, playlist, onClick }) {
    const prev = data.status == 'prev';
    const prevSong = data.status == 'prev';
    const currentSong = data.status == 'current';
    const nextSong = data.status == 'next';

    return (
        <Fragment>
            <div className={cx('wrapper', { prevSong, currentSong, nextSong })} onClick={() => onClick(id)}>
                <img className={cx('song-img', { bigImg })} />
                <div className={cx('song-info')}>
                    <a className={cx({ prev })}>{data.name}</a>
                    <h3>{data.artists}</h3>
                </div>
                {currentSong ? (
                    <></>
                ) : (
                    <span className={cx('trash-can')}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                )}
            </div>
            {currentSong ? (
                <div className={cx('next-song-info')}>
                    <h3>Next Song</h3>
                    <div>
                        <span>From </span>
                        <a>{playlist}</a>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </Fragment>
    );
}

export default Song;
