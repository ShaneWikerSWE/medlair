import React from 'react';
import Link from 'next/link';
import styles from './FlatArticle.module.css';

const FlatArticle = (props) => {
  return (
    <div className={styles.trending_article}>
      <div className={styles.index}>{props.index + 1}</div>
      <div className={styles.title}>
        <Link href={`/viewarticle/${props.article.id}`}>
          <a>{props.article.title}</a>
        </Link>
      </div>
    </div>
  );
};

export default FlatArticle;
