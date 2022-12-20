import { useState, useEffect } from 'react'
import classNames from "classnames/bind";

import styles from './Home.module.scss'
import * as api from '../../services'
import Song from '../../components/Song/Song'
import Playlist from '../../components/Playlist/Playlist';

const cx = classNames.bind(styles)

const type = ['all', 'vPop', 'others']

function Home() {
    const [apiHome, setApiHome] = useState([])
    const [songType, setSongType] = useState('all')

    useEffect(() => {
        const fetchApiHome = async () => {
            let response = await api.getHome();
            let results = response.data.data.items;
            setApiHome(results)
            // console.log(results)
        }

        fetchApiHome()
    }, [])

    const gallery = apiHome.filter(item => item.sectionType == 'banner')[0]
    const galleryItems = gallery ? gallery.items.slice(0, 3) : []

    const newRelease = apiHome.filter(item => item.sectionType == 'new-release')[0]
    const newReleaseItems = newRelease ? newRelease.items : {}
    
    const playlist = apiHome.filter(item => item.sectionType == 'playlist')

    return <div className={cx('wrapper')}>
        <div className={cx('gallery')}>
            {galleryItems.map((item, index) => (<div key={index}>
                <img src={item.banner} className={cx('banner-item')}/>
            </div>))}
        </div>
        <div className={cx('new-release')}>
            <h2>New Release</h2>
            <div className={cx('button-type')}>
                {type.map(type => <button key={type} className={cx({active: type==songType})} onClick={() => setSongType(type)}>
                    {type[0].toUpperCase() + type.slice(1)}
                </button>)}
            </div>
            <div className={cx('top-song')}>
                {newReleaseItems[songType] ? newReleaseItems[songType].map((item, index) => <div key={index}>
                    <Song data={item} />
                </div>) : <></>}
            </div>
        </div>
        <div className={cx('wrapper-playlist')}>
           {playlist.map((item, index) => <div key={index} className={cx('playlist')}>
                <h3 className={cx('playlist-title')}>{item.title}</h3>
                <div className={cx('playlist-item')}>
                    {item.items.slice(0, 4).map((itemChild, indexChild) => (
                        <Playlist key={indexChild} data={itemChild} />
                    ))}
                </div>
           </div>)}
        </div>
    </div>;
}

export default Home;
