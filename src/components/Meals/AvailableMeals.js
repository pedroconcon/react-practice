import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useCallback, useEffect, useState } from 'react';



const AvailableMeals = () => {

  const[meal,setMeal] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  const[httpError,setHttpError] = useState();

  const getMeals = useCallback(async () =>{
    const data = await fetch("https://react-http-c982c-default-rtdb.firebaseio.com/meals.json");

    if(!data.ok){
      throw new Error('Something went wrong!')
    }
  
    const response =  await data.json();

    setMeal(response);
    setIsLoading(false);
  },[])

  useEffect(() =>{
      
    getMeals().catch((error) =>{       
        setIsLoading(false);
        console.log(error)
        setHttpError(error.message);
      })    
  },[getMeals])

  if(isLoading){
    return <section>
     <p className={classes.MealsLoading}>Loading...</p> 
    </section>
  }

  if(httpError){
    return <section className={classes.MealsError}> 
      <p>{httpError}</p>
    </section>
  }


  const mealsList = meal.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
