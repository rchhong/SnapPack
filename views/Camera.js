import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';

export default class CameraScene extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.showImageSelector.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Upload </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  showImageSelector()
  {
    const options = {
        title: 'Select Picture',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          const requestData = new FormData();
          requestData.append("photo", {
            name: "image.jpg",
            type: "image/jpg",
            uri: source.uri
          });
    
          fetch("http://10.147.144.67:5000/", {
            method: "POST",
            body: requestData,
          })
            .then(response => response.json())
            .then(response => {
              let textTitle = JSON.stringify(this.props.navigation.getParam('textTitle', ""));
              let textNotes = JSON.stringify(this.props.navigation.getParam('textNotes', ""));
              this.props.navigation.navigate('Results', {"results" : response.results, textTitle, textNotes})
              console.log("upload success", response);
              alert("Upload success!");
            })
            .catch(error => {
              console.log("upload error", error);
              alert("Upload failed!");
            });

        }
      });
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      //console.log(data.uri);

      const requestData = new FormData();
      requestData.append("photo", {
        name: "image.jpg",
        type: "image/jpg",
        uri: data.uri
      });

      fetch("http://10.147.144.67:5000/", {
        method: "POST",
        body: requestData,
      })
        .then(response => response.json())
        .then(response => {
          let textTitle = JSON.stringify(this.props.navigation.getParam('textTitle', ""));
          let textNotes = JSON.stringify(this.props.navigation.getParam('textNotes', ""));
          this.props.navigation.navigate('Results', {"results" : response.results, textTitle, textNotes})
          console.log("upload success", response);
          alert("Upload success!");
        })
        .catch(error => {
          console.log("upload error", error);
          alert("Upload failed!");
        });
    }   
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});