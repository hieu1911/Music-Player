import { useState, useRef, useEffect, useContext } from 'react';
import { useDebounce } from '../../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import * as api from '../../../services';
import { DataContext } from '../../../dataContext';
import Song from '../../../components/Song/Song';
import config from '../../../config/config';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const value = useContext(DataContext);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState({});
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const response = await api.getInfoSongByName(debounced);
            const result = response.data.data;
            setSearchResult(result);

            value.setSearchResult(result);

            setLoading(false);
        };

        fetchApi();
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <div className={cx('wrapper')}>
            <HeadlessTippy
                interactive
                visible={showResult && Object.keys(searchResult).length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <Link to={config.routes.searchpage}>
                            <h3 className={cx('search-title')}>{'Tìm kiếm ' + debounced}</h3>
                        </Link>
                        <div className={cx('search-container')}>
                            <p>Gợi ý kết quả</p>
                            {searchResult.songs ? (
                                <div className={cx('results-items')}>
                                    {searchResult.songs.slice(0, 6).map((item, idex) => (
                                        <span key={idex}>
                                            <Song data={item} />
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <Link to={config.routes.searchpage}>
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </Link>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search songs, artists, lyrics,..."
                        spellCheck={false}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
