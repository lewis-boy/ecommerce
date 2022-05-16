import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
//this is the little notification that appears when we add,remove from cart

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        
        
        if(checkProductInCart){
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return{
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems);
        } else{
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id)
        const newCartItems = cartItems.filter((item) => item._id !== product._id)

        setTotalPrice((prevTotalPrice) => prevTotalPrice-foundProduct.price*foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {
        //value is whether the Plus or Minus button was hit
        foundProduct = cartItems.find((item) => item._id === id)
        const newCartItems = cartItems.filter((item) => item._id !== id)

        if(value === 'inc'){
            setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        }else if(value === 'dec'){
            //when dealing with minuses -, you always want an if checking statement, so you dont go negative
            if(foundProduct.quantity > 1){
                setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decQty = () => {
        setQty((prevQty) => {
            return ( prevQty-1 < 1 ? 1 : prevQty - 1);
        });
    }
    //were including local storage so if a user closes the webpage but then comes back, then
    //his session will still show be there from a while ago

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                setCartItems,
                totalPrice,
                setTotalPrice,
                totalQuantities,
                setTotalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove
            }}
        >
            {children}
        </Context.Provider>
    )
}

//this allows us to use our state like a hook
export const useStateContext = () => useContext(Context);