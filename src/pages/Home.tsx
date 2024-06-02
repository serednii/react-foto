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
import { selectFilter } from '..//redux/filter/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
const Home: React.FC = () => {
const dispatch = useAppDispatch();

const  {items, status} = useSelector(selectProductsData);
const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);


console.log(items)
console.log(status)


const getProducts = async () =>{
const sortBy = sort.sortProperty.replace('_', '');
const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
const category = categoryId > 0 ? String(categoryId) : '';
const search = searchValue;

dispatch(fetchProducts({
  sortBy,
  order,
  category,
  search,
  currentPage: String(currentPage),
}))
}

const onChangeCategory = React.useCallback((idx: number) => {
  dispatch(setCategoryId(idx));
}, []);

React.useEffect(() => {
  console.log('fetch')
  getProducts()
},[categoryId, sort.sortProperty, searchValue, currentPage])

// const products  = items.map((obj) => <ProductBlock key={obj.id} {...obj} />)
const products = React.useMemo(() => {
  return items.map((obj) => <ProductBlock key={obj.id} {...obj} />);
}, [items]);

const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort}/>
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
