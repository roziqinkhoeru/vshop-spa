import { SearchIcon, ShoppingCartIcon } from 'lucide-react';
// import viteLogo from './vite.svg';

function Header() {
  return (
    <header className="bg-gray-50 mobile:bg-lime-500 fixed top-0 w-full">
      <div className="container max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-[4.5rem]">
          <a
            href="/"
            className="group flex items-center text-gray-100 hover:scale-105 transition-all duration-100 ease-in-out">
            <figure className="block mr-2">
              <img
                src="https://vitejs.dev/logo.svg"
                alt="Workflow"
                className="h-8"
              />
            </figure>
            <span className="text-gray-100 font-bold text-xl hidden mobile:block">
              VShop
            </span>
          </a>
          <div className="relative">
            <input
              type="text"
              className="bg-gray-100 pl-11 pr-3 py-3 rounded-full text-sm"
              placeholder="Search"
            />
            <SearchIcon
              size={22}
              className="absolute top-3 left-3 text-gray-500"
            />
          </div>
          <button
            className="relative"
            type="button"
            title="Cart">
            <ShoppingCartIcon
              strokeWidth={2.5}
              className="text-lg"
            />
            <div className="bg-red-500 rounded-full w-5 h-5 flex items-center justify-center absolute -top-3 -right-3">
              <span className="text-white text-xs font-medium">
                {}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
