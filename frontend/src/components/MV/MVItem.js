import classNames from "classnames/bind";
import styles from './MVItem.module.scss'

const cx = classNames.bind(styles)
 
function MVItem({ data }) {
    return <div className={cx('wrapper')}>
        <img src={data.thumbnailM} className={cx('image-mv')}/>
        <div className={cx('info')}>
            <img src={data.artist.thumbnail} className={cx('image-artist')}/>
            <div>
                <span className={cx('name-mv')}>{data.title}</span>
                <a className={cx('name-artist')}>{data.artist.name}</a>
            </div>
        </div>
    </div>;
}

export default MVItem;