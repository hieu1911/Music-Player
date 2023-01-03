import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';

import * as api from '../../../services';
import Header from './Header/Header.js';
import { DataContext } from '../../../dataContext';
import Song from '../../../components/Song/Song';
import styles from './SidebarRight.module.scss';

const cx = classNames.bind(styles);

function SidebarRight() {
    const [songs, setSongs] = useState([]);
    const [playlistD, setPlaylistD] = useState({});

    const value = useContext(DataContext);
    var id = value.playlistCurrentId;

    // only get id from localStorage once time after refresh page
    useEffect(() => {
        id = localStorage.getItem('playlistId');
    }, []);

    // get id from context after chagne playlist
    useEffect(() => {
        const fetchApiPlaylistD = async () => {
            if (id) {
                let response = await api.getPlaylistDetail(id);
                let results = response.data.data;
                setPlaylistD(results);
            }
            if (localStorage.getItem('listSongCurrent')) {
                fomatSongs(JSON.parse(localStorage.getItem('listSongCurrent')));
            }
        };

        fetchApiPlaylistD();
    }, [value.playlistCurrentId]);

    useEffect(() => {
        let list = JSON.parse(localStorage.getItem('listSongCurrent'));
        list = list ? list : [];
        if (Object.keys(value.currentSong).length > 0) {
            let ids = list.map((song) => song.encodeId);
            if (!ids.includes(value.currentSong.encodeId)) {
                let curId = list.findIndex((item) => item.status == 'current');
                list.splice(curId + 1, 0, value.currentSong);
            }

            let cur = false;
            let newSongs = list.map((song) => {
                if (song.encodeId == value.currentSong.encodeId) {
                    song = { ...song, status: 'current' };
                    cur = true;
                } else if (!cur) {
                    song.status = 'prev';
                } else {
                    song.status = 'next';
                }
                return song;
            });
            setSongs(newSongs);
            localStorage.setItem('listSongCurrent', JSON.stringify(newSongs));
        }
    }, [value.currentSong]);

    const fomatSongs = (list) => {
        if (list[0].status) {
        } else {
            list.map((item, index) => {
                if (index == 0) {
                    item.status = 'current';
                    value.setCurrentSong(item);
                } else {
                    item.status = 'next';
                }
            });
        }
        setSongs(list);
    };

    const handleClick = (id) => {
        let cur = false;
        let newSongs = songs.map((song) => {
            if (song.encodeId == id) {
                song.status = 'current';
                cur = true;
            } else if (!cur) {
                song.status = 'prev';
            } else {
                song.status = 'next';
            }
            return song;
        });
        setSongs(newSongs);
        localStorage.setItem('listSongCurrent', JSON.stringify(newSongs));
    };

    const handleDelete = (id) => {
        let newSongs = songs.filter((item) => item.encodeId != id);
        setSongs(newSongs);
        localStorage.setItem('listSongCurrent', JSON.stringify(newSongs));
    };

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div>
                {songs.length > 0 ? (
                    <div className={cx('songs')}>
                        {songs.map((song, index) => (
                            <span className={cx('song')} key={index}>
                                <Song
                                    data={song}
                                    status={song.status}
                                    playlist={playlistD.title}
                                    onClick={handleClick}
                                    onDelete={handleDelete}
                                />
                            </span>
                        ))}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default SidebarRight;
