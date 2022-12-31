import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';

import * as api from '../../../services';
import Header from './Header/Header.js';
import { DataContext } from '../../../dataContext'
import Song from '../../../components/Song/Song';
import styles from './SidebarRight.module.scss';

const cx = classNames.bind(styles);

function SidebarRight() {
    const [songs, setSongs] = useState([])
    const [playlistD, setPlaylistD] = useState({});

    const value = useContext(DataContext)
    var id = value.playlistCurrentId

    // only get id from localStorage once time after refresh page
    useEffect(() => {
        id = localStorage.getItem('playlistId');
    }, [])

    // get id from context after chagne playlist
    useEffect(() => {
        const fetchApiPlaylistD = async () => {
            let response = await api.getPlaylistDetail(id);
            let results = response.data.data;
            setPlaylistD(results);
            fomatSongs(results.song.items)
        };

        fetchApiPlaylistD();
    }, [value.playlistCurrentId]);
    
    const fomatSongs = (listSong) => {
        listSong.map((item, index) => {
            if (index == 0) {
                item.status = 'current'
            } else {
                item.status = 'next'
            }
            item.id = index
        })

        setSongs(listSong)
    }

    const handleClick = (id) => {
        let newSongs = songs.map((song, i) => {
            if (i == id) {
                song.status = 'current';
            } else if (i < id) {
                song.status = 'prev';
            } else {
                song.status = 'next';
            }
            return song;
        });
        setSongs(newSongs)
    };

    const handleDelete = (id) => {
        let newSongs = [];
        // newSongs.splice(id, 1)
        let songstart = songs.slice(0, id)
        let songend = songs.slice(id + 1, songs.length)
        newSongs = songstart.concat(songend)

        // newSongs.map((item, index) => {
        //     item.id = index
        // })
        setSongs(newSongs)
    };

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div>
                {songs.length > 0 ? <div className={cx('songs')}>
                    {songs.map((song, index) => (
                        <span className={cx('song')} key={index}>
                            <Song   
                                id={index}
                                data={song}
                                status={song.status}
                                playlist={playlistD.title}
                                onClick={handleClick}
                                onDelete={handleDelete}
                            />
                        </span>
                    ))}
                </div> : <></>}
            </div>
        </div>
    );
}

export default SidebarRight;
