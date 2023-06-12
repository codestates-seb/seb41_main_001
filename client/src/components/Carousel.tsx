import React, { useState } from 'react';
import styled from 'styled-components';

interface CarouselProps {
  images: string[];
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: 1rem;
`;

const Slide = styled.img`
  width: 100%;
  height: 100%;
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: #ccc;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

const LeftArrow = styled(Arrow)`
  left: 20px;
`;

const RightArrow = styled(Arrow)`
  right: 20px;
`;

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    const nextSlide = currentSlide + 1;
    setCurrentSlide(nextSlide < images.length ? nextSlide : 0);
  };

  const handlePrev = () => {
    const prevSlide = currentSlide - 1;
    setCurrentSlide(prevSlide >= 0 ? prevSlide : images.length - 1);
  };

  return (
    <Container>
      <Slide src={images[currentSlide]} alt={`Slide ${currentSlide}`} />
      {images.length !== 1 ? (
        <>
          <LeftArrow onClick={handlePrev}>{'<'}</LeftArrow>
          <RightArrow onClick={handleNext}>{'>'}</RightArrow>
        </>
      ) : (
        ''
      )}
    </Container>
  );
};

export default Carousel;
