import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind'

import styles from './Playlist.module.scss'

const cx = classNames.bind(styles)
const type = ['All', 'MyP']

function Playlist() {
    const [typeP, setTypeP] = useState('All')
    const AllPlaylist = []
    const MyPlaylist = []

    return <div className={cx('wrapper')}>
        <div className={cx('navbar')}>
            <h2>Playlist</h2>
            <button onClick={() => setTypeP('All')} className={cx({active: typeP == 'All'})}>ALL</button>
            <button onClick={() => setTypeP('MyP')} className={cx({active: typeP == 'MyP'})}>MY PLAYLIST</button>
        </div>
        {typeP == 'All' ? <div>
            {AllPlaylist.length > 0 ? <div>

            </div> : <div className={cx('container')}>
                <span>
                    <FontAwesomeIcon icon={faPlus}/>
                </span>
                <p>Create new playlist</p>
            </div>}
        </div> : <div>
            {MyPlaylist.length > 0 ? <div>

            </div> : <div className={cx('container')}>
            <span>
                <FontAwesomeIcon icon={faPlus}/>
            </span>
                <p>Create new playlist</p>
            </div>}
        </div>}
    </div>;
}

export default Playlist;
