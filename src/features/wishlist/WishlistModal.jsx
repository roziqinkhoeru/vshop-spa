import Modal from '../../components/Modal';
import PropTypes from 'prop-types';

function WishlistModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <div>WishlistModal</div>
    </Modal>
  );
}

WishlistModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default WishlistModal;
