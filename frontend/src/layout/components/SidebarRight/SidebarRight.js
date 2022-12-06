import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SidebarRight.module.scss';

import Header from './Header/Header.js';
import Song from '../../../components/Song/Song';

const cx = classNames.bind(styles);

const songs = {
    playlist: 'US-UK',
    data: [
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'prev' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'prev' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'prev' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'prev' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'prev' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'prev' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'prev' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'prev' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'current' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'next' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'next' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'next' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'next' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'next' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'next' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'next' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'next' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'next' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'next' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'next' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'next' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'next' },
        { url: '', name: 'Something Just Like This', artists: 'The Chainsmokers', status: 'next' },
    ],
};

function SidebarRight() {
    const [index, setIndex] = useState(-1);
    const [del, setDel] = useState(false);

    const handleClick = (id) => {
        songs.data.filter((song, i) => {
            if (i == id) {
                song.status = 'current';
            } else if (i < id) {
                song.status = 'prev';
            } else {
                song.status = 'next';
            }
        });
        setIndex(id);
    };

    const handleDelete = (id) => {
        songs.data.splice(id, 1);
        setDel(!del);
    };

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('song')}>
                {songs.data.map((song, index) => (
                    <Song
                        key={index}
                        id={index}
                        data={song}
                        status={song.status}
                        playlist={songs.playlist}
                        onClick={handleClick}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default SidebarRight;
