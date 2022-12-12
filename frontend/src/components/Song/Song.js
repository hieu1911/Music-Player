import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Song.module.scss';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Song({ id, data, bigImg, playlist, onClick, onDelete }) {
    const prev = data.status == 'prev';
    const prevSong = data.status == 'prev';
    const currentSong = data.status == 'current';
    const nextSong = data.status == 'next';

    return (
        <Fragment>
            <div className={cx('wrapper', { prevSong, currentSong, nextSong })}>
                <img className={cx('song-img', { bigImg })} src={data.thumbnail} onClick={() => onClick(id)} />
                <div className={cx('song-info')} onClick={() => onClick(id)}>
                    <a className={cx({ prev })}>{data.title}</a>
                    <h3>{data.artistsNames}</h3>
                </div>
                {currentSong ? (
                    <></>
                ) : (
                    <span className={cx('trash-can')} onClick={() => onDelete(id)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                )}
            </div>
            {currentSong ? (
                <div className={cx('next-song-title')}>
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
