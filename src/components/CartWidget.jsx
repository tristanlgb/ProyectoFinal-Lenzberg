import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Badge } from "react-bootstrap";

const CartWidget = ({ cartItemCount, handleShowCart }) => {
  return (
    <Link to="#" onClick={handleShowCart} className="text-dark">
      <FaShoppingCart size={24} />
      {cartItemCount > 0 && (
        <Badge bg="danger" className="ms-1">
          {cartItemCount}
        </Badge>
      )}
    </Link>
  );
};

export default CartWidget;
