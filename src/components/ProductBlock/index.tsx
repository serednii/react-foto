import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItemById } from '../../redux/cart/selectors';
import { CartItem } from '../../redux/cart/types';
import { AnyAction } from 'redux';
import { fetchAddProductCard, fetchUpdateProductCard } from '../../redux/cart/asyncAction';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../redux/store';

const typeNames = ['тонкое', 'традиционное'];

type ProductBlockProps = {
  id: string;
  currentId: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export const ProductBlock: React.FC<ProductBlockProps> = ({
  id,
  currentId,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const cartItem = useSelector(selectCartItemById(currentId));
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const addedCount = cartItem ? cartItem.count : 0;
  const addedId = cartItem ? cartItem.id : undefined;
  const onClickAdd = () => {

    const item: CartItem = {
      currentId,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 1,
    };
    if(addedCount === 0 ){
      dispatch(fetchAddProductCard(item));
    }else{
      dispatch(fetchUpdateProductCard({...item, id: addedId, count: addedCount + 1}));
    }
  };

  return (
    <div className="product-block-wrapper">
      <div className="product-block">
        <Link key={id} to={`/product/${id}`}>
          <img className="product-block__image" src={imageUrl} alt="Sony ZV-1" />
          <h4 className="product-block__title">{title}</h4>
        </Link>
        <div className="product-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? 'active' : ''}>
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={size}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? 'active' : ''}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="product-block__bottom">
          <div className="product-block__price">от {price} ₽</div>
          <button onClick={onClickAdd}  className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Přidat</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
