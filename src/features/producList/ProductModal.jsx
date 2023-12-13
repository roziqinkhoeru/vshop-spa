import PropTypes from 'prop-types';
import Modal from '../../components/Modal';
import { ChevronLeftIcon, MinusIcon, PlusIcon, StarIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../cart/cartSlice';
import { useEffect, useState } from 'react';

function ProductModal({ onClose, product }) {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
    onClose();
  };

  const handleAddItemCart = (product) => {
    setSelectedProduct({
      ...product,
      quantity: product.quantity + 1,
      totalPrice: product.price * (product.quantity + 1),
      point: product.point * (product.quantity + 1),
    });
  };
  const handleMinusItemCart = (product) => {
    setSelectedProduct({
      ...product,
      quantity: product.quantity - 1,
      totalPrice: product.price * (product.quantity - 1),
      point: product.point * (product.quantity - 1),
    });
  };

  useEffect(() => {
    setSelectedProduct(product);
  }, [product]);

  return (
    <Modal>
      <div className="w-full relative">
        <div className="px-5 overflow-y-auto max-h-[calc(72vh-70px)] md:max-h-[64vh] mb-[4.375rem] md:mb-0">
          <div className="h-full">
            <div className="absolute -top-[2.375rem] left-0 w-full">
              <h5 className="text-center font-bold">Detail Product</h5>
            </div>
            <div className="absolute -top-10 left-3 z-[101]">
              <button
                className="w-7 h-7 bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-200 transition duration-100 ease-in-out"
                onClick={onClose}>
                <ChevronLeftIcon size={20} />
              </button>
            </div>
            <figure className="block w-full h-36 rounded-xl overflow-hidden mt-4 mb-5 px-4 py-5 border border-gray-200">
              <img
                src={selectedProduct?.image}
                alt={selectedProduct?.title}
                className="w-full h-full object-contain object-center"
              />
            </figure>
            <div className="flex justify-between mb-4">
              <div className="">
                <h6 className="text-base font-bold mb-px">
                  {selectedProduct?.title}
                </h6>
                <p className="text-sm capitalize text-gray-500">
                  {selectedProduct?.category}
                </p>
              </div>
              <div className="ml-4">
                <div className="bg-yellow-100 px-2.5 py-0.75 rounded-full flex items-center">
                  <StarIcon
                    size={14}
                    fill="#facc15"
                    className="stroke-yellow-400 inline-block mr-1"
                  />
                  <div className="text-yellow-600 text-sm font-semibold">
                    {selectedProduct?.rating?.rate.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
            <h6 className="font-semibold mb-1 text-sm">Description</h6>
            <p className="mb-4 text-gray-500 text-sm">
              {selectedProduct?.description}
            </p>
            <div className="flex items-center mb-5">
              <h6 className="font-semibold mr-4 text-sm">Quantity</h6>
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                <button
                  className="px-3 py-2 leading-normal stroke-gray-800 disabled:cursor-not-allowed disabled:stroke-gray-300"
                  onClick={() => handleMinusItemCart(selectedProduct)}
                  disabled={selectedProduct?.quantity <= 1}>
                  <MinusIcon
                    size={14}
                    strokeWidth={3}
                    className="stroke-inherit"
                  />
                </button>
                <p className="text-sm">{selectedProduct?.quantity}</p>
                <button
                  className="px-3 py-1.5 leading-normal"
                  onClick={() => handleAddItemCart(selectedProduct)}>
                  <PlusIcon
                    size={14}
                    strokeWidth={3}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed md:static inset-x-0 bottom-0">
          <div className="border-t border-gray-200 px-5 pt-5 pb-5 md:pb-0">
            <button
              className="bg-gray-900 text-gray-100 font-bold w-full px-6 py-3.5 rounded-xl text-center leading-normal text-sm hover:bg-lime-600 transition duration-100 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={() => handleAddToCart(selectedProduct)}>
              Add to Cart{' '}
              <span className="text-gray-200 font-normal mx-1.5">|</span> $
              {selectedProduct?.totalPrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

ProductModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

export default ProductModal;
