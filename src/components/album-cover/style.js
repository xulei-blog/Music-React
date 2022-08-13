import styled from 'styled-components';

export const AlbumCoverWrapper = styled.div`
  width: ${props => props.width + 'px'};

  .album-image {
    position: relative;
    width: ${props => props.width + 'px'};
    height: ${props => props.size + 'px'};
    overflow: hidden;
    margin: 15px 0 7px;

    img {
      width: ${props => props.size + 'px'};
      height: 100%;
    }

    .cover {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-position:  0 ${props => props.bgp + 'px'};
      text-indent: -9999px;
    }
  }

  .album-info {
    font-size: 12px;
    width: 100%;
    .name {
      color: #000;
    }
    .artist {
      color: #666;
    }
  }
`