import React from 'react';

const Orderlist = (props) => {
    // console.log(props.order);
    const {order} = props;
    return (
        <div>
            <h3>Order summary</h3>
            <h4>count:{order.length}</h4>
        </div>
    );
};

export default Orderlist;