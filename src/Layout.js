import React, { useEffect } from 'react';
import './Csss/Layout.css';
import { Link, Outlet } from "react-router-dom";
import { ImSpoonKnife } from "react-icons/im";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import $ from 'jquery'; // Import jQuery
import { useNavigate } from 'react-router-dom';
import { qtyIncrease, qtyDecrease } from './redux/CaardSlice';

const Layout = () => {
  // To get the list of the item
  const cartItems = useSelector(state => state.cartSlice.cart);
  // To display the number of items present
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const dispatch = useDispatch();
  const myhNav = useNavigate();

  // Function to show modal
  const openCartModal = () => {
    $('#cartModal').fadeIn();
  };

  // Function to hide modal
  const closeCartModal = () => {
    $('#cartModal').fadeOut();
  };

  useEffect(() => {
    // Event listener for Escape key press
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        closeCartModal();
      }
    };

    $(document).on('keydown', handleKeyPress);

    // Cleanup on component unmount
    return () => {
      $(document).off('keydown', handleKeyPress);
    };
  }, []); 

  // Increment quantity of a product in cart
  const handleQtyIncrease = (id) => {
    dispatch(qtyIncrease({ id }));
  };

  // Decrement quantity of a product in cart
  const handleQtyDecrease = (id) => {
    dispatch(qtyDecrease({ id }));
  };

  return (
    <div>
      <div className="food-nav">
        <div>
          <Link to="/"> <ImSpoonKnife />Food's Restaurant</Link>
        </div>
        <div>
          {/* Open model function on click */}
          <div className='shop-icon' onClick={openCartModal}>
            <FaCartShopping />{totalItems}
          </div>
        </div>
      </div>

      {/* Modal structure to display the details */}
      <div id="cartModal" className="cart-modal" style={{ display: 'none' }}>
        <div className="cart-modal-content">
          {/* Icon to close the modal */}
          <span className="close" onClick={closeCartModal}>&times;</span>
          <div className="cart-summary">
            <h1>Order Summary</h1>
            {/* Condition if no product available in the cart */}
            {cartItems.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              <>
                {/* Map the products */}
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-details">
                      {/* Display the product title */}
                      <div className="cart-item-name">{item.productTitle}</div>
                      {/* Display the product quantity */}
                      <div className="cart-item-quantity">{item.quantity}</div>
                    </div>
                    <div className="cart-actions">
                      {/* Increase quantity button */}
                      <button className='cart-button1' onClick={() => handleQtyIncrease(item.id)}>+</button>
                      {/* Decrease quantity button */}
                      <button className='cart-button2' onClick={() => handleQtyDecrease(item.id)}>-</button>
                    </div>
                  </div>
                ))}
                {/* Calculate and display the total price */}
                <p>Total Price: ₹{cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0).toFixed(2)}</p>
                <div className='checkout-both'>
                  {/* Save and checkout button */}
                  <button className="checkout-button1" onClick={() => myhNav("/checkout")}>SAVE AND CHECKOUT</button>
                  {/* Cancel button */}
                  <button className="cancel-button2" onClick={closeCartModal}>CANCEL</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Layout;
