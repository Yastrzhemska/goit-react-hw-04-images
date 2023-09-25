import { useEffect } from 'react';
import { Overlay, ModalDiv } from './Modal.styled';

export const Modal = ({ image, onCloseModal }) => {
  useEffect(() => {
    const handleKeyClose = evt => {
      if (evt.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyClose);

    return () => {
      window.removeEventListener('keydown', handleKeyClose);
    };
  }, [onCloseModal]);

  const handleClick = evt => {
    if (evt.target === evt.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <Overlay onClick={handleClick}>
      <ModalDiv>
        <img src={image.largeImageURL} alt={image.tag} />
      </ModalDiv>
    </Overlay>
  );
};
