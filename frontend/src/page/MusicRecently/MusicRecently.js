import { useState, useEffect, Fragment } from 'react'
import classNames from 'classnames/bind'

import * as api from '../../services'
import Song from '../../components/Song/Song'
import Playlist from '../../components/Playlist/Playlist'
import { fomatTime } from '../../components/func';
import styles from './MusicRecently.module.scss'

const cx = classNames.bind(styles)
const type = ['MUSIC', 'PLAYLIST']

function MusicRecently() {
    const [musicApi, setMusicApi] = useState({})
    const [playlistApi, setPlaylistApi] = useState({})
    const [btnType, setBtnType] = useState('MUSIC')

    useEffect(() => {
        const fetchApiMusic = async () => {
            let music = await api.getMusicRecently();
            let musicResults = music.data[0].data;
            setMusicApi(musicResults)

            let playlist = await api.getPlaylistRecently();
            let playlistResutls = playlist.data[0].data;
            setPlaylistApi(playlistResutls)

            // console.log(musicResults)
        }

        fetchApiMusic()
    }, [])

    return <Fragment>
        {musicApi.items && playlistApi.items ? <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <h2>RECENTLY</h2>
                <h4 className={cx({active: btnType == 'MUSIC'})} onClick={() => setBtnType('MUSIC')}>SONGS</h4>
                <h4 className={cx({active: btnType == 'PLAYLIST'})} onClick={() => setBtnType('PLAYLIST')}>PLAYLIST</h4>
            </div>
            {btnType == 'MUSIC' ? <div className={cx('music-container')}>
                {musicApi.items.map((item, index) => 
                <div key={index} className={cx('music-item')}>
                    <span className={cx('song')}>
                        <Song data={item}/>
                    </span>
                    <span className={cx('album')}>{item.hasOwnProperty('album') ? item.album.title : ''}</span>
                    <span className={cx('time')}>{fomatTime(item.duration)}</span>
                </div>)}
            </div> : <div className={cx('playlist-container')}>
                {playlistApi.items.map((item, index) => <span key={index}>
                    <Playlist data={item}/>
                </span>)}
            </div>}
        </div> : <></>}
    </Fragment>;
}

export default MusicRecently;
