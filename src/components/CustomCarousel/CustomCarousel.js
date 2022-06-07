import react from 'react';
import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';

const CarouselStyled = styled(Carousel)`
  .rec-arrow-right:hover,
  .rec-arrow-left:hover,
  .rec-arrow-right:focus,
  .rec-arrow-left:focus {
    background-color: #fc2d22;
  }
  .rec-arrow-right:disabled,
  .rec-arrow-left:disabled {
    visibility: hidden;
  }
`;

const CustomCarousel = ({ children, itemsToShow }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <CarouselStyled
        pagination={false}
        {...settings}
        itemsToShow={itemsToShow}
      >
        {children}
      </CarouselStyled>
    </>
  );
};

export default CustomCarousel;
