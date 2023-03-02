import React, {useEffect, useState} from 'react';

import classes from "./AvailableMeals.module.css"
import Card from "../UI/Card/Card";

import MealItem from "./MealItem/MealItem";

function AvailableMeals(props) {

    const [meals, setMeals] = useState([]);
    const [loading,setLoading] = useState(true);
    const [httpError,setHttpError] = useState();
    useEffect(() => {
        const fetchingData = async () => {
            const response
                = await
                fetch('https://react-eb541-default-rtdb.europe-west1.firebasedatabase.app/react/meals.json');

            if (!response.ok){
                setHttpError('Something is wrong.');
            }
            const responseData = await response.json();

            const loadedData = [];

            for (const key in responseData) {
                loadedData.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }
            setMeals(loadedData);
            setLoading(false);
        };

        fetchingData().catch((error)=>{
            setLoading(false);
            setHttpError(error.message)
        });

    }, [])

    if (loading){
        return <section>
            <p className={classes.mealsLoading}>Loading...</p>
        </section>
    }
    if (httpError){
        return <section>
            <p className={classes.mealsError}>{httpError}</p>
        </section>;
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {meals.map((meal, index) => (
                        <MealItem
                            key={index}
                            id={meal.id}
                            name={meal.name}
                            description={meal.description}
                            price={meal.price}
                        />
                    ))}
                </ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;