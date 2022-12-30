import classNames from "classnames/bind";
import styles from './Artist.module.scss'

const cx = classNames.bind(styles)

function Artist({ data }) {
    return ( <div className={cx('wrapper')}>
        <img src={data.thumbnail}/>
        <h4>{data.name}</h4>
        <h5>{data.totalFollow + ' follows'}</h5>
    </div> );
}

export default Artist;