import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Song from '../../components/Song/Song';
import * as api from '../../services'
import config from '../../config/config';
import { fomatTime } from '../../components/func';
import styles from './LibrarySong.module.scss'

const cx = classNames.bind(styles)
const type = ['SONG', 'MV']

function LibrarySong() {

    const [myMusic, setMyMusic] = useState({})
    const [typebtn, setTypebtn] = useState('SONG')
    const libMV = []

    useEffect(() => {
        const fetchApiMyMusic = async () => {
            const response = await api.getMyMusic()
            const results = response.data[0].data
            // console.log(results)
            setMyMusic(results)
        }

        fetchApiMyMusic()
    },[])

    return <Fragment>
        {myMusic.items ? <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <h2 className={cx({active: typebtn == 'SONG'})} onClick={() => setTypebtn('SONG')}>SONG</h2>
                <h2 className={cx({active: typebtn == 'MV'})} onClick={() => setTypebtn('MV')}>MV</h2>
            </div>
            {typebtn == 'SONG' ? <Fragment>
                <div className={cx('nav-btn')}>
                    <button className={cx('active')}>FAVORITE</button>
                    <Link to={config.routes.musicUpload}>
                        <button>UPLOADED</button>
                    </Link>
                </div>
                <div className={cx('container')}>
                    <h2>SONGS</h2>
                    <div>
                        {myMusic.items.map((item, index) => <div key={index} className={cx('item')}>
                            <span className={cx('song')}>
                                <Song data={item} />
                            </span>
                            <span className={cx('album')}>{item.hasOwnProperty('album') ? item.album.title : ''}</span>
                            <span className={cx('time')}>{fomatTime(item.duration)}</span>
                        </div>)}
                    </div>
                </div>
            </Fragment> : <div>
                {libMV.length > 0 ? <div></div> : <div className={cx('mv-container')}>
                    <h2>There are no MVs in your personal library yet</h2>
                    <button>DISCOVER NOW</button>
                </div>}
            </div>}
        </div> : <></>}
    </Fragment>;
}

export default LibrarySong;
