import React, { Component } from 'react';
import { Modal, ToastAndroid, Text } from 'react-native';
import { TOUCHABLE_STATE } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
import ImageViewer from 'react-native-image-zoom-viewer';

class CustomImageViewer extends Component {
    render() {
        // console.log('I am here')
        const { image, visible, closeModal } = this.props
        // console.log('IMG: ', image)
        const images = image.uri ? [{ url: image.uri }] : [{ url: image }]
        ToastAndroid.show('Pull down to close.', ToastAndroid.LONG)
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