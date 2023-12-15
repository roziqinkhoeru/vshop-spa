import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function BackdropOverlay({ onClose }) {
  const handleClose = () => {
    onClose();
  };
  return (
    <div
      role="presentation"
      className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm"
      onClick={handleClose}
    />
  );
}

function ModalOverlay({
  children, showModal, desktopView, onClose,
}) {
  const handleClose = () => {
    onClose();
  };
  const desktopViewClass = `items-center ${
    showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
  }`;
  const mobileViewClass = `items-end ${
    showModal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
  }`;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 top-auto md:top-0 w-full h-auto md:h-screen flex justify-center z-[100] transition-all duration-300 ease-in-out ${
        desktopView ? desktopViewClass : mobileViewClass
      }`}
      onClick={handleClose}
      role="presentation"
      tabIndex={-1}
    >
      <div
        className={`bg-white pt-14 pb-5 ${
          desktopView ? 'rounded-xl w-[32rem]' : 'rounded-t-2xl w-full'
        }`}
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

const modalRootElement = document.getElementById('modal-root');

function Modal({ children, onClose }) {
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
      {ReactDOM.createPortal(
        <BackdropOverlay onClose={onClose} />,
        modalRootElement,
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          showModal={showModal}
          desktopView={isDesktopView}
          onClose={onClose}
        >
          {children}
        </ModalOverlay>,
        modalRootElement,
      )}
    </>
  );
}

BackdropOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  showModal: PropTypes.bool.isRequired,
  desktopView: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
