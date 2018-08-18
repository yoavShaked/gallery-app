import React from 'react';
import Gallery from './../Gallery/index';
import './GalleryMain.scss';
import ExpendImage from './../ExpendImage/ExpendImage';
import Image from './../Image/Image';
import { DebounceInput } from 'react-debounce-input';

class GalleryMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expendImageDto: {},
            tag: 'art',
            show: false
        };
    }

    hideImage = () => {
        this.setState({ show: false });
    };

    expendImageEvent = (imageDto) => {

        this.setState({ expendImageDto: imageDto });
        this.setState({ show: true });
    };

    handleChang = (event) => {
        this.setState({ tag: event.target.value })
    };

    render() {
        return (
            <main className='gallery-main-root'>
                <div>
                    <div className='gallery-main-header'>
                        <h2>Flickr Gallery</h2>
                        <DebounceInput
                            className="gallery-main-input"
                            debounceTimeout={500}
                            onChange={this.handleChang}
                            value={this.state.tag} />
                    </div>
                    <Gallery
                        tag={this.state.tag}
                        expendImageCallback={this.expendImageEvent} />
                    <ExpendImage show={this.state.show} closeHandler={this.hideImage}>
                        <Image key='expend-image' dto={this.state.expendImageDto} visibleIcones={false} className='expend-image'/>
                    </ExpendImage>
                </div>
            </main>
        );
    }
}

export default GalleryMain;