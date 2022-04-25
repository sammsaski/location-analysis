import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

/**
 * We'll define the following props for the CameraPage component
 *    Props:
 *      type (Camera.Constants.Type.front | Camera.Constants.Type.back): refers to which camera of the edge device is active
 *      showCamera (bool): whether or not the camera is showing
 *      camera (ref): a reference to the camera
 */


export default class CameraPage extends Component {
    state = {
        cameraChoice: Camera.Constants.Type.front,
        showCamera: true,
        photo: null,
    }

    cancelShowImage() {
        /**
         * Stop showing image preview and show camera
         */
        this.state.showCamera = true;
        this.forceUpdate();
    }

    changeCamera() {
        /**
         * Flip the camera
         */
        this.state.cameraChoice = (
            this.state.cameraChoice === Camera.Constants.Type.front
                ? Camera.Constants.Type.back
                : Camera.Constants.Type.front
        );

        // Re-render component after flipping camera
        this.forceUpdate();
    }

    render() {
        /**
         * Call to take the photo
         */
        const takePhoto = async () => {
            if (this.props.camera) {
                // console.log("in take picture");
                try {
                    // console.log(`showCamera (before) : ${this.state.showCamera}`)
                    const width = Dimensions.get('window').width;
                    const height = Dimensions.get('window').height;
                    let photo = await this.props.camera.current.takePictureAsync({
                        allowsEditing: true,
                        aspect: [width,height],
                        quality: 1,
                    });

                    // Ensure that we aren't flipping the photo horizontally when using front-camera.
                    if (this.state.cameraChoice === Camera.Constants.Type.front) {
                        photo = await manipulateAsync(
                            photo.localUri || photo.uri,
                            [
                                { rotate: 180},
                                { flip: FlipType.Vertical },
                            ],
                            { compress: 1, format: SaveFormat.PNG }
                        );
                    }

                    this.state.showCamera = false;
                    // console.log(`showCamera (after) : ${this.state.showCamera}`)
                    return photo
                } catch (e) {
                    console.log(e);
                }
            }
        }

        return (
            <View style={styles.container}>
                { this.state.showCamera === true ? (
                    /**
                     * If Camera showing, display camera
                     */
                    <Camera styles={styles.camera} type={this.state.cameraChoice} ref={this.props.camera}>
                    <View style={styles.flipButtonContainer}>
                        <TouchableOpacity
                            style={styles.flipButton}
                            onPress={() => {
                                this.changeCamera()
                            }}>
                            <Text style={styles.text}> Flip </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cameraCaptureButtonContainer}>
                        <TouchableOpacity
                            style={styles.cameraCaptureButton}
                            onPress={async () => {
                                this.state.photo = await takePhoto();
                                this.forceUpdate();
                            }}>
                        </TouchableOpacity>
                    </View>
                    </Camera>) : (
                    /**
                     * If Camera not showing, then display photo
                     */
                    <View style={styles.photoContainer}>
                        <Image
                            source={this.state.photo}
                            style={styles.photo}
                        />

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={async () => {
                                this.state.showCamera = true;
                                this.forceUpdate();
                            }}>
                            <Text style={styles.text}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        // borderColor: 'red',
        // borderWidth: 3,
        // borderRadius: 50
    },
    
    cameraCaptureButtonContainer: {
        minWidth: Dimensions.get('window').width * 0.9,
        minHeight: Dimensions.get('window').height * 0.8,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        margin: 20,
        backgroundColor: 'transparent',
    },

    cameraCaptureButton: {
        width: Dimensions.get('window').width / 10,
        height: Dimensions.get('window').height / 10,
        flex: 0.5,
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginVertical: 50,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#4169e1',
    },

    cancelButton: {
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 15,
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        alignItems: 'center',
        margin: 50,
        borderColor: 'red',
        borderWidth: 3,
        borderRadius: 50,
        backgroundColor: 'transparent',
        zIndex: 10 // MUST
    },

    flipButtonContainer: {
        flex: 1,
        flexDirection: 'column',
        marginRight: 20,
        marginTop: 50,
        backgroundColor: 'transparent',
    },

    flipButton: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center'
    },

    camera: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        borderColor: 'green',
        borderWidth: 3,
        borderRadius: 50
    },

    photoContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: 'purple',
        borderRadius: 50,
        borderWidth: 3
    },

    photo: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        zIndex: 5
    },

    text: {
        color: 'red',
        justifyContent: 'center',
        alignSelf: 'center',
        // borderColor: 'purple',
        // borderWidth: 3
    },
});
