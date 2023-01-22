import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Row, Col } from 'react-bootstrap';
import styles from './SideArticle.module.css';

const SideArticle = (props) => {
  return (
    <div className={styles.sm_article}>
      <Row>
        <Col xs={8}>
          <h6>
            <Link href={`/viewarticle/${props.article.id}`}>
              {props.article.title}
            </Link>
          </h6>
          <span>{props.article.editor} | </span>
          <span>
            {' '}
            {new Date(props.article.createdAt).toLocaleDateString('en-us')}
          </span>
        </Col>
        <Col xs={4}>
          <Image
            src={`http://localhost:8080/${props.article.coverUrl}`}
            width={80}
            height={45}
            // layout='responsive'
            alt='article photo'
          />
        </Col>
      </Row>
    </div>
  );
};

export default SideArticle;
