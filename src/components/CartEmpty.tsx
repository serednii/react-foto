import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

export const CartEmpty: React.FC = () => (
  <div className="cart cart--empty">
    <h2>
    Košík je prázdný <span>😕</span>
    </h2>
    <p>
    S největší pravděpodobností jste si produkt ještě neobjednali.
      <br />
      Chcete-li si objednat pizzu, přejděte na hlavní stránku.
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Vrať se</span>
    </Link>
  </div>
);
