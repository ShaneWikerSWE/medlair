import React from 'react';
import { Bars } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div data-tip='Ball Triangle' data-for='happyFace'>
        <Bars color='#005f7d' width='100' height='110' />
      </div>
    </div>
  );
};

export default Loader;
