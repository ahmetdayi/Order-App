import React, {useReducer} from 'react';
import CartContext from "./cart-context";


const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {

    if (action.type === "ADD") {
        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);

        //! yenı eklenen itemın ıdsınden cartta baska var mı dıye bakıyoruz ve o elementın ındexını buluyoruz
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        //! indexini buldugumuz ıtemın kendısını buluyoruz
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if (existingCartItem) {
            //! buldugumuzu ıtemı seperate yapıp amountunu guncellıyoruz
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + 1
            };

            //! amountunu guncelledıgımız ıtemı tekrar cart arrayıne atıyoruz kı update ıslemı tamamlansın
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            //! eger sepette aynı ıd den yoksa dırekt carta yenı ıtemı eklıyoruz
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === "REMOVE") {

        let updatedItems;

        const existingItemIndex = state.items.findIndex((item) => item.id === action.id);

        const existingItem = state.items[existingItemIndex];

        const updatedTotalAmount = state.totalAmount - existingItem.price;


        if (existingItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1
            };
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if (action.type === "CLEAR") {
        return defaultCartState;
    }

    return defaultCartState;

}

function CartProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: "ADD", item: item});
    }
    const removeItemToCartHandler = (id) => {
        dispatchCartAction({type: "REMOVE", id: id});
    }
    const clearItemToCartHandler = () => {
        dispatchCartAction({type: "CLEAR"});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
        clearItem: clearItemToCartHandler
    }


    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;