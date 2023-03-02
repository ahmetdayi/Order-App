import React, {Fragment, useContext, useState} from 'react';
import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css"
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout";


function Cart(props) {
    const [isCheckout,setIsCheckout] = useState(false);

    const [isSubmitting,setIsSubmitting] = useState(false);

    const[didSubmit,setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = cartCtx.totalAmount.toFixed(2);

    const hasItem = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id)=>{
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item)=>{
        cartCtx.addItem(item);
    }


    const cartItems = (<ul className={classes['cart-items']}>
        {cartCtx.items.map((item, index) =>
            (
                <CartItem
                    key={index}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null,item.id)}
                    onAdd={cartItemAddHandler.bind(null,item)}

                />

            ))
        }
    </ul>
    );

    const submitHandler = async (userData)=>{
        setIsSubmitting(true);
        await fetch("https://react-eb541-default-rtdb.europe-west1.firebasedatabase.app/react/orders.json",{
            method:'POST',
            body: JSON.stringify({
                user:userData,
                order:cartCtx.items
            })
    });
        setIsSubmitting(false)
        setDidSubmit(true);
        cartCtx.clearItem();
    };

    const onCheckoutHandler = ()=>{
        setIsCheckout(true);
    }

    const modal = <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>Close</button>
        {hasItem && <button className={classes.button} onClick={onCheckoutHandler}>Order</button>}
    </div>;

    const isSubmittingModalContent = <p>Sending order data...</p>;
    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onHideCart}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{`$ ${totalAmount}`}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitHandler} onClose={props.onHideCart}/>}
            {!isCheckout && modal}
        </Fragment>
    );

    return (
        <Modal onHideCart={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
}

export default Cart;