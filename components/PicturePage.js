import React, { useState, useEffect, useRef, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { ImageBackground, Touchable } from 'react-native-web';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

/**
 * We'll define the following props for the CameraPage component
 *    Props:
 *      type (Camera.Constants.Type.front | Camera.Constants.Type.back): refers to which camera of the edge device is active
 *      showCamera (bool): whether or not the camera is showing
 *      camera (ref): a reference to the camera
 */


export default class PicturePage extends Component {
    render() {
        /**
         * Call to take the photo
         */

        return(
            <View style={styles.container}>
                <Image
                    source={this.props.photo}
                    style={styles.photo}
                />

                <TouchableOpacity
                    style={styles.testContainer}
                    onPress={async () => {
                        Alert.alert("DEBUG", JSON.stringify("Hello world!"))
                    }}>
                    <Text style={styles.text}>CANCEL</Text>
                </TouchableOpacity>
            </View>
            
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        borderColor: 'green',
        borderRadius: 50,
        borderWidth: 3,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    testContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        alignItems: 'center',
        margin: 50,
        color: "purple",
        borderColor: 'purple',
        borderWidth: 3,
        zIndex: 10,
        width: Dimensions.get('window').width / 2, 
        height: Dimensions.get('window').height / 15,
    },

    text: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: "purple",
        borderColor: 'purple',
        borderWidth: 3,
    },
    
    // cameraCaptureButtonContainer: {
    //     flex: 1,
    //     backgroundColor: 'transparent',
    //     justifyContent: 'center',
    //     flexDirection: 'row',
    //     margin: 20,
    //     flexShrink: 0,
    //     minWidth: Dimensions.get('window').width * 0.9,
    //     minHeight: Dimensions.get('window').height * 0.8
    // },

    // cameraCaptureButton: {
    //     flex: 0.5,
    //     alignSelf: 'flex-end',
    //     alignItems: 'center',
    //     width: Dimensions.get('window').width / 10, 
    //     height: Dimensions.get('window').height / 10,
    //     borderRadius: 50,
    //     borderWidth: 3,
    //     borderColor: '#4169e1',
    //     marginVertical: 50
    // },

    photo: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',
        zIndex: 5,
    }
});
