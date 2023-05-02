import { useState,useEffect } from 'react';
import {  getSearch } from './services/img.api';
import { SearchBar } from './Searchbar';
import { Button } from './Button';
import { Loader } from './Loader';
import { ModalApp } from './Modal';
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery'

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [empty, setEmpty] = useState(false);
  

   const getFunc = (text, page) => {
    setLoading(true);
    setEmpty(false);
    getSearch(text, page)
      .then(resp => resp.json())
      .then(data => {
        if (data && data.hits.length === 0) {
          setEmpty(true);
        }

        setImages(prevState => [...prevState, ...data.hits]);
        setTotal(data.total);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
   };
  
  useEffect(() => {
    getFunc(search,page)
  },[search,page])
  


  

  const openModal = (largeImageURL, alt) => {
    setShowModal(true);
    setLargeImageUrl(largeImageURL);
    setAlt(alt)
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageUrl('');
    setAlt('');
  };

  const handleSubmit = search => {
    setSearch(search);
    setImages([]);
    setPage(1);
    setTotal(1);
    setLoading(false);
    setError(null);
    setEmpty(false)

  };

 const handleClickLoad = () => {
  setPage(page + 1);
};


    return (
      <div>
         <Toaster
          toastOptions={{
            duration: 1500,
          }}
        />
        <SearchBar handleSubmit={handleSubmit} />
        {error && (
          <h2>Something went wrong: ({error})!</h2>
        )}
        <ImageGallery
          toggleModal={openModal}
          images={images}
        />
        {loading && <Loader />}
        {empty && (
          <h2>Sorry. There are no images...</h2>
        )}
        {total / 12 > page && (
          <Button clickLoad={handleClickLoad} />
        )}
        {showModal && (
          <ModalApp onClose={closeModal}>
            <img
              src={largeImageURL}
              alt={alt}
            />
          </ModalApp>
        )}
      </div>
    );
  }

