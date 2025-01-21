// Cart.jsx
import React, { useState } from "react";
import { Modal, Button, ListGroup, Form } from "react-bootstrap";

const Cart = ({ show, handleClose, cartItems, setCartItems }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    lastname: "",
    email: "",
    address: "",
    phone: ""
  });

  const calculateTotal = () => {
    return Object.values(cartItems).reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const updateQuantity = (productId, amount) => {
    setCartItems((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId]) {
        newCart[productId].quantity = Math.max(0, newCart[productId].quantity + amount);
        if (newCart[productId].quantity === 0) delete newCart[productId];
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  const handleChange = (e) => {
    setCheckoutData({ ...checkoutData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.values(cartItems).length > 0 ? (
            <ListGroup>
              {Object.values(cartItems).map((item, index) => (
                <ListGroup.Item key={index}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{item.title}</strong>
                      <p>Quantity: {item.quantity}</p>
                      <div className="d-flex align-items-center">
                        <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity === 1}>
                          -
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item.id, 1)}>
                          +
                        </Button>
                      </div>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="w-100 d-flex justify-content-between">
            <p className="m-0"><strong>Total:</strong> ${calculateTotal().toFixed(2)}</p>
            <div>
              <Button variant="danger" onClick={clearCart} className="me-2">Empty Cart</Button>
              <Button variant="success" onClick={() => setShowCheckout(true)}>Checkout</Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Checkout Modal */}
      <Modal show={showCheckout} onHide={() => setShowCheckout(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={checkoutData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Lastname</Form.Label>
              <Form.Control type="text" name="lastname" value={checkoutData.lastname} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={checkoutData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" value={checkoutData.address} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={checkoutData.phone} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Proceed to Pay</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
