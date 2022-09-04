import React from 'react';
const items = ["MASHUPS", "RELEASES", "BONUS HUNTER"];

const List = () => {
    const listItems = items.map((item) =>
        <li key={item}>{item}</li>
    );
    return (
        <ul>{listItems}</ul>
    )
};
export default List;
