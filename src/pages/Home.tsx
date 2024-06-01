import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { useSelector } from 'react-redux';
import { selectProductsData } from '../redux/products/selector';

const Home: React.FC = () => {
const  {items, status} = useSelector(selectProductsData);

  return (
    <div className="container">
      <div className="content__top">
        <Categories  />
        <Sort  />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {true ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
    </div>
  );
};

export default Home;
