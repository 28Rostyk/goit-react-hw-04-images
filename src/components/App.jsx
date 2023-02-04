import { useState, useEffect } from 'react';
import { fetchImages } from 'services/Api';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Batton/Button';
import Modal from './Modal';
import { ColorRing } from 'react-loader-spinner';
import css from './App.module.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!search) {
      return;
    }

    const searchImages = async () => {
      try {
        setLoading(true);
        const items = await fetchImages(search, page);

        setImages(prevImages => [...prevImages, ...items]);
      } catch (error) {
        setError(toast.error('Sorry try again latter'));
      } finally {
        setLoading(false);
        setError(null);
      }
    };
    searchImages();
  }, [search, page]);

  const onImageClick = data => {
    setLargeImageURL(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  const onSubmitForm = data => {
    setSearch(data);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmitForm} />
      {loading && page === 1 && (
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass={css.blocks_wrapper}
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      )}
      {images.length > 0 && (
        <>
          <ImageGallery images={images} onImageClick={onImageClick} />
          {loading ? (
            <ColorRing
              visible={true}
              height="100"
              width="100"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass={css.blocks_wrapper}
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          ) : (
            <Button loadMore={loadMore} title="Load more" />
          )}
        </>
      )}
      {error && <p>{error}</p>}
      {showModal && (
        <Modal close={closeModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default App;
