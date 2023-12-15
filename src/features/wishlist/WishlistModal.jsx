import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ChevronLeftIcon, XIcon } from 'lucide-react';
import { addItemToCart } from '../cart/cartSlice';
import {
  removeItemFromWishlist,
  selectTotalWishlistItems,
  selectWishlistItems,
} from './wishlistSlice';
import Modal from '../../components/Modal';
import wishlistImg from '../../assets/img/package.png';

function WishlistModal({ onClose, onOpenCart }) {
  const dispatch = useDispatch();
  const totalWIshlist = useSelector(selectTotalWishlistItems);
  const wishlistItem = useSelector(selectWishlistItems);

  const handleRemoveWishlist = (product) => {
    dispatch(removeItemFromWishlist(product));
  };

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
    onClose();
    onOpenCart();
  };

  return (
    <Modal onClose={onClose}>
      <div className="w-full relative">
        <div className="px-5 overflow-y-auto h-[65vh] md:h-[54vh]">
          <div className="h-full">
            <div className="absolute -top-[2.375rem] left-0 w-full">
              <h5 className="text-center font-bold">Wishlist</h5>
            </div>
            <div className="absolute -top-10 left-3 z-[101]">
              <button
                type="button"
                aria-label="Close Wishlist"
                className="w-7 h-7 bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-200 transition duration-100 ease-in-out"
                onClick={onClose}
              >
                <ChevronLeftIcon size={20} />
              </button>
            </div>
            {totalWIshlist === 0 ? (
              <div className="flex w-full h-full items-center justify-center flex-col pb-5">
                <img
                  src={wishlistImg}
                  alt="Wishlist Blue Box Empty"
                  className="w-28 block"
                />
                <p className="mt-3 text-center text-sm font-semibold">
                  Your wishlist is empty
                </p>
                <p className="text-center text-sm text-gray-400">
                  Tap the heart on any item to start saving your favorites ✨.
                </p>
                <button
                  type="button"
                  aria-label="Continue Shopping"
                  className="mt-3 block bg-lime-600 text-gray-100 font-bold px-4 py-1.5 rounded-lg text-center leading-normal text-sm hover:bg-lime-500 transition duration-100 ease-in-out"
                  onClick={onClose}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {wishlistItem?.map((product) => (
                  <div
                    className="border-b border-dashed border-gray-200 py-4 flex items-center space-x-3"
                    key={product?.id}
                  >
                    <div className="">
                      <figure className="overflow-hidden w-14 h-20 px-2">
                        <img
                          src={product?.image}
                          alt={product?.title}
                          className="w-full h-full object-contain object-center"
                        />
                      </figure>
                    </div>
                    <div className="w-full">
                      <h6 className="relative font-bold text-sm text-gray-800 pr-8 line-clamp-2 hover:line-clamp-none mb-px">
                        {product?.title}
                        <span
                          className="absolute top-0 right-0 cursor-pointer"
                          role="presentation"
                          onClick={() => handleRemoveWishlist(product)}
                        >
                          <XIcon
                            size={20}
                            className="stroke-gray-400 hover:stroke-red-500"
                          />
                        </span>
                      </h6>
                      <p className="text-xs text-gray-400 mb-1 capitalize">
                        {product?.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <h6 className="font-semibold">
                          $
                          {product?.price.toFixed(2)}
                          {' '}
                          USD
                        </h6>
                        <button
                          type="button"
                          aria-label="Add to Cart"
                          className="bg-gray-800 text-gray-100 font-bold px-4 py-1.5 rounded-lg text-center leading-normal text-sm hover:bg-lime-600 transition duration-100 ease-in-out"
                          onClick={() => handleAddToCart(product)}
                          title="Add to Cart"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

WishlistModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onOpenCart: PropTypes.func.isRequired,
};

export default WishlistModal;
