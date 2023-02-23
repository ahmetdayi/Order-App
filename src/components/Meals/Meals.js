import React, {Fragment} from 'react';
import AvailableMeals from "./AvailableMeals";
import MealsSummery from "./MealsSummery";

function Meals(props) {
    return (
        <Fragment>
            <MealsSummery/>
            <AvailableMeals/>
        </Fragment>
    );
}

export default Meals;