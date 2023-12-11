import './App.css';
import Header from './components/Header';
import ProductList from './features/producList/ProductList';

function App() {
  return (
    <>
      <Header />
      <main className="mt-24 container max-w-7xl mx-auto px-5 sm:px-6">
        <h1 className="text-center font-bold text-2xl mb-12 pt-4 hidden mobile:block">
          Shop Now
        </h1>
        <ProductList />
      </main>
      <footer className="mt-8 bg-slate-900">
        <div className="container max-w-7xl mx-auto px-5 sm:px-6 py-4">
          <p className="text-center text-slate-200">
            Made with{' '}
            <span
              role="img"
              aria-label="love">
              ❤️
            </span>{' '}
            by{' '}
            <a
              href="https://github.com/roziqinkhoeru"
              className="text-violet-600 hover:text-violet-500 transition duration-100 ease-in-out"
              target="_blank"
              rel="noopener noreferrer"
              title="Khoeru Roziqin">
              Khoeru Roziqin
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
