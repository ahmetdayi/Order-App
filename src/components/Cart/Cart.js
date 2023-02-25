import React, {useContext} from 'react';
import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css"
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem/CartItem";


function Cart(props) {

    const cartCtx = useContext(CartContext);

    const totalAmount = cartCtx.totalAmount.toFixed(2);

    const hasItem = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id)=>{

    };

    const cartItemAddHandler = (item)=>{

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


    return (
        <Modal onHideCart={props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{`$ ${totalAmount}`}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={props.onHideCart}>Close</button>
                {hasItem && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;