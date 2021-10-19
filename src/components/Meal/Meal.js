import React from 'react';
import './Meal.css';

const Meal = (props) => {
    // console.log(props);
    const{strMealThumb, strCategory, strMeal,strInstructions}=props.meal;
    const {handleOrder, meal} = props;
    return (
        <div>
          <div>
              <div className="single-card">
                  <img src={strMealThumb} alt="" />
                  <h3>Item : {strMeal}</h3>
                  <h4>Category:{strCategory}</h4>
                  <p>{strInstructions.slice(0, 100)}</p>
                  <button onClick={()=>handleOrder(meal)}>add to cart</button>
              </div>
          </div>
        </div>
    );
};

export default Meal;