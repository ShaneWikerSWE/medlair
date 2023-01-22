import React from 'react';
import Link from 'next/link';
import styles from './Article.module.css';

const Article = (props) => {
  return (
    <div className={styles.ml_article}>
      <h5>
        <Link href={`/viewarticle/${props.article.id}`}>
          {props.article.title}
        </Link>
      </h5>
      <p>{props.article.description}</p>
      <span>
        {props.article.category},{' '}
        {new Date(props.article.createdAt).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </span>
    </div>
  );
};

export default Article;
