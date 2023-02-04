import { Component } from 'react';
import { fetchImages } from 'services/Api';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Batton/Button';
import Modal from './Modal';
import { ColorRing } from 'react-loader-spinner';
import css from './App.module.css';
class App extends Component {
  state = {
    search: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const items = await fetchImages(search, page);

      this.setState(({ images }) => ({
        images: [...images, ...items],
      }));
    } catch (error) {
      this.setState({ error: toast.error('Sorry try again latter') });
    } finally {
      this.setState({ loading: false, error: null });
    }
  }

  onImageClick = data => {
    this.setState({
      largeImageURL: data,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
    });
  };

  onSubmitForm = data => {
    this.setState({ search: data, images: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { images, showModal, largeImageURL, loading, page, error } =
      this.state;
    const { onImageClick, loadMore, closeModal } = this;
    return (
      <>
        <Searchbar onSubmit={this.onSubmitForm} />
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
  }
}

export default App;
