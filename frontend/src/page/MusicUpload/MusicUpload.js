import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import config from "../../config/config";
import styles from './MusicUpload.module.scss';

const cx = classNames.bind(styles)

function MusicUpload() {

    const musicUploadData = []

    return <div className={cx('wrapper')}>
        <h2 className={cx('header-title')}>SONG</h2>
        <div className={cx('btn-type')}>
            <Link to={config.routes.song}>
                <button>FAVORITE</button>
            </Link>
            <button className={cx('active')}>UPLOADED</button>
        </div>
        <div>
            {musicUploadData.length > 0 ? <div></div> : <div  className={cx('container')}>
                <h2>No songs uploaded in personal library yet</h2>
                <button>UPLOAD NOW</button>
            </div>}
        </div>
    </div>;
}

export default MusicUpload;
