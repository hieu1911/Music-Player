import { useEffect, useState, useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import classNames from 'classnames/bind';

import Song from '../../components/Song/Song';
import * as api from '../../services';
import { fomatTime } from '../../components/func';
import styles from './Chart.module.scss';

const cx = classNames.bind(styles);

function ChartPage() {
    const colors = ['#36a2eb', '#4bc0c0', '#ff6384'];
    const [apiChart, setApiChart] = useState([]);
    const [weekChart, setWeekChart] = useState({});
    const [songInfo, setSongInfo] = useState([])
    
    const [data, setData] = useState({});

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    ChartJS.defaults.color = '#b3bac2';

    useEffect(() => {
        const fetchApiChart = async () => {
            const response = await api.getChart();
            const results = response.data.data;
            setApiChart(results.RTChart.items.slice(0, 10));
            setWeekChart(results.weekChart);

            const items = results.RTChart.chart.items;

            const l = results.RTChart.chart.times;
            const labels = l.filter((item) => +item.hour % 2 === 0)?.map((item) => item.hour + ':00');

            const datasets = [];
            if (items) {
                for (let i = 0; i < 3; ++i) {
                    datasets.push({
                        data: items[Object.keys(items)[i]]
                            .filter((item) => +item.hour % 2 === 0)
                            .map((item) => item.counter),
                        borderColor: colors[i],
                        backgroundColor: colors[i],
                        tension: 0.3,
                        borderWidth: 2,
                        pointBackgroundColor: 'white',
                        pointHoverRadius: 5,
                        pointBorderColor: colors[i],
                        poinHOverBorderWidth: 5
                    });
                }
            }

            setData({ labels, datasets });
           
            let songInf = []
            const fetchApiInfoSong = async (id) => {
                const res = await api.getInfoSong(id);
                const result = res.data.data;

                if (!songInf.includes(result)) {
                    songInf.push(result);
                }
            };

            if (Object.keys(items).length > 0) {
                Object.keys(items).map((item) => {
                    if (item) {
                        fetchApiInfoSong(item);
                    }
                });
            }
            setSongInfo(songInf);
        };

        fetchApiChart();
    }, []);

    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(255, 255, 255, 0.3)', drawTicks: false },
                border: {dash: [3, 4]},
            },

            x: {
                tichs: { color: 'blue' },
                grid: { color: 'transparent' },
            },
        },
        plugins: {
            legend: false,
        },
        hover: {
            mode: 'dataset',
            intersect: false,
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header')}>#Chart</h2>
            <div className={cx('chart')}>
                {data.labels ? <Line datasetIdKey="id" data={data} options={options} /> : <>
                </>}
            </div>
            <div className={cx('top-song-wrapper')}>
                {apiChart.map((item, index) => (
                    <div key={index} className={cx('item-wrapper')}>
                        <span className={cx('top-song', { top1: index == 0, top2: index == 1, top3: index == 2 })}>
                            {index + 1}
                        </span>
                        <span className={cx('song')}>
                            <Song data={item} />
                        </span>
                        <span className={cx('album')}>{item.hasOwnProperty('album') ? item.album.title : ''}</span>
                        <span className={cx('time')}>{fomatTime(item.duration)}</span>
                    </div>
                ))}
            </div>
            <div className={cx('weekly-chart')}>
                <h3 className={cx('title')}>Weekly Chart</h3>
                <div className={cx('chart-wrapper')}>
                    {Object.keys(weekChart).map((item, index) => (
                        <div key={index} className={cx('chart-box')}>
                            <h4>{item.toUpperCase()}</h4>
                            {weekChart[item].items.slice(0, 5).map((song, index) => (
                                <div className={cx('song-item')} key={index}>
                                    <span className={cx('top-song')}>{index + 1}</span>
                                    <Song data={song} key={index} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChartPage;
