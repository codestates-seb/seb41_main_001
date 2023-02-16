/* eslint-disable react/prop-types */
import styled from 'styled-components';

interface ImageContainerProps {
  src: string;
}

const ImageCon = styled.div`
  width: auto;
  height: auto;
  > img {
    width: 100%;
    height: 100%;
  }
  margin-bottom: 1rem;
`;

const ImageContainer: React.FC<ImageContainerProps> = ({ src }) => (
  <ImageCon>
    <img src={src} alt="" />
  </ImageCon>
);

export default ImageContainer;
