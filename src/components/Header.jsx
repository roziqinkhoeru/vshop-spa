import { ShoppingCartIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectTotalItemCart } from '../features/cart/cartSlice';
import PropTypes from 'prop-types';

function Header({ onOpen }) {
  const totalCartItem = useSelector(selectTotalItemCart);

  return (
    <header className="bg-gray-800 fixed top-0 w-full z-50">
      <div className="container max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-[4.5rem]">
          <a
            href="/"
            className="flex items-center text-gray-100 hover:scale-105 transition-all duration-100 ease-in-out">
            <figure className="block mr-2">
              <img
                src="https://vitejs.dev/logo.svg"
                alt="Workflow"
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
          <button
            className="relative"
            type="button"
            title="Cart"
            onClick={onOpen}>
            <ShoppingCartIcon
              strokeWidth={2.5}
              className="w-5 stroke-gray-100"
            />
            {totalCartItem > 0 ? (
              <div className="bg-red-500 rounded-full w-4.5 h-4.5 flex items-center justify-center absolute -top-2.5 -right-2.5">
                <span className="text-white text-2xs font-medium">
                  {totalCartItem}
                </span>{' '}
              </div>
            ) : (
              ''
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  onOpen: PropTypes.func.isRequired,
};

export default Header;
