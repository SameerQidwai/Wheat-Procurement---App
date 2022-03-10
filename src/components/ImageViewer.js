import React, { Component } from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

class CustomImageViewer extends Component {
    render() {
        console.log('I am here')
        const { image, visible, closeModal } = this.props
        console.log('IMG: ', image)
        var images = [{
            url: image
        }]
        return (
            <Modal visible={visible} transparent={true}>
                <ImageViewer
                    imageUrls={images}
                    enableSwipeDown={true}
                    onSwipeDown={() => { closeModal() }}
                />
            </Modal>
        )
    }
}

export default CustomImageViewer;