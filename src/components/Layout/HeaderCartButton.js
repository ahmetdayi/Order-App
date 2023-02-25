import React, {useContext, useEffect, useState} from 'react';
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css"
import cartContext from "../../store/cart-context";

function HeaderCartButton(props) {

    const [btnIsHighLighted,setBtnIsHighLighted] = useState(false);

    const cartCtx = useContext(cartContext);


    const buttonClasses = `${classes.button} ${btnIsHighLighted && classes.bump}`

    useEffect(()=>{

        if (cartCtx.items.length===0){
            return;
        }

        setBtnIsHighLighted(true);
        const timer = setTimeout(()=>{
            setBtnIsHighLighted(false);
        },300)

        return ()=>{
            clearTimeout(timer);
        };

    },[cartCtx])

    const numberOfCartItems = cartCtx.items.reduce((curNumber,item) =>{
        return curNumber + item.amount;
    },0)
    return (
        <button onClick={props.onShowCart} className={buttonClasses}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>

    );
}

export default HeaderCartButton;