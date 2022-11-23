import React from 'react';
import './Styles.scss';

function Styles({ children }) {
    return React.Children.only(children);
}

export default Styles;
