
import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home'
import Footer from "./components/footer/Footer";
import ProductsByNavbarChoise from './pages/products/ProductsByNavbarChosie';
import ProductsByNavbarChosieAndCategory from "./pages/products/ProductsByNavbarChosieAndCategory";
import Favorites from "./pages/favorites/Favorites";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from './pages/cart/Cart'
import Join from './components/join/Join'
import Sign from "./pages/sign/Sign";
import Dashboard from './pages/dashboard/Dashboard'
import UsersTable from './pages/tables/UsersTable'
import VerifyEmail from './pages/verifyEmail/VerifyEmail'

import { ToastContainer } from 'react-toastify'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ProductsTable from "./pages/tables/ProductsTable";
import CategoriesTable from "./pages/tables/CategoriesTable";
import CreateProduct from "./pages/createProduct/CreateProduct";
import ProductsByBrands from "./pages/products/ProductsByBrands";
import ProductsByBrandAndCategory from "./pages/products/ProductsByBrandAndCategory";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/forgotPassword/ResetPassword";
import MyAccount from "./pages/myAccount/MyAccount";
import BrandsTable from "./pages/tables/BrandsTable";

function App() {

  const { user } = useSelector(state => state.auth)

  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:navbarChoise" element={< ProductsByNavbarChoise />} />
        <Route path="/products/:navbarChoise/:category" element={< ProductsByNavbarChosieAndCategory />} />
        <Route path="/products/brands/:brand" element={< ProductsByBrands />} />
        <Route path="/products/brands/:brand/:category" element={< ProductsByBrandAndCategory />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/passport" element={!user ? <Sign /> : <Navigate to='/' />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/users" element={<UsersTable />} />
        <Route path="/dashboard/products" element={<ProductsTable />} />
        <Route path="/dashboard/categories" element={<CategoriesTable />} />
        <Route path="/dashboard/brands" element={<BrandsTable />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/users/:userId/verify/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
        <Route path="/my-account/:id" element={<MyAccount />} />
      </Routes>
      {!user?.isAdmin && <Join />}
      {!user?.isAdmin && <Footer />}

    </BrowserRouter>
  );
}

export default App;
