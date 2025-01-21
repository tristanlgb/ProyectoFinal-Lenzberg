// ItemDetailContainer.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "pokemons", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <Container className="mt-5">
      {product ? (
        <Card>
          <Card.Img variant="top" src={product.image} alt={product.title} />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>Price: ${product.price}</Card.Text>
            <Card.Text>Category: {product.category}</Card.Text>
            <Card.Text>Stock: {product.stock}</Card.Text>
            
            {/* Return to Home Button */}
            <Button variant="secondary" onClick={() => navigate("/")}>Return to Home</Button>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default ItemDetailContainer;
