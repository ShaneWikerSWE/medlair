import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import Article from '../../components/Article/Article';
import Loader from '../../components/Loader/Loader';
import styles from '../../styles/LatestNews.module.css';

const LatestNews = () => {
  const router = useRouter();
  const { category } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const [articles, setArticles] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const connect = await fetch(
        `http://localhost:8080/article?category=${category || 'all'}`
      );
      const result = await connect.json();

      console.log(result);

      if (!connect.ok) {
        throw new Error('Something went wrong.');
      }

      setArticles(result.articles);
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
        <title>{category || 'Latest News'} - Medlair</title>
        <meta name='description' content='Latest News medlair.' />
      </Head>
      <main className={styles.latest_news}>
        {isLoading && <Loader />}
        {httpError && <h2>Something Went Wrong</h2>}
        {!isLoading && !httpError && (
          <Container>
            <h2>{category || 'Latest News'}</h2>
            {articles.map((prop, key) => {
              return <Article key={key} article={prop} />;
            })}
            {articles.length === 0 && <h3>No Articles Found.</h3>}
          </Container>
        )}
      </main>
    </>
  );
};

export default LatestNews;
