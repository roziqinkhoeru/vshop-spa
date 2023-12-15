import React from 'react';
import {
  ChevronLeftIcon,
  MinusIcon,
  PlusIcon,
  TicketIcon,
  XIcon,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../components/Modal';
import {
  addItemToCart,
  minusItemFromCart,
  removeItemFromCart,
  selectCartItems,
  selectTotalItemCart,
  selectTotalPoint,
  selectTotalPrice,
} from './cartSlice';
import cartImg from '../../assets/img/cart-empty.png';

function CartModal({ onClose, onCheckout }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const totalPoint = useSelector(selectTotalPoint);
  const totalItem = useSelector(selectTotalItemCart);

  const handleAddItemCart = (product) => {
    const selectedProduct = { ...product, quantity: 1 };
    dispatch(addItemToCart(selectedProduct));
  };

  const handleMinusItemCart = (product) => {
    dispatch(minusItemFromCart(product));
  };

  const handleRemoveItemCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleCheckout = () => {
    if (selectTotalItemCart === 0) return;
    const phone = '6282314950438';
    const message = encodeURIComponent(
      `Halo Admin,\nSaya ingin melakukan checkout untuk pembelian barang-barang berikut:
      ${cartItems?.map(
    (product, index) => `\n[${index + 1}] ${product?.title} (*Qty: ${product?.quantity}*)`,
  )}\n\nTotal Barang: *${totalItem}*\nTotal Pembelian: *$${totalPrice.toFixed(
  2,
)} USD*\n\nMohon bantu konfirmasi ketersediaan stok dan informasi lanjut untuk proses pembayaran. Terima kasih! 
      `,
    );
    const URL_CHECKOUT = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
    window.open(URL_CHECKOUT, '_blank');
    onClose();
    onCheckout();
  };

  return (
    <Modal onClose={onClose}>
      <div className="w-full relative">
        <div className="px-5 overflow-y-auto h-[42vh]">
          <div className="h-full">
            <div className="absolute -top-[2.375rem] left-0 w-full">
              <h5 className="text-center font-bold">Cart</h5>
            </div>
            <div className="absolute -top-10 left-3 z-[101]">
              <button
                type="button"
                aria-label="Close Cart"
                className="w-7 h-7 bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-200 transition duration-100 ease-in-out"
                onClick={onClose}
              >
                <ChevronLeftIcon size={20} />
              </button>
            </div>
            {totalItem === 0 ? (
              <div className="flex w-full h-full items-center justify-center flex-col pb-5">
                <img
                  src={cartImg}
                  alt="Empty Cart"
                  className="w-28 block"
                />
                <p className="mt-3 text-center text-sm font-semibold">
                  Your cart is empty.
                </p>
                <p className="text-center text-sm text-gray-400">
                  Add something to make me happy 😃
                </p>
                <button
                  type="button"
                  aria-label="Shop Now"
                  className="mt-3 block bg-lime-600 text-gray-100 font-bold px-4 py-1.5 rounded-lg text-center leading-normal text-sm hover:bg-lime-500 transition duration-100 ease-in-out"
                  onClick={onClose}
                >
                  Shop Now
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {cartItems?.map((product) => (
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
                          onClick={() => handleRemoveItemCart(product.id)}
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
                          {product?.totalPrice.toFixed(2)}
                          {' '}
                          USD
                        </h6>
                        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                          <button
                            type="button"
                            aria-label="Minus Item"
                            className="px-3 py-2 leading-normal"
                            onClick={() => handleMinusItemCart(product)}
                          >
                            <MinusIcon
                              size={14}
                              strokeWidth={3}
                            />
                          </button>
                          <p className="text-sm">{product?.quantity}</p>
                          <button
                            type="button"
                            aria-label="Add Item"
                            className="px-3 py-1.5 leading-normal"
                            onClick={() => handleAddItemCart(product)}
                          >
                            <PlusIcon
                              size={14}
                              strokeWidth={3}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="sticky md:static inset-x-0 bottom-0">
          <div className="border-t border-gray-200 px-5">
            <div className="relative mb-4 mt-4.5">
              <input
                type="text"
                className="w-full pr-4 py-3 rounded-full pl-12 text-sm bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-100 ease-in-out font-semibold uppercase text-gray-700"
                placeholder="Add coupon code"
                disabled={totalItem === 0}
              />
              <TicketIcon
                size={22}
                className="absolute top-3 left-4 stroke-gray-400"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="">Total</p>
              <p className="font-bold text-lg">
                $
                {totalPrice.toFixed(2)}
                {' '}
                USD
              </p>
            </div>
            <p className="text-xs flex items-center justify-between mb-3">
              <span className="text-gray-400">
                With this order you will earn
                {' '}
                {totalPoint}
                {' '}
                points
              </span>
              <span className="text-gray-400">VAT Included</span>
            </p>
            <button
              type="button"
              aria-label="Proceed to Checkout"
              className="bg-gray-900 text-gray-100 font-bold w-full px-6 py-3.5 rounded-xl text-center leading-normal text-sm hover:bg-lime-600 transition duration-100 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={handleCheckout}
              disabled={totalItem === 0}
            >
              Proceed to Checkout (WhatsApp)
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

CartModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
};

export default CartModal;
