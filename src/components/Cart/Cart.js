import React from 'react';
import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css"

const cartItems = [{id:1,name:"aaa",totalAmount:12}].map(((items,index) =>
    (
        <ul className={classes['cart-items']} key={index}>
            <li>
                {items.id}
            </li>
            <li>
                {items.name}
            </li>
            <li>
                {items.totalAmount}
            </li>
        </ul>
    )
))
function Cart(props) {
    return (
        <Modal onHideCart = {props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>12</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={props.onHideCart}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
}

export default Cart;