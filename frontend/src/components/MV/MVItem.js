import { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { DataContext } from '../../dataContext';
import config from '../../config/config';
import styles from './MVItem.module.scss';

const cx = classNames.bind(styles);

function MVItem({ data }) {
    const value = useContext(DataContext)

    return (
        <div>
            {data ? (
                <div className={cx('wrapper')}>
                    <Link to={config.routes.video}>
                        <img src={data.thumbnailM} className={cx('image-mv')} onClick={() => {
                            localStorage.setItem('curMv', JSON.stringify(data))
                            value.setCurVideo(data)
                        }} />
                    </Link>
                    <div className={cx('info')}>
                        <Fragment>
                            {data.artist ? <img src={data.artist.thumbnail} className={cx('image-artist')} /> : <></>}
                        </Fragment>
                        <div>
                            <span className={cx('name-mv')}>{data.title}</span>
                            <Fragment>
                                {data.artist ? <a className={cx('name-artist')}>{data.artist.name}</a> : <></>}
                            </Fragment>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default MVItem;
