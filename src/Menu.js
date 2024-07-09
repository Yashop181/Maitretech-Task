import React, { useState } from 'react';
import './Csss/Menu.css';
import { useDispatch, useSelector } from "react-redux";
import { addtocart, qtyIncrease, qtyDecrease } from './redux/CaardSlice';
import firstImage  from "./assets/burger.jpeg"
import secondImage from "./assets/fries.jpeg";
import thirdImage from './assets/coke.jpeg';
import fourthImage from './assets/pepsi.jpeg'; 
const ProductGrid = () => {

  // random products to fetch
  const [products] = useState([
    {
      id: 1,
      title: "Hamburger",
      price: 200,
      image: firstImage,
    },
    {
      id: 2,
      title: "Fries",
      price: 100,
      image: secondImage,
    },
    {
      id: 3,
      title: "Coke",
      price: 50,
      image: thirdImage,
    },
    {
      id: 4,
      title: "Pepsi",
      price: 50,
      image: fourthImage,
    },

  ]);


  const cartData = useSelector((state) => state.cartSlice.cart); // will read the status from the store
  const dispatch = useDispatch();

  const handleAddToCart = (product, action) => {
    const existingItem = cartData.find(item => item.id === product.id); // Find the item in cartData that matches the product's id
    if (existingItem) {
      if (action === 'increase') {
        dispatch(qtyIncrease({ id: product.id })); // if it gets the product then ,and if he click on the increase then dispatch the action to the slice
      } else if (action === 'decrease') {
        dispatch(qtyDecrease({ id: product.id }));  // if it gets the product then ,and if he click on the decrease then dispatch the action to the slice
      }
    } else {// it will send all this data regarding the id  to the cart page 
      dispatch(addtocart({
        id: product.id,
        productTitle: product.title,
        productPrice: product.price,
        productImage: product.image,
        description: product.description,
        category: product.category,
        quantity: 1,
      }));
    }
  };

  return (
    <div className="product-grid">
      {/* mapping of the array */}
      {products.map(product => (
        <div key={product.id} className="product-card">
          <div className="product-image-box">
            <img src={product.image} alt={product.title} className="product-image" />
          </div>
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price"> Price: {product.price}</p>
          <div className="product-buttons">
            {/* will send the action to the reducer to add the product and increase it value  */}
            <button className="product-button1" onClick={() => handleAddToCart(product, 'increase')}>
              <span className='big-icon' >+</span>
            </button>
            {/* will send the action to the reducer to remove the product and decrease it value  */}
            <button className="product-button2" onClick={() => handleAddToCart(product, 'decrease')}>
              <span className='big-icon'>-</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
