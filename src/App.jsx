import React, { useState } from 'react';
import Header from './components/Header';
import Checkout from './components/Checkout';
import ProductList from './features/producList/ProductList';
import CartModal from './features/cart/CartModal';
import Filter from './components/Filter';
import WishlistModal from './features/wishlist/WishlistModal';

function App() {
  const [isOpenModalCart, setIsOpenModalCart] = useState(false);
  const [isOpenModalProduct, setIsOpenModalProduct] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isOpenModalFilter, setIsOpenModalFilter] = useState(false);
  const [isOpenModalWishlist, setIsOpenModalWishlist] = useState(false);
  const [dateTimeCheckout, setDateTimeCheckout] = useState(null);

  const handleOpenModalCart = () => {
    setIsOpenModalCart(true);
  };
  const handleCloseModalCart = () => {
    setIsOpenModalCart(false);
  };
  const handleOpenModalProduct = () => {
    setIsOpenModalProduct(true);
  };
  const handleCloseModalProduct = () => {
    setIsOpenModalProduct(false);
  };
  const handleOpenModalFilter = () => {
    setIsOpenModalFilter(true);
  };
  const handleCloseModalFilter = () => {
    setIsOpenModalFilter(false);
  };
  const handleOpenCheckout = () => {
    setIsCheckout(true);
    setDateTimeCheckout(new Date());
  };
  const handleCloseCheckout = () => {
    setIsCheckout(false);
  };
  const handleOpenModalWishlist = () => {
    setIsOpenModalWishlist(true);
  };
  const handleCloseModalWishlist = () => {
    setIsOpenModalWishlist(false);
  };

  const bodyApp = document.querySelector('body');
  if (
    isOpenModalCart
    || isOpenModalProduct
    || isCheckout
    || isOpenModalFilter
    || isOpenModalWishlist
  ) {
    bodyApp.classList.add('overflow-hidden');
  } else {
    bodyApp.classList.remove('overflow-hidden');
  }

  return (
    <div
      className={
        isOpenModalCart
        || isOpenModalProduct
        || isCheckout
        || isOpenModalFilter
        || isOpenModalWishlist
          ? 'overflow-hidden'
          : ''
      }
    >
      <Header
        onOpenCart={handleOpenModalCart}
        onOpenWishlist={handleOpenModalWishlist}
      />
      <main className="mt-24 container max-w-7xl mx-auto px-5 sm:px-6 min-h-[calc(100vh-189px)]">
        <h1 className="text-center font-bold text-2xl mb-10 pt-6 hidden mobile:block">
          Shop Now
        </h1>
        <ProductList
          onOpen={handleOpenModalProduct}
          onClose={handleCloseModalProduct}
          onOpenFilter={handleOpenModalFilter}
        />
      </main>
      <footer className="mt-10 bg-gray-900">
        <div className="container max-w-7xl mx-auto px-5 sm:px-6 py-4">
          <p className="text-center text-slate-200 text-sm">
            Made with
            {' '}
            <span
              role="img"
              aria-label="love"
            >
              ❤️
            </span>
            {' '}
            by
            {' '}
            <a
              href="https://github.com/roziqinkhoeru"
              className="text-lime-500 hover:text-lime-600 transition duration-100 ease-in-out"
              target="_blank"
              rel="noopener noreferrer"
              title="Khoeru Roziqin"
            >
              Khoeru Roziqin
            </a>
          </p>
        </div>
      </footer>
      {isOpenModalCart ? (
        <CartModal
          onClose={handleCloseModalCart}
          onCheckout={handleOpenCheckout}
        />
      ) : null}
      {isCheckout ? (
        <Checkout
          closeCheckout={handleCloseCheckout}
          datetime={dateTimeCheckout}
        />
      ) : null}
      {isOpenModalFilter ? <Filter onClose={handleCloseModalFilter} /> : null}
      {isOpenModalWishlist ? (
        <WishlistModal
          onClose={handleCloseModalWishlist}
          onOpenCart={handleOpenModalCart}
        />
      ) : null}
    </div>
  );
}

export default App;
