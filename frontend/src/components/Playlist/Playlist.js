import classNames from "classnames/bind";
import styles from './Playlist.module.scss';

const cx = classNames.bind(styles)

function Playlist({data}) {
    return <div className={cx('wrapper')}>
        <img className={cx('playlist-img')} src={data.thumbnail}/>
        <span className={cx('playlist-name')}>{data.title}</span>
        <span className={cx('playlist-des')}>{data.sortDescription}</span>
    </div>
}

export default Playlist;