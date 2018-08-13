import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      filterName: ''
    };

    this.cliceHendlerFilter = this.cliceHendlerFilter.bind(this);
    this.clickHendlerClone = this.clickHendlerClone.bind(this);
  }

  calcImageSize() {
    const {galleryWidth} = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
    this.setState({
      size
    });
  }



  componentDidMount() {
    this.calcImageSize();
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  cliceHendlerFilter(){

    const filterNames = ['filter-grace', 'filter-contrast', 'filter-darken', 'filter-invert', 'filter-sepia'];
    const max = 5;
    const filterIdx = Math.floor(Math.random() * max);
    this.setState({filterName: filterNames[filterIdx]});
  }

  clickHendlerClone(){
    this.props.cloneImage(this.props.dto);
  }

  render() {

    return (
      <div
        className={`image-root ${this.state.filterName}`}
        style={{
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
          width: this.state.size + 'px',
          height: this.state.size + 'px'
        }}
        >
        <div>
          <FontAwesome className="image-icon" name="clone" title="clone" onClick={this.clickHendlerClone}/>
          <FontAwesome className="image-icon" name="filter" title="filter" onClick={this.cliceHendlerFilter}/>
          <FontAwesome className="image-icon" name="expand" title="expand"/>
        </div>
      </div>
    );
  }
}

export default Image;
