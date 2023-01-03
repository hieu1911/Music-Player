import { useState, useRef, Fragment } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import config from '../../config/config';
import styles from './MusicUpload.module.scss';

const cx = classNames.bind(styles);
const type = ['SONG', 'MV'];

function MusicUpload() {
    const inputFile = useRef();
    const musicUploadData = [];
    const libMV = [];
    const [typebtn, setTypebtn] = useState('SONG');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <h2 className={cx({ active: typebtn == 'SONG' })} onClick={() => setTypebtn('SONG')}>
                    SONG
                </h2>
                <h2 className={cx({ active: typebtn == 'MV' })} onClick={() => setTypebtn('MV')}>
                    MV
                </h2>
            </div>
            {typebtn == 'SONG' ? (
                <Fragment>
                    <div className={cx('nav-btn')}>
                        <Link to={config.routes.song}>
                            <button>FAVORITE</button>
                        </Link>
                        <button className={cx('active')}>UPLOADED</button>
                    </div>
                    <div>
                        {musicUploadData.length > 0 ? (
                            <div></div>
                        ) : (
                            <div className={cx('container')}>
                                <h2>No songs uploaded in personal library yet</h2>
                                <button onClick={() => inputFile.current.click()}>
                                    <span>UPLOAD NOW</span>
                                    <input type="file" id="file" accept="audio/mp3" ref={inputFile} style={{ display: 'none' }} />
                                </button>
                            </div>
                        )}
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    {libMV.length > 0 ? (
                        <div></div>
                    ) : (
                        <div className={cx('mv-container')}>
                            <h2>There are no MVs in your personal library yet</h2>
                            <button>DISCOVER NOW</button>
                        </div>
                    )}
                </Fragment>
            )}
        </div>
    );
}

export default MusicUpload;
