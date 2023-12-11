import { MinusIcon, PlusIcon, TicketIcon, XIcon } from 'lucide-react';
import Modal from '../../components/Modal';
import PropTypes from 'prop-types';
import {
  selectCartItems,
  selectTotalPoint,
  selectTotalPrice,
} from './cartSlice';
import { useSelector } from 'react-redux';

CartModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

function CartModal({ onClose }) {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const totalPoint = useSelector(selectTotalPoint);
  return (
    <Modal>
      <div className="w-full relative">
        <div className="px-5 h-[calc(70vh-182px)] overflow-y-auto mb-[182px]">
          <div className="">
            <div className="absolute -top-[2.375rem] left-0 w-full">
              <h5 className="text-center font-bold">Cart</h5>
            </div>
            <div className="absolute -top-10 right-3 z-[101]">
              <button
                className="w-7 h-7 bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-200 transition duration-100 ease-in-out"
                onClick={onClose}>
                <XIcon size={16} />
              </button>
            </div>
            {cartItems.length === 0 ? (
              <p>Empty</p>
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
                      <h6 className="font-bold text-sm text-gray-800 mr-8 line-clamp-2 hover:line-clamp-none mb-px">
                        {product?.title}
                      </h6>
                      <p className="text-xs text-gray-400 mb-1">
                        {product?.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <h6 className="font-semibold">
                          ${product?.totalPrice} USD
                        </h6>
                        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                          <button className="px-3 py-1.5 leading-normal">
                            <MinusIcon size={14} />
                          </button>
                          <p className="text-sm">{product?.quantity}</p>
                          <button className="px-3 py-1.5 leading-normal">
                            <PlusIcon size={14} />
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
            <button className="bg-gray-900 text-gray-100 font-bold w-full px-6 py-3 rounded-xl text-center leading-normal text-sm hover:bg-lime-600 transition duration-100 ease-in-out">
              Proceed to Checkout (WhatsApp)
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CartModal;
