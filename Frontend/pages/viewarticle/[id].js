import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import Loader from '../../components/Loader/Loader';
import ReactHtmlParser from 'react-html-parser';
import styles from '../../styles/ViewArticle.module.css';

const Article = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const [article, setArticle] = useState({});

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const connect = await fetch(`http://localhost:8080/article/get?id=${id}`);
      const result = await connect.json();

      console.log(result);

      if (!connect.ok) {
        throw new Error('Something went wrong.');
      }

      setArticle(result.article);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setHttpError(true);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchData();
  }, [router]);

  return (
    <>
      <Head>
        <title>{article.title || 'None'} - Medscape</title>
        <meta
          name='description'
          content='Medlair your favourite medical website.'
        />
      </Head>
      <main className={styles.article}>
        {isLoading && <Loader />}
        {httpError && <h2>Something Went Wrong</h2>}
        {!isLoading && !httpError && (
          <Container>
            <Row>
              <Col lg={9}>
                <div className={styles.article_details}>
                  <h2>{article.title}</h2>
                  <span>
                    {article.editor} |{' '}
                    {new Date(article.createdAt).toLocaleDateString('en-us', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className={styles.article_content}>
                  {ReactHtmlParser(article.content)}
                </div>
              </Col>
              <Col lg={3}>
                <div className={styles.article_recommendations}></div>
              </Col>
            </Row>
          </Container>
        )}
      </main>
    </>
  );
};

export default Article;
