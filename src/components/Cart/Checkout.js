import React, {useRef, useState} from 'react';
import classes from "./Checkout.module.css"

const Checkout = (props) => {
    const [formValidity,setFormValidity] = useState({
        name:true,
        street:true,
        postalCode:true,
        city:true
    });



    const isEmpty = (inputRef)=>{
        return inputRef.trim() === "";
    }
    const isFiveChar = (inputRef)=>{return inputRef.trim().length === 5}

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();
    const confirmHandler = (event)=>{
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCOde = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const nameValid = !isEmpty(enteredName);
        const streetValid = !isEmpty(enteredStreet);
        const postalCodeValid = !isEmpty(enteredPostalCOde) && isFiveChar(enteredPostalCOde);
        const cityValid = !isEmpty(enteredCity);

        setFormValidity({
            name:nameValid,
            street: streetValid,
            postalCode: postalCodeValid,
            city: cityValid
        });

        const  formIsValid = nameValid && streetValid && postalCodeValid && cityValid;

        if (!formIsValid){
            return;
        }

        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            postalCode:enteredPostalCOde,
            city:enteredCity
        });
    }

    const nameControlClasses = `${classes.control} ${formValidity.name ? '' : classes.invalid}`;

    const streetControlClasses = `${classes.control} ${formValidity.street ? '' : classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${
        formValidity.postalCode ? '' : classes.invalid
    }`;
    const cityControlClasses = `${classes.control} ${
        formValidity.city ? '' : classes.invalid
    }`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef}/>
                {!formValidity.name && <p>Please enter valid name!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef}/>
                {!formValidity.street && <p>Please enter valid street!</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postalCodeInputRef}/>
                {!formValidity.postalCode && <p>Please enter valid postalCode!</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef}/>
                {!formValidity.city && <p>Please enter valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onClose}>Close</button>
                <button className={classes.submit} type="submit">Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;