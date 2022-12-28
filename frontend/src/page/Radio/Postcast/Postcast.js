import classNames from "classnames/bind";
import styles from './Postcast.module.scss';

const cx = classNames.bind(styles)

function Postcast({data}) {
    return <div className={cx('wrapper')}>
        <img className={cx('postcast-img')} src={data.thumbnail}/>
        <span className={cx('postcast-name')}>{data.title}</span>
    </div>
}

export default Postcast;