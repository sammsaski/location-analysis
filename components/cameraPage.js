import React, { useState, useEffect, useRef, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { ImageBackground, Touchable } from 'react-native-web';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import PicturePage from './PicturePage';

import CameraContext from './Context';

/**
 * We'll define the following props for the CameraPage component
 *    Props:
 *      type (Camera.Constants.Type.front | Camera.Constants.Type.back): refers to which camera of the edge device is active
 *      showCamera (bool): whether or not the camera is showing
 *      camera (ref): a reference to the camera
 */


export default class CameraPage extends Component {
    state = {
        useFrontCamera: Camera.Constants.Type.front,
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
        this.state.useFrontCamera = (
            this.state.useFrontCamera === Camera.Constants.Type.front
                ? Camera.Constants.Type.back
                : Camera.Constants.Type.front
        );
        this.forceUpdate(); // this forces a re-render of the component.
    }

    render() {
        /**
         * Call to take the photo
         */
        const takePhoto = async () => {
            if (this.props.camera) {
                console.log("in take picture");
                try {
                    console.log(`showCamera (before) : ${this.state.showCamera}`)
                    const width = Dimensions.get('window').width;
                    const height = Dimensions.get('window').height;
                    let photo = await this.props.camera.current.takePictureAsync({
                        allowsEditing: true,
                        aspect: [width,height],
                        quality: 1,
                    });

                    // Ensure that we aren't flipping the photo horizontally when using front-camera.
                    if (this.state.useFrontCamera === Camera.Constants.Type.front) {
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
                    console.log(`showCamera (after) : ${this.state.showCamera}`)
                    return photo
                } catch (e) {
                    console.log(e);
                }
            }
        }

        return (
            // this.showCamera === true
            // ?
            <View style={styles.container}>
                { this.state.showCamera === true ? (
                    <Camera styles={styles.camera} type={this.state.useFrontCamera} ref={this.props.camera}>
                    <View style={styles.flipButtonContainer}>
                        <TouchableOpacity
                            style={styles.flipButton}
                            onPress={() => {
                                this.changeCamera()
                                Alert.alert("DEBUG", JSON.stringify(this.state.showCamera))
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
                                // Alert.alert("DEBUG", JSON.stringify(this.state.photo));
                            }}>
                        </TouchableOpacity>
                    </View>
                    </Camera>) : (
                    // <PicturePage style={styles.picture} photo={this.state.photo}>
                    //     {/* <View style={styles.cancelButtonContainer}>
                    //         <TouchableOpacity
                    //             style={styles.cancelButton}
                    //             onPress={async () => {
                    //                 this.cancelShowImage();
                    //             }}
                    //         />
                    //     </View>

                    //     <View style={styles.cameraCaptureButtonContainer}>
                    //         <TouchableOpacity
                    //             style={styles.cameraCaptureButton}
                    //             onPress={async () => {
                    //                 Alert.alert("DEBUG", JSON.stringify("true"))
                    //             }}>
                    //         </TouchableOpacity>
                    //     </View> */}
                    // </PicturePage>)}
                    <View style={styles.photoContainer}>
                        <Image
                            source={this.state.photo}
                            style={styles.photo} // need to add styles.photo
                        />

                        <TouchableOpacity
                            style={styles.cancelButtonContainer}
                            onPress={async () => {
                                // Alert.alert("DEBUG", JSON.stringify("Hello world!"))
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
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'red',
        borderWidth: 3,
        borderRadius: 50
    },
    
    cameraCaptureButtonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 20,
        flexShrink: 0,
        minWidth: Dimensions.get('window').width * 0.9,
        minHeight: Dimensions.get('window').height * 0.8,
        zIndex: 100 
    },

    cameraCaptureButton: {
        flex: 0.5,
        alignSelf: 'flex-end',
        alignItems: 'center',
        width: Dimensions.get('window').width / 10, 
        height: Dimensions.get('window').height / 10,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#4169e1',
        marginVertical: 50
    },

    cancelButtonContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
        flexDirection: 'column',
        margin: 50,
        borderColor: 'orange',
        borderWidth: 3,
        borderRadius: 50,
        width: Dimensions.get('window').width / 2, 
        height: Dimensions.get('window').height / 15,
        zIndex: 10
    },

    cancelButton: {
        flex: 1,
        alignSelf: 'flex-start',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#4169e1'
    },

    flipButtonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        marginRight: 20,
        marginTop: 50
    },

    flipButton: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center'
    },

    camera: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        borderColor: 'green',
        borderWidth: 3,
        borderRadius: 50
    },

    photoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'purple',
        borderColor: 'purple',
        borderWidth: 3
    },
});
