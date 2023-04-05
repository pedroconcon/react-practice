import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';


let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const showCard = useSelector(state => state.ui.cartIsVisable);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);


  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {
    if(isInitial){
      isInitial = false
      return;
    }

    if(cart.changed){
      dispatch(sendCartData(cart));
    }
     
  }, [cart, dispatch])

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCard && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
