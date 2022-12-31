import { useContext, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';

import { DataContext } from '../../dataContext';
import styles from './Song.module.scss';

const cx = classNames.bind(styles);

function Song({ id, data, bigImg, playlist, onClick, onDelete }) {
    const value = useContext(DataContext);

    const prev = data.status == 'prev';
    const prevSong = data.status == 'prev';
    const currentSong = data.status == 'current';
    const nextSong = data.status == 'next';

    const handleClick = () => {
        if (data.status) {
            onClick(data.encodeId);
        }
        value.setCurrentSong(data);
        localStorage.setItem('currentSong', JSON.stringify(data));
    };

    return (
        <Fragment>
            <div className={cx('wrapper', { prevSong, currentSong, nextSong })}>
                <img className={cx('song-img', { bigImg })} src={data.thumbnail} onClick={handleClick} />
                <div className={cx('song-info')} onClick={handleClick}>
                    <a className={cx({ prev })}>{data.title}</a>
                    <h3>{data.artistsNames}</h3>
                </div>
                {currentSong ? (
                    <></>
                ) : (
                    <span className={cx('trash-can')} onClick={() => onDelete(data.encodeId)}>
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
