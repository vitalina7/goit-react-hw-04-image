import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ images, toggleModal }) => {
  return (
    <List>
      {images.map((image,index) => (
        <ImageGalleryItem
          key={index}
          image={image}
          toggleModal={toggleModal}
        />
      ))}
    </List>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleModal: PropTypes.func.isRequired,
};



