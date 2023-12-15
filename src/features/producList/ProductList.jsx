import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  HeartIcon,
  Loader2Icon,
  PlusIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  StarIcon,
  XIcon,
} from 'lucide-react';
import {
  setProductsError,
  setProductsStart,
  setProductsSuccess,
} from './productSlice';
import ProductModal from './ProductModal';
import { setCategory, setSearch } from './filterSlice';
import systemImg from '../../assets/img/system.png';
import emptyImg from '../../assets/img/empty-box.png';
import {
  addItemToWishlist,
  selectWishlistItems,
} from '../wishlist/wishlistSlice';

const BASE_URL = import.meta.env.VITE_API_KEY;

function ProductList({ onOpen, onClose, onOpenFilter }) {
  const {
    productItems, loading, categories, error,
  } = useSelector(
    (state) => state.product,
  );
  const wishlistItems = useSelector(selectWishlistItems);
  const {
    category: selectedCategory,
    sortBy,
    search,
  } = useSelector((state) => state.filter.filters);
  const dispatch = useDispatch();

  const [isOpenModalProduct, setIsOpenModalProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleFilterCategory = (category) => {
    dispatch(setCategory(category));
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    dispatch(setSearch(value));
  };

  const handleWishlist = (product) => {
    dispatch(addItemToWishlist(product));
  };

  const handleOpenModalProduct = (product) => {
    setIsOpenModalProduct(true);
    onOpen();
    setSelectedProduct({
      ...product,
      quantity: 1,
      totalPrice: product.price,
      point: product.id,
    });
  };
  const handleCloseModalProduct = () => {
    setIsOpenModalProduct(false);
    onClose();
  };

  const handleToggleFilter = () => {
    onOpenFilter();
  };

  const filteredProducts = useMemo(() => {
    const filtered = productItems.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case 'a_z':
        return filtered.slice().sort((a, b) => a.title.localeCompare(b.title));
      case 'z_a':
        return filtered.slice().sort((a, b) => b.title.localeCompare(a.title));
      case 'highest':
        return filtered.slice().sort((a, b) => b.price - a.price);
      case 'lowest':
        return filtered.slice().sort((a, b) => a.price - b.price);
      case 'top_rated':
        return filtered.slice().sort((a, b) => b.rating.rate - a.rating.rate);
      case 'most_reviewed':
        return filtered.slice().sort((a, b) => b.rating.count - a.rating.count);
      case 'relevance':
      default:
        return filtered;
    }
  }, [productItems, search, selectedCategory, sortBy]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setProductsStart());
        const response = await fetch(BASE_URL);
        const data = await response.json();
        dispatch(setProductsSuccess(data));
      } catch (err) {
        dispatch(setProductsError(err.message));
      }
    };
    fetchProducts();
  }, [dispatch]);

  const isWishlistProduct = (product) => wishlistItems.find((item) => item.id === product.id);

  return (
    <>
      <div className="flex tablet:items-center tablet:justify-between flex-col-reverse tablet:flex-row mb-5 gap-4">
        <div className="flex items-center overflow-x-scroll categories-filter">
          <button
            className={`whitespace-nowrap border-2 bg-gray-100 text-sm text-left w-auto px-3 py-1.5 rounded-full text-gray-700 font-medium mr-2 transition duration-100 ease-in-out ${
              selectedCategory === 'all'
                ? 'border-gray-700 hover:bg-gray-200'
                : 'border-gray-100 hover:bg-gray-200 hover:border-gray-200'
            } disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:border-transparent`}
            type="button"
            disabled={!!(error || loading)}
            onClick={() => handleFilterCategory('all')}
          >
            All Products
          </button>
          {categories?.map((category) => (
            <button
              className={`capitalize whitespace-nowrap border-2 bg-gray-100 text-sm text-left w-auto px-3 py-1.5 rounded-full text-gray-700 font-medium mr-2 transition duration-300 ease-in-out ${
                selectedCategory === category
                  ? 'border-gray-700 hover:bg-gray-200'
                  : 'border-gray-100 hover:bg-gray-200 hover:border-gray-200'
              } disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:border-transparent`}
              key={category}
              onClick={() => handleFilterCategory(category)}
              disabled={!!(error || loading)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <div className="">
          <div className="flex items-center space-x-2.5">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm"
                placeholder="Search"
                value={search}
                onChange={handleSearch}
              />
              <SearchIcon
                size={18}
                className="stroke-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none"
              />
              {search && (
                <XIcon
                  size={15}
                  className="stroke-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer hover:stroke-gray-500"
                  onClick={() => dispatch(setSearch(''))}
                />
              )}
            </div>
            <div className="">
              <button
                className="relative w-[2.375rem] h-[2.375rem] flex items-center justify-center rounded-full bg-gray-900 hover:bg-lime-600 transition duration-100 ease-in-out"
                type="button"
                title="Filter"
                onClick={handleToggleFilter}
              >
                <SlidersHorizontalIcon
                  strokeWidth={2.5}
                  size={18}
                  className="w-5 stroke-gray-100"
                />
                {sortBy !== 'relevance' ? (
                  <div className="bg-red-500 rounded-full w-3.5 h-3.5 flex items-center justify-center absolute -top-px -right-0.75 border-2 border-white" />
                ) : (
                  ''
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        {loading && (
        <div className="flex items-center justify-center min-h-[68vh] mobile:min-h-[62vh]">
          <Loader2Icon
            className="animate-spin-fast stroke-gray-800"
            size={48}
          />
        </div>
        )}
        {error && (
        <div className="flex flex-col items-center justify-center min-h-[68vh] mobile:min-h-[62vh]">
          <img
            src={systemImg}
            alt="System Computer Error"
            className="w-24"
          />
          <p className="text-gray-400 font-semibold text-lg mt-5">
            We lost one, please try again.
          </p>
          <a
            href="/"
            className="mt-3 block bg-lime-600 text-gray-100 font-bold px-4 py-1.5 rounded-lg text-center leading-normal text-sm hover:bg-lime-500 transition duration-100 ease-in-out"
          >
            Reload
          </a>
        </div>
        )}
        {!loading && !error && (
        <div className="w-full grid grid-cols-4 mobile:grid-cols-12 xl:grid-cols-10 gap-4">
          {filteredProducts?.length > 0 ? (
            filteredProducts?.map((product) => (
              <div
                className="relative col-span-full xxs:col-span-2 mobile:col-span-4 md:col-span-3 xl:col-span-2 w-full flex flex-col justify-between bg-white p-3 rounded-2xl border border-gray-200"
                key={product?.id}
              >
                <div className="mb-2">
                  <figure className="mb-1 bg-white overflow-hidden rounded-lg p-4 flex items-center justify-center h-32 w-full">
                    <img
                      src={product?.image}
                      alt={product?.title}
                      className="w-full h-full object-contain object-center"
                    />
                  </figure>
                  <span className="block capitalize text-xs text-gray-500 mb-0.5 mobile:mb-1">
                    {product?.category}
                  </span>
                  <h1 className="mb-2 mobile:mb-2.5 text-xs font-bold text-gray-700 line-clamp-2 hover:line-clamp-none">
                    {product?.title}
                  </h1>
                  <p className="text-xs text-gray-500">
                    <StarIcon
                      size={14}
                      fill="#facc15"
                      className="stroke-yellow-400 inline-block mr-1"
                    />
                    {product?.rating?.rate.toFixed(1)}
                    {' '}
                    |
                    {' '}
                    {product?.rating?.count}
                    {' '}
                    reviews
                  </p>
                </div>
                <button
                  className="group relative bg-gray-100 text-sm text-left w-full px-4 py-2 rounded-full text-gray-700 font-semibold mt-2 hover:bg-gray-200 transition-all duration-300 ease-in-out before:bg-lime-500 before:absolute before:inset-0 before:rounded-full before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out"
                  type="button"
                  onClick={() => handleOpenModalProduct(product)}
                  title="Add to cart"
                >
                  $
                  {product?.price}
                  <span className="absolute whitespace-nowrap text-gray-100 -z-10 text-center opacity-0 group-hover:z-10 group-hover:opacity-100 transition-all ease-in-out duration-[400ms] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    Buy Now
                  </span>
                  <div className="absolute w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center top-0.5 bottom-0.5 right-0.5 group-hover:bg-lime-500 transition-all ease-in-out duration-200 group-hover:-z-10 group-hover:scale-90">
                    <PlusIcon
                      size={18}
                      className="stroke-white"
                    />
                  </div>
                </button>
                <div className="absolute top-3 right-3">
                  <HeartIcon
                    size={22}
                    className={`cursor-pointer ${
                      isWishlistProduct(product)
                        ? 'stroke-red-500 fill-red-500 bg-red-500'
                        : 'stroke-gray-400'
                    }}`}
                    onClick={() => handleWishlist(product)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="flex flex-col items-center justify-center min-h-[68vh] mobile:min-h-[62vh]">
                <img
                  src={emptyImg}
                  alt="Box Product Empty"
                  className="w-24"
                />
                <p className="text-gray-400 font-semibold text-lg mt-5">
                  No products found.
                </p>
              </div>
            </div>
          )}
        </div>
        )}
      </div>
      {isOpenModalProduct ? (
        <ProductModal
          onClose={handleCloseModalProduct}
          product={selectedProduct}
        />
      ) : null}
    </>
  );
}

ProductList.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpenFilter: PropTypes.func.isRequired,
};

export default ProductList;
