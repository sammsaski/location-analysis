import React, { useState, useEffect, useRef, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { ImageBackground, Touchable } from 'react-native-web';

/**
 * We'll define the following props for the CameraPage component
 *    Props:
 *      type (Camera.Constants.Type.front | Camera.Constants.Type.back): refers to which camera of the edge device is active
 *      showCamera (bool): whether or not the camera is showing
 *      camera (ref): a reference to the camera
 */

export default class CameraPage extends Component {
    render() {
        /**
         * Call to take the photo
         */
        const takePhoto = async () => {
            if (this.props.camera) {
                console.log("in take picture");
                try {
                    let photo = await this.props.camera.current.takePictureAsync({
                        allowsEditing: true,
                        aspect: [4,3],
                        quality: 1,
                    });
                    return photo
                } catch (e) {
                    console.log(e);
                }
            }
        }

        return(
            <View style={styles.container}>
                <Camera styles={styles.camera} type={this.props.type} ref={this.props.camera}>
                    <View style={styles.flipButtonContainer}>
                        <TouchableOpacity
                            style={styles.flipButton}
                            onPress={() => {
                                setType(
                                    this.props.type === Camera.Constants.Type.back // figure out how to change this bc we can't use setType
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <Text style={styles.text}> Flip </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cameraCaptureButtonContainer}>
                        <TouchableOpacity
                            style={styles.cameraCaptureButton}
                            onPress={async () => {
                                const r = await takePhoto();
                                Alert.alert("DEBUG", JSON.stringify(r))
                            }}>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    cameraCaptureButtonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 20,
        flexShrink: 0,
        minWidth: Dimensions.get('window').width * 0.9,
        minHeight: Dimensions.get('window').height * 0.8
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

    text: {
        fontSize: 18,
        color: 'red'
    },

    camera: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});
