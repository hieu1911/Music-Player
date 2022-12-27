import { useState, useEffect, Fragment } from 'react';
import classNames from 'classnames/bind';

import styles from './Category.module.scss'
import Playlist from '../../components/Playlist/Playlist';
import * as api from '../../services'

const cx = classNames.bind(styles)

function Category() {

    const [categoryApi, setCategoryApi] = useState({})

    useEffect(() => {
        const fetchDataCategory = async () => {
            const response = await api.getCategory()
            const results = response.data[0].data
            console.log(results)
            setCategoryApi(results)
        }

        fetchDataCategory()
    }, [])

    return <Fragment>
        {categoryApi.banners ? <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <img src={categoryApi.banners[0].cover} />
            </div>
            <div className={cx('featured')}>
                <h3>{categoryApi.featured.title}</h3>
                <div className={cx('wrapper-item')}>
                    {categoryApi.featured.items.slice(1).map((item, index) => (
                        <img src={item.thumbnailHasText} key={index}/>
                    ))}
                </div>
            </div>
            <div className={cx('nation')}>
                <h3>Quốc Gia</h3>
                <div className={cx('wrapper-item')}>
                    {categoryApi.nations.slice(1).map((item, index) => (
                        <img src={item.thumbnailHasText} key={index}/>
                    ))}
                </div>
            </div>
            <div className={cx('top-topic')}>
                <h3>Tâm Trạng Và Hoạt Động</h3>
                <div className={cx('wrapper-item')}>
                    {categoryApi.topTopic.slice(1).map((item, index) => (
                        <img src={item.thumbnailHasText} key={index}/>
                    ))}
                </div>
            </div>
            <div className={cx('genre')}>
                {categoryApi.genre.map((item, index) => <div key={index}>
                    <h3>{item.title}</h3>
                    <div className={cx('genre-item')}>
                        {item.playlists.slice(2).map((itemChild, indexChild) =>
                            <span key={indexChild}>
                                <Playlist data={itemChild}/>
                            </span>)}
                    </div>
                </div>)}
            </div>
        </div> : <></>}
    </Fragment>
}

export default Category;
