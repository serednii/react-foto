import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS_URL } from '../constants/urls';

const FullProduct: React.FC = () => {
  const [product, setProduct] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();
console.log(id)
console.log(navigate)
  React.useEffect(() => {
    async function fetchProduct() {
      try {
        console.log(PRODUCTS_URL + id)
        const { data } = await axios.get(PRODUCTS_URL + id);
        setProduct(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }

    fetchProduct();
  }, []);

  if (!product) {
    return <>Načítání...</>;
  }

  return (
    <div className="container">
      <img src={product.imageUrl} />
      <h2>{product.title}</h2>
      <h4>{product.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Zadní</span>
        </button>
      </Link>
    </div>
  );
};

export default FullProduct;
