// ItemListContainer.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

const ItemListContainer = ({ addToCart }) => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let q = collection(db, "pokemons");
        if (category) {
          q = query(q, where("category", "==", category));
        }

        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  const updateQuantity = (productId, amount) => {
    setCartItems((prevCart) => {
      const newCart = { ...prevCart };
      if (!newCart[productId]) {
        const product = products.find((p) => p.id === productId);
        if (product) newCart[productId] = { ...product, quantity: 0 };
      }
      if (newCart[productId]) {
        newCart[productId].quantity = Math.max(0, newCart[productId].quantity + amount);
        if (newCart[productId].quantity === 0) delete newCart[productId];
      }
      return newCart;
    });
  };

  const handleAddToCart = (productId) => {
    if (cartItems[productId] && cartItems[productId].quantity > 0) {
      addToCart(cartItems[productId]);
      setCartItems((prevCart) => ({ ...prevCart, [productId]: { ...prevCart[productId], quantity: 0 } }));
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        {products.map((product) => (
          <Col md={4} key={product.id}>
            <Card className="mb-4">
              <Card.Img variant="top" src={product.image} alt={product.title} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
                <div className="d-flex align-items-center mb-2">
                  <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(product.id, -1)} disabled={!cartItems[product.id] || cartItems[product.id].quantity === 0}>
                    -
                  </Button>
                  <span className="mx-2">{cartItems[product.id]?.quantity || 0}</span>
                  <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(product.id, 1)}>
                    +
                  </Button>
                </div>
                <Button variant="success" onClick={() => handleAddToCart(product.id)} disabled={!cartItems[product.id] || cartItems[product.id].quantity === 0}>
                  Add to Cart
                </Button>
                <Button variant="primary" as={Link} to={`/product/${product.id}`} className="ms-2">
                  More Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemListContainer;
