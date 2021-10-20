import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import { addToDb, getDb } from '../../localstorage/localstorage';
import Meal from '../Meal/Meal';
import Orderlist from '../Orderlist/Orderlist';
import './Resturant.css';

const Resturant = () => {
    const [meals, setMeals] = useState([]);
    const [order, setOrder] = useState([]);
    // const [searchValue, setSearchValue] = useState('');
    // const [showValue, setShowValue] = useState([]);
    useEffect(()=>{
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=b')
        .then(res=>res.json())
        .then(data=>setMeals(data.meals))
    },[]);

    //search api load 
    // useEffect(()=>{
    //     const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
    //     fetch(url)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         if(data.meals!==null){
    //             setShowValue(data.meals)
    //         }
    //     })
    // },[searchValue])

    //load and show local storage data on ui=>

    useEffect(()=>{
        if(meals.length){
            const savedDb = getDb();
            let savedOrder = [];
            for(const mealId in savedDb){
                const meal = meals.find(ml=>ml.idMeal === mealId)
                let quantity = savedDb[mealId];
                console.log(quantity)
                 meal.quantity = quantity;
                savedOrder.push(meal);
        }
    }
        

    },[meals])



    // useEffect(()=>{
    //     if(meals.length){
    //         const savedDb = getDb();
    //         const savedOrder = [];
    //         for(const mealId in savedDb){
                
    //             const meal = meals.find(ml=>ml.idMeal === mealId)
    //             const quantity = savedDb[mealId];
    //             meal.quantity = quantity;
    //             savedOrder.push(meal); 

    //         }
    //         setOrder(savedOrder)
    //     }
        

    // },[meals])

    const handleOrder =(meal) =>{
        //jeheto main obj e quantity nei so initially amra quamtity 1 dhore dilam
        meal.quantity = 1;
        const newOrder = [...order, meal];
        setOrder(newOrder);
       addToDb(meal.idMeal)
    }

    // const handleSearch = (e) =>{
    //     const searchText = e.target.value;
        
    //     if(searchText !==''){
    //         setSearchValue(searchText)
    //     }
        
    // }
    return (
        <div>

           <section>

            <div className="searchbar">
                    <input type="text" placeholder="please search your food"/>
            </div>       
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