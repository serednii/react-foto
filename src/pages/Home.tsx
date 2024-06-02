import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { useSelector } from 'react-redux';
import { selectProductsData } from '../redux/products/selector';
import { ProductBlock } from '../components/ProductBlock';
import { Skeleton } from '../components/ProductBlock/Skeleton'; 
import { useAppDispatch } from '../redux/store';
import { fetchProducts } from '../redux/products/asyncAction';

const Home: React.FC = () => {
const  {items, status} = useSelector(selectProductsData);
const dispatch = useAppDispatch()
console.log(items)
console.log(status)
const getProducts = async () =>{
  console.log('useEffect')

dispatch(fetchProducts())
}

React.useEffect(() => {
  console.log('useEffect')
  getProducts()
},[])

const products  = items.map((obj) => <ProductBlock key={obj.id} {...obj} />)
const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

  return (
    <div className="container">
      <div className="content__top">
        <Categories  />
        <Sort  />
      </div>
      <h2 className="content__title">Všechny kamery</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : products}</div>
      )}
    </div>
  );
};

export default Home;
