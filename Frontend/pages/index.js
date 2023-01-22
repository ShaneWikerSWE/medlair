import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';
import { IoIosArrowForward } from 'react-icons/io';
import Loader from '../components/Loader/Loader';
import SideArticle from '../components/SideArticle/SideArticle';
import FlatArticle from '../components/FlatArticle/FlatArticle';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const [articles, setArticles] = useState([]);
  const [trending, setTrending] = useState([]);
  const [bmiResult, setBmiResult] = useState(null);
  const [newsLetterStatus, setNewsLetterStatus] = useState(null);

  const bmiHeight = useRef();
  const bmiWeight = useRef();

  const bmiSubmitHandler = (e) => {
    e.preventDefault();
    let m, h2, bmi, f_bmi, diff;
    m = +bmiHeight.current.value / 100;
    h2 = m * m;
    bmi = +bmiWeight.current.value / h2;
    f_bmi = Math.floor(bmi);
    diff = bmi - f_bmi;
    diff = diff * 10;

    diff = Math.round(diff);
    if (diff == 10) {
      // Need to bump up the whole thing instead
      f_bmi += 1;
      diff = 0;
    }
    bmi = f_bmi + '.' + diff;
    setBmiResult(bmi);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const connect = await fetch('http://localhost:8080/article?category=all');
      const result = await connect.json();

      if (!connect.ok) {
        throw new Error('Something went wrong.');
      }

      setArticles(result.articles);
      setTrending(result.trending);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setHttpError(true);
    }
  };

  const sendNewsLetterEmail = async (email) => {
    try {
      setNewsLetterStatus('Loading...');

      const connect = await fetch('http://localhost:8080/newsletter/addemail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await connect.json();

      if (!connect.ok) {
        throw new Error(result.msg || 'Something Wend Wrong!');
      }

      setNewsLetterStatus('Subscribed Successfully. Thank You!');
    } catch (err) {
      setNewsLetterStatus(err.message);
    }
  };

  const newsLetterSubmitHandler = (e) => {
    e.preventDefault();
    sendNewsLetterEmail(e.target[0].value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Medlair</title>
        <meta
          name='description'
          content='Medlair your favourite medical website.'
        />
      </Head>

      <main>
        {isLoading && <Loader />}
        {httpError && <h2>Something Went Wrong</h2>}
        {!isLoading && !httpError && (
          <>
            {/* Start Announce Section */}
            <section className={styles.ml_anon}>
              <div className={styles.ml_anon_graphic}>
                <Container>
                  <Row>
                    <Col lg={6}>
                      <h2 className={styles.anon_heading}>
                        <span>Med</span>lair <span>News &#38; Perspective</span>
                      </h2>
                      <h2>
                        Your one-stop resource for medical news, clinical
                        reference, and education.
                      </h2>
                      <form
                        onSubmit={newsLetterSubmitHandler}
                        className={styles.anon_newsletter}
                      >
                        <input
                          className='form-control'
                          type='email'
                          required
                          placeholder='Subscribe to our newsletter'
                        />
                        <button type='submit' className='btn btn-dark'>
                          Subscribe
                        </button>
                        {newsLetterStatus && <p>{newsLetterStatus}</p>}
                      </form>
                    </Col>
                  </Row>
                </Container>
              </div>
            </section>
            {/* End Announce Section */}

            {/* Start Featured Section */}
            <section className={styles.ml_featured_news}>
              <Container>
                <h5>Featured News &#38; Perspectives</h5>
                <Row>
                  <Col lg={8}>
                    <div className={styles.featured_article}>
                      {articles.map((prop, key) => {
                        if (key === 0) {
                          return (
                            <Row key={key}>
                              <Col lg={6}>
                                <Image
                                  src={`http://localhost:8080/${prop.coverUrl}`}
                                  alt='article photo'
                                  width={360}
                                  height={205}
                                />
                              </Col>
                              <Col lg={6}>
                                <h5>
                                  <Link href={`/viewarticle/${prop.id}`}>
                                    {prop.title}
                                  </Link>
                                </h5>
                                <span>{prop.editor} | </span>
                                <span>
                                  {new Date(prop.createdAt).toLocaleDateString(
                                    'en-us'
                                  )}
                                </span>
                                <p>{prop.description}</p>
                              </Col>
                            </Row>
                          );
                        }
                      })}
                    </div>
                  </Col>
                  <Col lg={4}>
                    {articles.map((prop, key) => {
                      if (key !== 0 && key <= 2) {
                        return <SideArticle key={key} article={prop} />;
                      }
                    })}
                  </Col>
                </Row>
              </Container>
            </section>
            {/* End Featured Section */}

            {/* Start Last News Section */}
            <section className={styles.ml_latest_news}>
              <Container>
                <h5>
                  Latest News{' '}
                  <Link href='/latest-news'>
                    <a>
                      {' '}
                      View All
                      <IoIosArrowForward />
                    </a>
                  </Link>
                </h5>
                <Row>
                  <Col lg={4}>
                    {articles.map((prop, key) => {
                      if (key > 2 && key <= 5) {
                        return <SideArticle key={key} article={prop} />;
                      }
                    })}
                  </Col>
                  <Col lg={{ span: 4, offset: 4 }}>
                    {articles.map((prop, key) => {
                      if (key > 5 && key <= 8) {
                        return <SideArticle key={key} article={prop} />;
                      }
                    })}
                  </Col>
                </Row>
              </Container>
            </section>
            {/* End Last News Section */}

            {/* Start Trending Section */}
            <section className={styles.ml_trending}>
              <Container>
                <h5>
                  Trending
                  <span> On Medlair</span>
                </h5>
                <Row>
                  {trending.map((prop, key) => {
                    return (
                      <Col lg={3} key={key}>
                        <FlatArticle article={prop} index={key} />
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            </section>
            {/* End Trending Section */}

            {/* Start BMI Section */}
            <section className={styles.ml_bmi}>
              <Container>
                <h5>Calculate Your BMI</h5>
                <Row>
                  <Col md={4}>
                    <form onSubmit={bmiSubmitHandler}>
                      <label>Your Height (CM):</label>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='Your Height'
                        ref={bmiHeight}
                      />
                      <label>Your Weight (KG):</label>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='Your Weight'
                        ref={bmiWeight}
                      />
                      {bmiResult && (
                        <p>
                          <b>Your BMI: {bmiResult}</b>
                        </p>
                      )}
                      <button type='submit' className='btn btn-dark'>
                        Calculate
                      </button>
                    </form>
                  </Col>
                  <Col md={{ span: 4, offset: 4 }}>
                    <b>BMI Categories:</b>
                    <p>
                      {`Underweight =< 18.5`} <br />
                      {`Normal weight = 18.5–24.9`} <br />
                      {`Overweight = 25–29.9`} <br />
                      {`Obesity = BMI of 30 or greater`}
                    </p>
                  </Col>
                </Row>
              </Container>
            </section>
            {/* End BMI Section */}

            {/* Start Founder Section */}
            <section className={styles.ml_founder}>
              <Container>
                <div className={styles.founder_image}>
                  <img src='/images/founderphoto.jpg' alt='founder' />
                </div>

                <div className={styles.founder_data}>
                  <h5>Ismail W. Elfeky</h5>
                  <span>Medlair Founder &#38; Editor-In-Chief</span>
                </div>
                <div className={styles.founde_word}>
                  <p>
                    Director, Scripps Translational Science Institute; Executive
                    Vice President and Professor of Molecular Medicine, The
                    Scripps Research Institute; Senior Consultant, Division of
                    Cardiovascular Diseases, Scripps Clinic, La Jolla,
                    California; Editor-in-Chief, Medscape
                  </p>
                </div>
              </Container>
            </section>
            {/* End Founder Section */}
          </>
        )}
      </main>
    </>
  );
}
