import { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import classNames from 'classnames/bind';

import styles from './Chart.module.scss';
import Song from '../../components/Song/Song';
import * as api from '../../services'

const cx = classNames.bind(styles);

function ChartPage() {
    const colors = ['#36a2eb', '#4bc0c0', '#ff6384']
    const [apiChart, setApiChart] = useState([])
    const [weekChart, setWeekChart] = useState({})
    const [songItems, setSongItems] = useState({})
    const [labels, setLabels] = useState([])
    const [songInfo, setSongInfo] = useState([])
      
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )
    ChartJS.defaults.color = '#b3bac2';
 
    useEffect(() => {
        const fetchApiChart = async () => {
            const response = await api.getChart()
            const results = response.data.data
            setApiChart(results.RTChart.items.slice(0, 10))
            setWeekChart(results.weekChart)

            const items = results.RTChart.chart.items
            setSongItems(items)

            const l = results.RTChart.chart.times
            setLabels(l.map(item => item.hour + ':00')) 
        }

        fetchApiChart()
    }, [])

    useEffect(() => {
        const fetchApiInfoSong = async (id) => {
            const res = await api.getInfoSong(id)
            const result = res.data.data.title
            setSongInfo(prev => {
                if (prev.includes(result)) {
                    return [...prev]
                } else {
                    return [...prev, result]
                }
            })
        }   

        if (Object.keys(songItems).length > 0) {
            Object.keys(songItems).map(item => {
                if (item) {
                    fetchApiInfoSong(item)
                }
            })
        }
    }, [songItems])

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
   
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header')}>#Chart</h2>
            <div className={cx('chart')}>
                {songInfo.length > 0 ? <Line
                    datasetIdKey='id'
                    data={{
                        labels: labels.map((item, index) => {
                            let result = []
                            if (index % 2 == 0) {
                                result.push(item)
                            }
                            return result
                        }),
                        datasets:Object.values(songItems).map((item, index) => ({
                            label: songInfo[index],
                            data: item.map(child=> child.counter),
                            borderColor: colors[index],
                            backgroundColor: colors[index],
                        }))
                    }} 
                           /> : <></>}
            </div>
           <div className={cx('top-song-wrapper')}>
                {apiChart.map((item, index) => (
                        <div key={index} className={cx('item-wrapper')}>
                            <span className={cx('top-song', {top1:index==0, top2:index==1, top3:index==2})}>{index + 1}</span>
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
                    {Object.keys(weekChart).map((item, index )=> (
                        <div key={index} className={cx('chart-box')}>
                            <h4>{item.toUpperCase()}</h4>
                            {weekChart[item].items.slice(0, 5).map((song, index) => (
                                <div className={cx('song-item')} key={index}>
                                    <span className={cx('top-song')}>{index + 1}</span>
                                    <Song data={song} key={index}/>
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
