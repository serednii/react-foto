import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';

const Home: React.FC = () => {

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
        <h2>Произошла ошибка 😕</h2>
      )}
    </div>
  );
};

export default Home;
