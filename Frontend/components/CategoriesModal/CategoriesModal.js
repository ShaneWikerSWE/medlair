import React, { useState } from 'react';
import Link from 'next/link';
import { Modal } from 'react-bootstrap';
import { IoMdArrowDropdown } from 'react-icons/io';

const CategoriesModal = (props) => {
  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <a className='nav-link' onClick={() => setLgShow(true)}>
        <IoMdArrowDropdown />
        ALL
      </a>
      <Modal
        size='lg'
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-lg'>
            Categories
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Link href={'/latest-news?category=Health Assessment And Treatment'}>
            <a onClick={() => setLgShow(false)}>
              Health Assessment And Treatment
            </a>
          </Link>
          <Link
            href={
              '/latest-news?category=Basic Processes, Theory And Methodology'
            }
          >
            <a onClick={() => setLgShow(false)}>
              Basic Processes, Theory And Methodology
            </a>
          </Link>
          <Link href={'/latest-news?category=Biopsychosocial Interactions'}>
            <a onClick={() => setLgShow(false)}>Biopsychosocial Interactions</a>
          </Link>
          <Link
            href={
              '/latest-news?category=Epidemiology of risk and protective factors'
            }
          >
            <a onClick={() => setLgShow(false)}>
              Epidemiology of risk and protective factors
            </a>
          </Link>
          <Link
            href={
              '/latest-news?category=Health promotion and disease prevention'
            }
          >
            <a onClick={() => setLgShow(false)}>
              Health promotion and disease prevention
            </a>
          </Link>
          <Link href={'/latest-news?category=Health policy and Organizations'}>
            <a onClick={() => setLgShow(false)}>
              Health policy and Organizations
            </a>
          </Link>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CategoriesModal;
