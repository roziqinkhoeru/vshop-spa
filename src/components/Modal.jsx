import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const BackdropOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm" />
  );
};

const ModalOverlay = ({ children, showModal, desktopView }) => {
  const desktopViewClass = `items-center ${
    showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
  }`;
  const mobileViewClass = `items-end ${
    showModal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
  }`;

  return (
    <div
      className={`fixed inset-0 w-full h-screen flex justify-center z-[100] transition-all duration-300 ease-in-out ${
        desktopView ? desktopViewClass : mobileViewClass
      }`}>
      <div
        className={`bg-white pt-14 pb-5 ${
          desktopView ? 'rounded-xl w-[32rem]' : 'rounded-t-2xl w-full'
        }`}>
        {children}
      </div>
    </div>
  );
};

const cartRootElement = document.getElementById('modal-root');

function Modal({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth > 768);

  const handleResize = () => {
    setIsDesktopView(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowModal(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {ReactDOM.createPortal(<BackdropOverlay />, cartRootElement)}
      {ReactDOM.createPortal(
        <ModalOverlay
          showModal={showModal}
          desktopView={isDesktopView}>
          {children}
        </ModalOverlay>,
        cartRootElement
      )}
    </>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  showModal: PropTypes.bool.isRequired,
  desktopView: PropTypes.bool.isRequired,
};
Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
