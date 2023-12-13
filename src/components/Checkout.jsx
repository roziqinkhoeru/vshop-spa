import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { CheckIcon, ChevronDownIcon, CircleIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import {
  selectCartItems,
  selectTotalItemCart,
  selectTotalPoint,
  selectTotalPrice,
} from '../features/cart/cartSlice';

const BackdropOverlay = () => {
  return <div className="fixed inset-0 bg-green-700 z-50 backdrop-blur-sm" />;
};

const ModalOverlay = ({ children, showModal, showItem }) => {
  return (
    <div
      className={`fixed inset-0 w-full min-h-screen overflow-y-auto flex items-center justify-center z-[100] transition-all duration-300 ease-in-out ${
        showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
      <div
        className={`mx-4 w-full md:w-96 max-w-[24rem] md:max-w-none my-5 ${
          showItem ? 'h-full py-5' : ''
        }`}>
        {children}
      </div>
    </div>
  );
};

const checkoutRootElement = document.getElementById('checkout-root');

function Checkout({ closeCheckout, datetime }) {
  const totalItems = useSelector(selectTotalItemCart);
  const totalPrice = useSelector(selectTotalPrice);
  const checkoutItems = useSelector(selectCartItems);
  const totalPoints = useSelector(selectTotalPoint);
  const [showModal, setShowModal] = useState(false);
  const [isOpenDropItem, setIsOpenDropItem] = useState(false);
  const dateCheckout = datetime?.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const timeCheckout = datetime?.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowModal(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {ReactDOM.createPortal(<BackdropOverlay />, checkoutRootElement)}
      {ReactDOM.createPortal(
        <ModalOverlay
          showModal={showModal}
          showItem={isOpenDropItem}>
          <h6 className="text-gray-50 font-bold text-lg mb-6 text-center mt-5">
            Checkout Receipt
          </h6>
          <div
            className={`bg-white rounded-t-2xl px-4 pb-5 py-6 relative ${
              isOpenDropItem ? 'mb-8' : 'mb-1'
            }`}>
            <div className="relative text-center mb-4.5">
              <CircleIcon
                size={84}
                strokeWidth={1.5}
                className="mx-auto stroke-green-700 fill-orange-300"
              />
              <CheckIcon
                size={32}
                strokeWidth={4}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-50 stroke-gray-50"
              />
            </div>
            <h5 className="text-center text-gray-800 font-bold text-xl mb-2">
              Checkout Success
            </h5>
            <p className="text-gray-400 mb-4 text-center">
              Your checkout process has been successful! We have received your
              order.
            </p>
            <p className="text-gray-400 mb-2 text-center">Total Payment</p>
            <h4 className="font-bold text-center text-gray-800 text-3xl">
              ${totalPrice.toFixed(2)}
            </h4>
            <div className="relative">
              <hr className="mt-4 mb-3 border-gray-200 border-dashed border-[1.5px]" />
              <div className="w-6 h-6 rounded-full bg-green-700 absolute top-1/2 transform -translate-y-1/2 -right-8" />
              <div className="w-6 h-6 rounded-full bg-green-700 absolute top-1/2 transform -translate-y-1/2 -left-8" />
            </div>
            <p className="font-semibold text-gray-400 mb-2.5">Payment for</p>
            <div className="w-full bg bg-gray-200 rounded-xl px-3.5 py-3 mb-2">
              <div className="flex items-center space-x-3">
                <div className="">
                  <figure className="w-10 h-10 flex items-center justify-center bg-white rounded-lg">
                    <img
                      src="https://vitejs.dev/logo.svg"
                      alt="vite logo"
                      className="w-6"
                    />
                  </figure>
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <div className="">
                      <p className="text-base text-gray-800 mb-0.5 font-semibold">
                        {totalItems} items
                      </p>
                      <p className="text-gray-400 text-sm">
                        {dateCheckout}{' '}
                        <span className="text-gray-400 text-sm mx-1">.</span>{' '}
                        {timeCheckout}
                      </p>
                    </div>
                    <div className="">
                      <button
                        className="w-6 h-6 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-50"
                        onClick={() => setIsOpenDropItem(!isOpenDropItem)}>
                        <ChevronDownIcon
                          size={18}
                          className={`stroke-gray-700 transition-transform transform duration-200 ease-in-out ${
                            isOpenDropItem ? 'rotate-180' : 'rotate-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {isOpenDropItem && (
                <div className="flex flex-col gap-3 mt-5 mb-1">
                  {checkoutItems?.map((product) => (
                    <div
                      className="flex"
                      key={product?.id}>
                      <div className="">
                        <figure className="flex items-center justify-center w-8 h-8 rounded-md bg-white p-1 mr-2">
                          <img
                            src={product?.image}
                            alt={product?.title}
                            className="w-full h-full object-center object-contain"
                          />
                        </figure>
                      </div>
                      <div className="">
                        <p className="text-xs font-semibold text-gray-700">
                          {product?.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product?.quantity} x ${product?.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-sm mb-6 text-gray-600 text-center">
              Complete your payment and you will obtain{' '}
              <span className="font-semibold text-green-700">
                {totalPoints} points.
              </span>
            </p>
            <button
              className="bg-green-500 text-gray-100 font-bold w-full px-6 py-3.5 rounded-xl text-center leading-normal text-sm hover:bg-green-600 transition duration-100 ease-in-out disabled:bg-emerald-200 disabled:cursor-not-allowed mb-5"
              onClick={closeCheckout}>
              Done
            </button>
            <p
              className="text-center text-emerald-500 font-semibold mb-2 cursor-pointer hover:text-emerald-600"
              role="button"
              onClick={closeCheckout}>
              Shop More
            </p>
            <div className="absolute -bottom-4 left-2.5 right-2.5">
              <div className="flex items-center justify-center space-x-1">
                {[...Array(13)].map((_, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full bg-green-700"
                  />
                ))}
              </div>
            </div>
          </div>
        </ModalOverlay>,
        checkoutRootElement
      )}
    </>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  showModal: PropTypes.bool.isRequired,
  showItem: PropTypes.bool.isRequired,
};
Checkout.propTypes = {
  closeCheckout: PropTypes.func.isRequired,
  datetime: PropTypes.object.isRequired,
};

export default Checkout;
