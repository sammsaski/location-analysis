import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import HorizontalScrollView from './components/HorizontalScrollView';
import { ImageBackground } from 'react-native-web';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  // camera ref to access Camera
  const cameraRef = useRef(null);

  /**
   * called to take the photo
   */
  const takePhoto = async () => {
    if (cameraRef) {
      console.log("in take picture");
      try {
        let photo = await cameraRef.current.takePictureAsync({
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

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.flipButtonContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
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
            }}
           >
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
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
    margin: 20
  },

  cameraCaptureButton: {
    flex: 0.5,
    alignSelf: 'flex-end',
    alignItems: 'center',
    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').width / 5,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#4169e1'
  },

  flipButtonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    margin: 20
  },

  flipButton: {
    flex: 0.1,
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
