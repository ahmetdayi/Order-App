import React, {useRef, useState} from 'react';
import classes from "./MealItemForm.module.css"
import Input from "../../UI/Input/Input";
function MealItemForm(props) {
    const [amountIsValid,setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitFormHandler = (event)=> {
        event.preventDefault();
        const amountRefValue = amountInputRef.current.value;
        const amountRefValueNumber = +amountRefValue;
        if(amountRefValue.trim().length===0 || amountRefValueNumber <1 || amountRefValueNumber>5){
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(amountRefValueNumber);
    }

    return (
        <form className={classes.form} onSubmit={submitFormHandler}>
            <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id:'amount',
                    type:'number',
                    min:'1',
                    max:'5',
                    step:"1",
                    defaultValue:'1'
                }}
            />
            <button> add</button>
            {!amountIsValid && <p>Please enter valid amount (1-5)</p>}
        </form>
    );
}

export default MealItemForm;