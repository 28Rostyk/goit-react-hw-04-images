import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ preview, fullSize, onImageClick }) => {
  return (
    <li
      onClick={() => {
        onImageClick(fullSize);
      }}
      className={css.ImageGalleryItem}
    >
      <img src={preview} className={css.ImageGalleryItem__image} alt="" />
    </li>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  preview: PropTypes.string.isRequired,
  fullSize: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
