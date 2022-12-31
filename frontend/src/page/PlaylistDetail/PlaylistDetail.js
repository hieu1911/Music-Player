import { useState, useEffect, useContext, Fragment } from 'react';
import { DataContext } from '../../dataContext';
import classNames from 'classnames/bind';

import * as api from '../../services';
import Song from '../../components/Song/Song';
import { fomatTime } from '../../components/func';
import styles from './PlaylistDetail.module.scss';

const cx = classNames.bind(styles);

function PlaylistDetail() {
    const value = useContext(DataContext);
    const item = Object.keys(value.playlist).length != 0 ? value.playlist : JSON.parse(localStorage.getItem('playlist'));
    // console.log(item)
    const [playlistD, setPlaylistD] = useState({});

    useEffect(() => {
        const fetchApiPlaylistD = async () => {
            let response = await api.getPlaylistDetail(item.encodeId);
            let results = response.data.data;
            setPlaylistD(results);
        };

        fetchApiPlaylistD();
    }, [item]);

    return (
        <Fragment>
            {playlistD && playlistD.song ? (
                <div className={cx('wrapper')}>
                    <div className={cx('content-top')}>
                        <img src={item.thumbnailM} />
                        <h3>{item.title}</h3>
                        {item.artists ? <p>{item.artists.reduce((total, artist) => total + artist.name + ', ', '')}</p> : <></>}
                        <p>{'Update: ' + playlistD.releaseDate}</p>
                        <p>{playlistD.like + ' liked'}</p>
                        <button onClick={() => {
                            localStorage.setItem('playlistId', item.encodeId)
                            localStorage.setItem('listSongCurrent', JSON.stringify(playlistD.song.items))
                            value.setPlaylistCurrentId(item.encodeId)
                        }}>PLAY NOW</button>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('description')}>
                            <p>{'Preface: ' + item.sortDescription}</p>
                            <h4>SONGS</h4>
                        </div>
                        <div className={cx('song-list')}>
                            {playlistD.song.items.map((item, index) => (
                                <div className={cx('song')} key={index}>
                                    <span key={index}>
                                        <Song data={item} />
                                    </span>
                                    <span className={cx('time')}>{fomatTime(item.duration)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </Fragment>
    );
}

export default PlaylistDetail;
