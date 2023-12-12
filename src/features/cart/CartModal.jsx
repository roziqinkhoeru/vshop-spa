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
  selectTotalPoint,
  selectTotalPrice,
} from './cartSlice';
import cartImg from '../../assets/img/cart-empty.png';

CartModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

function CartModal({ onClose }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const totalPoint = useSelector(selectTotalPoint);

  const handleAddItemCart = (product) => {
    dispatch(addItemToCart(product));
  };

  const handleMinusItemCart = (product) => {
    dispatch(minusItemFromCart(product));
  };

  const handleRemoveItemCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <Modal>
      <div className="w-full relative">
        <div className="px-5 h-[calc(70vh-182px)] overflow-y-auto mb-[182px]">
          <div className="h-full">
            <div className="absolute -top-[2.375rem] left-0 w-full">
              <h5 className="text-center font-bold">Cart</h5>
            </div>
            <div className="absolute -top-10 left-3 z-[101]">
              <button
                className="w-7 h-7 bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-200 transition duration-100 ease-in-out"
                onClick={onClose}>
                <ChevronLeftIcon size={20} />
              </button>
            </div>
            {cartItems.length === 0 ? (
              <div className="flex w-full h-full items-center justify-center flex-col pb-5">
                <img
                  src={cartImg}
                  alt="Empty Cart"
                  className="w-24 block"
                />
                <p className="mt-3 text-center text-sm font-semibold">
                  Your cart is empty.
                </p>
                <p className="text-center text-sm text-gray-400">
                  Add something to make me happy 😃
                </p>
                <button
                  className="mt-3 block bg-lime-600 text-gray-100 font-bold px-4 py-1.5 rounded-lg text-center leading-normal text-sm hover:bg-lime-500 transition duration-100 ease-in-out"
                  onClick={onClose}>
                  Shop Now
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {cartItems?.map((product) => (
                  <div
                    className="border-b border-dashed border-gray-200 py-4 flex items-center space-x-3"
                    key={product?.id}>
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
                          role="button"
                          onClick={() => handleRemoveItemCart(product.id)}>
                          <XIcon
                            size={20}
                            className="stroke-gray-400 hover:stroke-red-500"
                          />
                        </span>
                      </h6>
                      <p className="text-xs text-gray-400 mb-1">
                        {product?.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <h6 className="font-semibold">
                          ${product?.totalPrice.toFixed(2)} USD
                        </h6>
                        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                          <button
                            className="px-3 py-2 leading-normal"
                            onClick={() => handleMinusItemCart(product)}>
                            <MinusIcon
                              size={14}
                              strokeWidth={3}
                            />
                          </button>
                          <p className="text-sm">{product?.quantity}</p>
                          <button
                            className="px-3 py-1.5 leading-normal"
                            onClick={() => handleAddItemCart(product)}>
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
        <div className="fixed inset-x-0 bottom-0">
          <div className="border-t border-gray-200 px-5 pb-5">
            <div className="relative mb-4 mt-4.5">
              <input
                type="text"
                className="w-full pr-4 py-3 rounded-full pl-12 text-sm bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-100 ease-in-out font-semibold uppercase text-gray-700"
                placeholder="Add coupon code"
                disabled={cartItems.length === 0 ? true : false}
              />
              <TicketIcon
                size={22}
                className="absolute top-3 left-4 stroke-gray-400"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="">Total</p>
              <p className="font-bold text-lg">${totalPrice.toFixed(2)} USD</p>
            </div>
            <p className="text-xs flex items-center justify-between mb-3">
              <span className="text-gray-400">
                With this order you will earn {totalPoint} points
              </span>
              <span className="text-gray-400">VAT Included</span>
            </p>
            <button
              className="bg-gray-900 text-gray-100 font-bold w-full px-6 py-3.5 rounded-xl text-center leading-normal text-sm hover:bg-lime-600 transition duration-100 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={cartItems.length === 0 ? true : false}>
              Proceed to Checkout (WhatsApp)
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CartModal;
