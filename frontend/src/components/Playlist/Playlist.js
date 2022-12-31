import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { DataContext } from '../../dataContext';
import config from '../../config/config';
import styles from './Playlist.module.scss';

const cx = classNames.bind(styles);

function Playlist({ data }) {
    const value = useContext(DataContext);

    return (
        <div className={cx('wrapper')}>
            <Link to={config.routes.playlistDetail}>
                <img
                    className={cx('playlist-img')}
                    src={data.thumbnail}
                    onClick={() => {
                        value.setPlaylist(data);
                        localStorage.setItem('playlist', JSON.stringify(data));
                    }}
                />
            </Link>
            <span className={cx('playlist-name')}>{data.title}</span>
            <span className={cx('playlist-des')}>{data.sortDescription}</span>
        </div>
    );
}

export default Playlist;
