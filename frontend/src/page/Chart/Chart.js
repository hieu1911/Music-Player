import classNames from 'classnames/bind';
import styles from './Chart.module.scss';
import Song from '../../components/Song/Song';

const cx = classNames.bind(styles);

function Chart() {
    const topMusic = [];
    return (
        <div className={cx('wrapper')}>
            {topMusic.map((index, item) => (
                <div>
                    <span className={cx('top-song')}>{index}</span>
                    <Song key={index} data={item} />
                    <span className={cx('time')}>'04.01'</span>
                </div>
            ))}
        </div>
    );
}

export default Chart;
