import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);

    //this is for place order button
    const [orderPlaced, setOrderPlaced] = useState(false);
    const handlePlaceOrder = () =>{
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }
    //this is for remove product
    const removeProduct = (productKey) =>{
      const newCart = cart.filter(pd => pd.key !== productKey);
      setCart(newCart);

      removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProduct = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key]
            return product;
        });
        setCart(cartProduct);
    },[])

    let thankyou;
    if(orderPlaced){
      thankyou =   <img src={happyImage} alt=""/>
    }    
    return (
        <div className="twin-container">
                <div className="product-container">
                    {/* // <h1>Cart Item : {cart.length}</h1> */}
                    { 
                    cart.map(pd => <ReviewItem removeProduct={removeProduct} key = {pd.key}product = {pd}></ReviewItem> )
                    }
                    {
                        thankyou
                    }
                </div>

                <div className="cart-container">
                    <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                    </Cart>
                </div>

      </div>
    );
};

export default Review;