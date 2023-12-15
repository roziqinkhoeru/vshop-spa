import React from 'react';
import { BookHeartIcon, ShoppingCartIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectTotalItemCart } from '../features/cart/cartSlice';
import { selectTotalWishlistItems } from '../features/wishlist/wishlistSlice';

function Header({ onOpenCart, onOpenWishlist }) {
  const totalCartItem = useSelector(selectTotalItemCart);
  const totalWishlistItem = useSelector(selectTotalWishlistItems);

  const handleToggleWishlist = () => {
    onOpenWishlist();
  };

  return (
    <header className="bg-gray-800 fixed top-0 w-full z-50">
      <div className="container max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-[4.5rem]">
          <a
            href="/"
            className="flex items-center text-gray-100 hover:scale-105 transition-all duration-100 ease-in-out"
          >
            <figure className="block mr-2">
              <img
                src="https://vitejs.dev/logo.svg"
                alt="Vite Logo"
                className="h-7 mobile:h-8"
              />
            </figure>
            <span className="text-gray-100 font-bold text-xl hidden mobile:block">
              VShop
            </span>
          </a>
          <h5 className="font-bold text-lg text-gray-100 mobile:hidden">
            VShop
          </h5>
          <div className="flex items-center space-x-4.5 mobile:space-x-6">
            <button
              className="relative"
              type="button"
              title="wishlist"
              onClick={handleToggleWishlist}
            >
              <BookHeartIcon
                strokeWidth={2.5}
                className="w-5 stroke-gray-100"
              />
              {totalWishlistItem > 0 ? (
                <div className="bg-red-500 rounded-full w-4 h-4 flex items-center justify-center absolute -top-1.5 -right-2 border-[3px] border-gray-800" />
              ) : (
                ''
              )}
            </button>
            <button
              className="relative"
              type="button"
              title="Cart"
              onClick={onOpenCart}
            >
              <ShoppingCartIcon
                strokeWidth={2.5}
                className="w-5 stroke-gray-100"
              />
              {totalCartItem > 0 ? (
                <div className="bg-red-500 rounded-full w-5.5 h-5.5 flex items-center justify-center absolute -top-2.5 -right-2.5 border-[3px] border-gray-800">
                  <span className="text-white text-2xs font-medium">
                    {totalCartItem}
                  </span>
                  {' '}
                </div>
              ) : (
                ''
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  onOpenCart: PropTypes.func.isRequired,
  onOpenWishlist: PropTypes.func.isRequired,
};

export default Header;
