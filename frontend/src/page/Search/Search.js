import { useState, useContext, Fragment} from 'react'
import { DataContext } from '../../dataContext';
import classNames from 'classnames/bind';

import Song from '../../components/Song/Song'
import Playlist from '../../components/Playlist/Playlist'
import Artist from '../../components/Artist/Artist'
import MVItem from '../../components/MV/MVItem'
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

const types = ['SONG', 'PLAYLIST', 'ARTIST', 'MV']

function Search() {
    const [type, setType] = useState('SONG');

    const value = useContext(DataContext)
    console.log(value.searchResult)

    const fomatTime = (time) => {
        let surplusTime = time % 60
        let integerTime = (time - surplusTime) / 60
        let integerTimeS = integerTime
        let surplusTimeS = surplusTime
        if (integerTime < 10)  {
            integerTimeS = '0' + integerTime.toString()
        }
        if (surplusTime < 10)  {
            surplusTimeS = '0' + surplusTime.toString()
        }
        return integerTimeS + ':' + surplusTimeS
    }

    return ( <Fragment>
        {value.searchResult ? <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <h2>SEARCH RESULT</h2>
                {types.map(item => <button key={item} onClick={() => setType(item)} className={cx({active: type == item})}>{item}</button>)}
            </div>
            {type == 'SONG' && value.searchResult.songs ? <div className={cx('song-wrapper')}>
                {value.searchResult.songs.map((item, index) => <div key={index} className={cx('item')}>
                            <span className={cx('song')}>
                                <Song data={item} />
                            </span>
                            <span className={cx('album')}>{item.hasOwnProperty('album') ? item.album.title : ''}</span>
                            <span className={cx('time')}>{fomatTime(item.duration)}</span>
                        </div>)}
            </div> : <></>}
            {type == 'PLAYLIST' && value.searchResult.playlists ? <div className={cx('playlist-wrapper')}>
                {value.searchResult.playlists.map((item, index) => <span key={index}>
                    <Playlist data={item}/>
                </span>)}
            </div> : <></>}
            {type == 'ARTIST' && value.searchResult.artists ? <div className={cx('artist-wrapper')}>
                {value.searchResult.artists.map((item, index) => <span key={index}>
                    <Artist data={item}/>
                </span>)}
            </div> : <></>}
            {type == 'MV' && value.searchResult.videos ? <div className={cx('mv-wrapper')}>
                {value.searchResult.videos.map((item, index) => <span key={index}>
                    <MVItem data={item}/>
                </span>)}
            </div> : <></>}
        </div> : <></>}
    </Fragment> );
}

export default Search;