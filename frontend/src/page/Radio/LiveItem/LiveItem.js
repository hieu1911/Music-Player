import classNames from "classnames/bind";
import styles from './LiveItem.module.scss'

const cx = classNames.bind(styles)

function LiveItem({ data }) {
    return <div className={cx('wrapper')}>
        <div className={cx('cart-content')}>
            <img src={data.program.thumbnail} className={cx('cart-image')}/>
            <img src={data.thumbnail} className={cx('host-image')}/>
            <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/live-tag.svg" className={cx('label')}/>
        </div>
        <div className={cx('bot-content')}>
            <h4>{data.host.name}</h4>
            <h5>{`${data.activeUsers} đang nghe`}</h5>
        </div>
    </div>;
}

export default LiveItem;