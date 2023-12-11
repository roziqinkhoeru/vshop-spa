import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../cart/cartSlice';
import { Loader2Icon, PlusIcon, ServerCrashIcon, StarIcon } from 'lucide-react';
import {
  setProductsError,
  setProductsStart,
  setProductsSuccess,
} from './productSlice';

const BASE_URL = 'https://fakestoreapi.com/products';

function ProductList() {
  const { productItems, loading, categories, error } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  const handleFilterCategory = (category) => {};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setProductsStart());
        const response = await fetch(BASE_URL);
        const data = await response.json();
        dispatch(setProductsSuccess(data));
      } catch (error) {
        dispatch(setProductsError(error.message));
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <>
      <div className="flex items-center mb-5 overflow-x-scroll">
        <button
          className="whitespace-nowrap bg-gray-100 text-sm text-left w-auto px-4 py-2 rounded-full text-gray-700 font-medium mt-2 mr-2 hover:bg-gray-200 transition duration-300 ease-in-out"
          type="button"
          onClick={() => handleFilterCategory('all')}>
          All Products
        </button>
        {categories?.map((category) => (
          <button
            className="capitalize whitespace-nowrap bg-gray-100 text-sm text-left w-auto px-4 py-2 rounded-full text-gray-700 font-medium mt-2 mr-2 hover:bg-gray-200 transition duration-300 ease-in-out"
            key={category}
            onClick={() => handleFilterCategory(category)}
            type="button">
            {category}
          </button>
        ))}
      </div>
      <div className="">
        {loading ? (
          <div className="flex items-center justify-center min-h-[80vh]">
            <Loader2Icon
              className="animate-spin-fast stroke-gray-800"
              size={48}
            />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <ServerCrashIcon
              size={48}
              className="stroke-gray-400"
            />
            <p className="text-gray-400 font-semibold text-xl mt-1">Error</p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-4 mobile:grid-cols-12 gap-4">
            {productItems?.length > 0 ? (
              productItems?.map((product) => (
                <div
                  className="col-span-2 mobile:col-span-4 w-full flex flex-col justify-between bg-white p-3 rounded-2xl border border-gray-200"
                  key={product?.id}>
                  <div className="mb-2">
                    <figure className="mb-1 bg-white overflow-hidden rounded-lg p-4 flex items-center justify-center h-32 w-full">
                      <img
                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-full object-contain object-center"
                      />
                    </figure>
                    <p className="capitalize text-xs text-gray-500 mb-0.5">
                      {product?.category}
                    </p>
                    <h6 className="mb-2 text-xs font-bold text-gray-700 line-clamp-2 hover:line-clamp-none">
                      {product?.title}
                    </h6>
                    <p className="text-xs text-gray-500">
                      <StarIcon
                        size={14}
                        fill="#facc15"
                        className="stroke-yellow-400 inline-block mr-1"
                      />
                      {product?.rating?.rate} | {product?.rating?.count} reviews
                    </p>
                  </div>
                  <button
                    className="group relative bg-gray-100 text-sm text-left w-full px-4 py-2 rounded-full text-gray-700 font-semibold mt-2 hover:bg-gray-200 transition duration-300 ease-in-out"
                    type="button"
                    onClick={() => handleAddToCart(product)}>
                    ${product?.price}
                    <div className="absolute w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center top-0.5 bottom-0.5 right-0.5 group-hover:bg-lime-500">
                      <PlusIcon
                        size={18}
                        className="stroke-white"
                      />
                    </div>
                  </button>
                </div>
              ))
            ) : (
              <p>Not found</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ProductList;
