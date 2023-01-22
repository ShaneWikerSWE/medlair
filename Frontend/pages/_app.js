import Layout from '../components/Layout/Layout';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import 'nprogress/nprogress.css';

NProgress.configure({ easing: 'ease', showSpinner: false });
Router.onRouteChangeStart = (url) => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          href='https://fonts.googleapis.com/css?family=Montserrat:400,700,200'
          rel='stylesheet'
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
