import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './Footer.module.css';
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillLinkedin,
  AiFillGooglePlusSquare,
} from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className={styles.ml_footer}>
      <Container>
        <h2>
          <span>Med</span>lair
        </h2>
        <Row>
          <Col lg={3}>
            <div className={styles.footer_social}>
              <h6>Find us on</h6>
              {/* <a href='#'>
                <AiFillFacebook />
              </a>
              <a href='#'>
                <AiFillTwitterSquare />
              </a> */}
              <a href='#'>
                <AiFillLinkedin />
              </a>
              {/* <a href='#'>
                <AiFillGooglePlusSquare />
              </a> */}
            </div>
          </Col>
          <Col lg={9}>
            <div className={styles.footer_sections}>
              <Row>
                <Col lg={3}>
                  <div className={styles.footer_about}>
                    <h6>About</h6>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className={styles.footer_membership}>
                    <h6>Membership</h6>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className={styles.footer_membership}>
                    <h6>Lorem ipsum</h6>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className={styles.footer_membership}>
                    <h6>Lorem ipsum</h6>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                    <a href='#'>Lorem Ipsum</a>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
