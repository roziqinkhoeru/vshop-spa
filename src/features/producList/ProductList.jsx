import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../cart/cartSlice';
import { PlusIcon, StarIcon } from 'lucide-react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-4 mobile:grid-cols-12 gap-x-3 mobile:gap-x-8">
      <div className="mobile:col-span-3">
        <div className="hidden mobile:block"></div>
      </div>
      <div className="col-span-9">
        <div className="w-full grid grid-cols-4 mobile:grid-cols-12 gap-4">
          {products?.map((product) => (
            <div
              className="col-span-2 mobile:col-span-4 w-full flex flex-col justify-between bg-white p-3 rounded-2xl border border-gray-200 cursor-pointer"
              key={product?.id}>
              <div className="mb-2">
                <figure className="mb-1 bg-white overflow-hidden rounded-lg p-4 flex items-center justify-center h-32 w-full">
                  <img
                    src={product?.image}
                    alt={product?.title}
                    className="w-full h-full object-contain object-center"
                  />
                </figure>
                <p className="capitalize text-xs text-gray-500">
                  {product?.category}
                </p>
                <h6 className="mb-2 text-xs font-semibold text-gray-700 line-clamp-2 hover:line-clamp-none">
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
                className="group relative bg-gray-100 text-sm text-left w-full px-4 py-2 rounded-full text-gray-700 font-medium mt-2 hover:bg-gray-200 transition duration-300 ease-in-out"
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
