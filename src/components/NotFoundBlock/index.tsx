import React from 'react';

import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Nic nalezeno
      </h1>
      <p className={styles.description}>
      Tato stránka bohužel není dostupná v našem internetovém obchodě.
      </p>
    </div>
  );
};
