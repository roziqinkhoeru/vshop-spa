import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { CheckIcon, CircleIcon } from 'lucide-react';

const BackdropOverlay = () => {
  return <div className="fixed inset-0 bg-green-700 z-50" />;
};

const ModalOverlay = ({ children, showModal }) => {
  return (
    <div
      className={`fixed inset-0 w-full h-screen flex items-center justify-center z-[100] transition-all duration-300 ease-in-out ${
        showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
      <div className="mx-4 w-full md:w-96 max-w-[24rem] md:max-w-none">
        {children}
      </div>
    </div>
  );
};

const checkoutRootElement = document.getElementById('checkout-root');

function Checkout({ closeCheckout }) {
  const [showModal, setShowModal] = useState(false);

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
        <ModalOverlay showModal={showModal}>
          <h6 className="text-gray-50 font-bold text-lg mb-6 text-center">
            Checkout Receipt
          </h6>
          <div className="bg-white rounded-t-2xl px-4 pb-5 py-6 relative">
            <div className="relative text-center mb-4.5">
              {/* <Badge
                size={90}
                strokeWidth={1.5}
                className="mx-auto stroke-green-700 fill-orange-300"
              /> */}
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
              $123.00
            </h4>
            <div className="relative">
              <hr className="mt-4 mb-3 border-gray-200 border-dashed border-[1.5px]" />
              <div className="w-6 h-6 rounded-full bg-green-700 absolute top-1/2 transform -translate-y-1/2 -right-8" />
              <div className="w-6 h-6 rounded-full bg-green-700 absolute top-1/2 transform -translate-y-1/2 -left-8" />
            </div>
            <p className="font-semibold text-gray-400 mb-2.5">Payment for</p>
            <div className="w-full bg bg-gray-200 rounded-xl p-4 flex items-center space-x-4 mb-6">
              <div className=""></div>
              <div className="">
                <p className="text-base text-gray-800 mb-0.5 font-semibold">
                  8 items
                </p>
                <p className="text-gray-400 text-sm">
                  Dec 12, 2023{' '}
                  <span className="text-gray-400 text-sm mx-1">.</span> 3:02 PM
                </p>
              </div>
            </div>
            <button
              className="bg-green-500 text-gray-100 font-bold w-full px-6 py-3.5 rounded-xl text-center leading-normal text-sm hover:bg-green-600 transition duration-100 ease-in-out disabled:bg-emerald-200 disabled:cursor-not-allowed mb-5"
              onClick={closeCheckout}>
              Done
            </button>
            <p
              className="text-center text-emerald-500 font-semibold mb-2 cursor-pointer hover:text-emerald-600"
              role="button"
              onClick={closeCheckout}>
              Pay Again
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
};
Checkout.propTypes = {
  closeCheckout: PropTypes.func.isRequired,
};

export default Checkout;
