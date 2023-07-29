import React from 'react';
import "../Search/search.css";

const SearchItem = (props) => {
    const { imageUrl, title, description } = props;

    return (
        <div className="search-item" onClick={props.onClick}>

            <img src={process.env.REACT_APP_URL + "/" + imageUrl} alt="" />

            <div className="item-info">
                <div className="item-title">{title}</div>
                <div className="item-description">{description}</div>
            </div>
        </div>
    );
}

export default SearchItem;
