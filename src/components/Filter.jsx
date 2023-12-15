import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeftIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import { resetFilter, setSortBy } from '../features/producList/filterSlice';

function Filter({ onClose }) {
  const dispatch = useDispatch();
  const { sortBy } = useSelector((state) => state.filter.filters);
  const [sortFilter, setSortFilter] = useState(sortBy);

  const handleResetFilter = () => {
    dispatch(resetFilter());
    onClose();
  };
  const handleSubmitFilter = () => {
    dispatch(setSortBy(sortFilter));
    onClose();
  };
  const handleSortFilter = (sort) => {
    setSortFilter(sort);
  };

  return (
    <Modal onClose={onClose}>
      <div className="w-full relative">
        <div className="px-5 overflow-y-auto max-h-[calc(72vh-70px)] md:max-h-[64vh]">
          <div className="h-full">
            <div className="absolute -top-[2.375rem] left-0 w-full">
              <h5 className="text-center font-bold">Filters</h5>
            </div>
            <div className="absolute -top-10 left-3 z-[101]">
              <button
                type="button"
                aria-label="Close Filter"
                className="w-7 h-7 bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-200 transition duration-100 ease-in-out"
                onClick={onClose}
              >
                <ChevronLeftIcon size={20} />
              </button>
            </div>
            <div className="absolute -top-10 right-3 z-[101]">
              <button
                type="button"
                aria-label="Reset Filter"
                className="bg-gray-100 rounded-md px-2.5 py-1 text-gray-600 hover:bg-gray-200 transition duration-100 ease-in-out text-sm hover:text-gray-800"
                onClick={() => handleResetFilter()}
              >
                Reset
              </button>
            </div>
            <h6 className="font-bold mb-4 mt-2">Sort by</h6>
            <div className="mb-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="">Relevance</p>
                <button
                  type="button"
                  aria-label="Relevance"
                  className={`w-6 h-6 rounded-full ${
                    sortFilter === 'relevance'
                      ? 'border-[8px] border-gray-800'
                      : 'border-2 border-gray-400'
                  }`}
                  onClick={() => handleSortFilter('relevance')}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="">Highest Price</p>
                <button
                  type="button"
                  aria-label="Highest Price"
                  className={`w-6 h-6 rounded-full ${
                    sortFilter === 'highest'
                      ? 'border-[8px] border-gray-800'
                      : 'border-2 border-gray-400'
                  }`}
                  onClick={() => handleSortFilter('highest')}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="">Lowest Price</p>
                <button
                  type="button"
                  aria-label="Lowest Price"
                  className={`w-6 h-6 rounded-full ${
                    sortFilter === 'lowest'
                      ? 'border-[8px] border-gray-800'
                      : 'border-2 border-gray-400'
                  }`}
                  onClick={() => handleSortFilter('lowest')}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="">A - Z</p>
                <button
                  type="button"
                  aria-label="A - Z"
                  className={`w-6 h-6 rounded-full ${
                    sortFilter === 'a_z'
                      ? 'border-[8px] border-gray-800'
                      : 'border-2 border-gray-400'
                  }`}
                  onClick={() => handleSortFilter('a_z')}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="">Z - A</p>
                <button
                  type="button"
                  aria-label="Z - A"
                  className={`w-6 h-6 rounded-full ${
                    sortFilter === 'z_a'
                      ? 'border-[8px] border-gray-800'
                      : 'border-2 border-gray-400'
                  }`}
                  onClick={() => handleSortFilter('z_a')}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="">Top Rated</p>
                <button
                  type="button"
                  aria-label="Top Rated"
                  className={`w-6 h-6 rounded-full ${
                    sortFilter === 'top_rated'
                      ? 'border-[8px] border-gray-800'
                      : 'border-2 border-gray-400'
                  }`}
                  onClick={() => handleSortFilter('top_rated')}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="">Most Reviewed</p>
                <button
                  type="button"
                  aria-label="Most Reviewed"
                  className={`w-6 h-6 rounded-full ${
                    sortFilter === 'most_reviewed'
                      ? 'border-[8px] border-gray-800'
                      : 'border-2 border-gray-400'
                  }`}
                  onClick={() => handleSortFilter('most_reviewed')}
                />
              </div>
            </div>
            <button
              type="button"
              aria-label="Show Results"
              className="bg-gray-900 text-gray-100 font-bold w-full px-6 py-3.5 rounded-xl text-center leading-normal text-sm hover:bg-lime-600 transition duration-100 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={handleSubmitFilter}
            >
              Show Results
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

Filter.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Filter;
