import { useState, useEffect } from 'react';

import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';

import { fetchImages } from '../api';

import { AppDiv } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isMoreBtn, setIsMoreBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImg, setCurrentImg] = useState({});

  const handleSubmit = newQuery => {
    if (query === newQuery) {
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const hendleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function getImg() {
      try {
        const imagesArr = await fetchImages(query, page);
        if (imagesArr.hits.length === 0) {
          setNotFound(true);
        }
        setImages(prevImages => [...prevImages, ...imagesArr.hits]);
        setIsMoreBtn(page < Math.ceil(imagesArr.totalHits / 12));
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImg();
  }, [query, page]);

  const handleOpenModal = image => {
    setShowModal(true);
    setCurrentImg(image);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentImg(null);
  };

  return (
    <AppDiv>
      <Searchbar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {error && !loading && <div>Ops! There was an error!</div>}
      <ImageGallery images={images} onClickOpen={handleOpenModal} />
      {notFound && <div>`Sorry! There are no pictures ${query}!`</div>}
      {isMoreBtn && <Button onClick={hendleLoadMore} />}
      {showModal && (
        <Modal image={currentImg} onCloseModal={handleCloseModal} />
      )}
    </AppDiv>
  );
};
