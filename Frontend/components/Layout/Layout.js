import Footer from '../Footer/Footer';
import MainNav from '../MainNav/MainNav';

const Layout = (props) => {
  return (
    <>
      <MainNav />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
