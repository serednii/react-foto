import React, {useEffect} from 'react';
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
import { fetchGetProductCard } from '../redux/cart/asyncAction';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { Pagination } from '../components/Pagination';
import { read } from 'fs';



const Home: React.FC = () => {
const dispatch = useAppDispatch();

const  {items, status} = useSelector(selectProductsData);
const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

useEffect(() => {
  dispatch(fetchGetProductCard())
},[])

  async function getProducts() {
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
    }));

    window.scrollTo(0, 0);
  }

const onChangePage = React.useCallback((page: number) => {
  dispatch(setCurrentPage(page));
}, []);

const onChangeCategory = React.useCallback((idx: number) => {
  dispatch(setCategoryId(idx));
}, []);

React.useEffect(() => {
  console.log('fetch')
  getProducts()
},[categoryId, sort.sortProperty, searchValue, currentPage])


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
          <h2>Vyskytla se chyba. 😕</h2>
          <p>Bohužel nebylo možné zboží převzít. Prosím zkuste to znovu později.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : products}</div>
      )}
      <Pagination pageCount={5} currentPage={currentPage} onChangePage={onChangePage} />

    </div>
  );
};

export default Home;
