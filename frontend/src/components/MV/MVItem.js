import { Fragment } from 'react';
import classNames from 'classnames/bind';
import styles from './MVItem.module.scss'

const cx = classNames.bind(styles)
 
function MVItem({ data }) {
    return <div>
        {data ? <div className={cx('wrapper')}>
            <img src={data.thumbnailM} className={cx('image-mv')}/>
            <div className={cx('info')}>
                <Fragment>{data.artist ? <img src={data.artist.thumbnail} className={cx('image-artist')}/> : <></>}</Fragment>
                <div>
                    <span className={cx('name-mv')}>{data.title}</span>
                    <Fragment>{data.artist ? <a className={cx('name-artist')}>{data.artist.name}</a> : <></>}</Fragment>
                </div>
            </div>
        </div> : <></>}
    </div>;
}

export default MVItem;