import React from 'react';

const Orderlist = (props) => {

    const {order} = props;
    const countReducer = (pre, curr) =>pre + curr.quantity;
    const count = order.reduce(countReducer,0)
    return (
        <div>
            <h3>Order summary</h3>
            <h4>count:{count}</h4>
        </div>
    );
};

export default Orderlist;