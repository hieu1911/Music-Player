import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import config from "../../config/config";
import styles from './MusicUpload.module.scss';

const cx = classNames.bind(styles)

function MusicUpload() {

    const musicUploadData = []

    return <div className={cx('wrapper')}>
        <h2 className={cx('header-title')}>BÀI HÁT</h2>
        <div className={cx('btn-type')}>
            <Link to={config.routes.song}>
                <button>YÊU THÍCH</button>
            </Link>
            <button className={cx('active')}>ĐÃ TẢI LÊN</button>
        </div>
        <div>
            {musicUploadData.length > 0 ? <div></div> : <div  className={cx('container')}>
                <h2>Chưa có bài hát nào tải lên trong thư viện cá nhân</h2>
                <button>TẢI LÊN NGAY</button>
            </div>}
        </div>
    </div>;
}

export default MusicUpload;
