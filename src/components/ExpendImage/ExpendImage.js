import React from 'react';
import './ExpendImage.scss';

class ExpendImage extends React.Component {

    constructor(props){
        super(props);
    }

    render() {

        const showOrHideClassName = this.props.show ? 'expend-image display-block' : 'expend-image display-none';

        return (
            <div className={showOrHideClassName}>
                <section className='expend-image-main col-9'>
                    {this.props.children}
                    <button className='button-close-window' onClick={this.props.closeHandler}>x</button>
                </section>
            </div>
        );
    }
}

export default ExpendImage;