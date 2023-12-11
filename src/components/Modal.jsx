import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const BackdropOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm" />
  );
};

const ModalOverlay = ({ children, showModal }) => {
  return (
    <div
      className={`fixed inset-0 w-full h-screen flex items-end justify-center z-[100] transition-all duration-300 ease-in-out ${
        showModal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
      }`}>
      <div className="bg-white w-full pt-14 pb-5 rounded-t-2xl">{children}</div>
    </div>
  );
};

const cartRootElement = document.getElementById('modal-root');

function Modal({ children }) {
  const [showModal, setShowModal] = useState(false);

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
        <ModalOverlay showModal={showModal}>{children}</ModalOverlay>,
        cartRootElement
      )}
    </>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  showModal: PropTypes.bool.isRequired,
};
Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
