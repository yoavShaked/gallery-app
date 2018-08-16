import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Image from '../Image';
import './Gallery.scss';

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      galleryWidth: this.getGalleryWidth()
    };
  }

  getGalleryWidth() {
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }

  getImages(tag) {
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&format=json&safe_search=1&nojsoncallback=1`;
    const baseUrl = 'https://api.flickr.com/';
    axios({ url: getImagesUrl, baseURL: baseUrl, method: 'GET' })
      .then(res => res.data)
      .then(res => {
        if (res && res.photos && res.photos.photo && res.photos.photo.length > 0) {
          this.setState(previousState => ({
            images: [
              ...previousState.images,
              ...res.photos.photo
            ]
          }));
        }
      });
  }

  componentDidMount() {

    window.addEventListener('scroll', this.onScroll, false);
    this.getImages(this.props.tag);
    this.setState({ galleryWidth: document.body.clientWidth });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  componentWillReceiveProps(props) {
    this.getImages(props.tag);
  }

  addCloneImage = (key) => {

    let cloneImage = null;

    for (var i = 0; i < this.state.images.length; i++) {
      if (key === this.state.images[i]) {
        cloneImage = this.state.images[i];
        break;
      }
    }

    if (cloneImage != null) {

      let newImages = this.state.images
      newImages.push(cloneImage);
      this.setState({ images: newImages });
    }
  }

  onScroll = () => {

    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight) && this.state.images.length > 0) {
      this.getImages(this.props.tag);
    }
  }

  render() {
    return (
      <div>
        <div className='gallery-root'>
          {this
            .state
            .images
            .map((dto, index) => {
              return <Image
                key={`image-${index}`}
                dto={dto}
                galleryWidth={this.state.galleryWidth}
                cloneImage={this.addCloneImage}
                expendImage={this.props.expendImageCallback}
                visibleIcones={true} />;
            })}
        </div>
      </div>
    );
  }
}

export default Gallery;
