import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import Meal from '../Meal/Meal';
import Orderlist from '../Orderlist/Orderlist';
import './Resturant.css';

const Resturant = () => {
    const [meals, setMeals] = useState([]);
    const [order, setOrder] = useState([]);
    useEffect(()=>{
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=b')
        .then(res=>res.json())
        .then(data=>setMeals(data.meals))
    },[]);

    const handleOrder =(meal) =>{
        const newOrder = [...order, meal];
        setOrder(newOrder);
    }

    return (
        <div>

           <section>
               <div className="main-container">
                    <div className="meal-conatiner">
                        {
                            meals.map(meal=><Meal meal={meal}
                            handleOrder={handleOrder}
                            key={meal.idMeal}
                            ></Meal>)
                        }
                    </div>
                    <div className="cart-container">
                       <Orderlist order={order}></Orderlist>
                    </div>
                </div>
           </section>

        </div>
    );
};

export default Resturant;