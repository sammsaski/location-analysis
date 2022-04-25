import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import HorizontalScrollView from './components/HorizontalScrollView';
import CameraPage from './components/CameraPage';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);

  // camera ref to access Camera
  const cameraRef = useRef(null);

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
    <CameraPage 
      camera={cameraRef}
    >
    </CameraPage>
  );
}

const styles = StyleSheet.create({

});
