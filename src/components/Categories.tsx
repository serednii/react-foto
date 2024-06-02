import React from 'react';



const categories = ['Все', 'Instantní', 'Bezzrcadlovky', 'Zrcadlovky', 'Kompaktní', 'Objektivy'];

export const Categories: React.FC = React.memo(() => {
  return (
    <div className="categories">
      <ul>
      {categories.map((categoryName, i) => (
          <li key={i}  className={!true  ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});
