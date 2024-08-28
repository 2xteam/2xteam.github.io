import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LayOut from './components/Layout/Layout';
import PrivateRotuer from './components/router/PrivateRouter';
import CartPage from './pages/Cart/index';
import HomePage from './pages/Home/index';
import LoginPage from './pages/Login/index';
import MyPage from './pages/MyPage/index';
import NotFoundPage from './pages/NotFound/index';
import OrderPage from './pages/Order';
import ProductPage from './pages/Product/index';
import SignUpPage from './pages/SignUp/index';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const accessToken = useSelector((state) => state.user.token);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<LayOut />}>
              <Route index element={<HomePage />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/mypage" element={<MyPage />} />
            </Route>
            <Route
              path="/login"
              element={
                <PrivateRotuer authenticated={accessToken}>
                  <LoginPage />
                </PrivateRotuer>
              }
            />
            <Route
              path="/signup"
              element={
                <PrivateRotuer authenticated={accessToken}>
                  <SignUpPage />
                </PrivateRotuer>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
