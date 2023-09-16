import {
  View,
  Text,
  Button,
  Image,
  Clipboard,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import TesseractOcr, {
  useEventListener,
} from '@devinikhiya/react-native-tesseractocr';

const defaultPickerOptions = { cropping: true };
export default function TessrectModule() {
  const [imgSrc, setimgSrc] = useState(null);
  const [resultText, setresultText] = useState();
  const [progress, setprogress] = useState(null);
  //progess listener for tessractocr JOB
  useEventListener('onProgressChange', (p) => {
    setprogress(p.percent / 100);
  });
  useEffect(() => {
    //recoginze text from remote image url
    // recognizeTextFromImage('https://i.stack.imgur.com/0Jl54.png');
  }, []);

  const recognizeTextFromImage = async (path) => {
    console.log('recognizeTextFromImage');
    try {
      const recognizedText = await TesseractOcr.recognize(path, 'eng', {});
      console.log('test is', recognizedText);
      setresultText(recognizedText);
    } catch (error) {
      // error is [Error: java.io.FileNotFoundException: tessdata/eng.traineddata]
      console.log('error is', error);
    }
  };
  const recognizeFromCamera = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openCamera(options);
      setimgSrc(image.path);
      setprogress(null);
      setresultText(null);
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };
  const recognizeFromPicker = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openPicker(options);
      setimgSrc(image.path);
      setprogress(null);
      setresultText(null);
      await recognizeTextFromImage(image.path);
      setimgSrc(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };
  const handleCopy = () => {
    Clipboard.setString(resultText);
  };
  return (
    <ScrollView
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          marginTop: 20,
          fontSize: 18,
          fontWeight: '800',
          textAlign: 'center',
        }}
      >
        @devinikhiya/react-native-tesseractocr
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Pressable
          style={styles.featureItem}
          onPress={() => recognizeFromCamera()}
          android_ripple={{
            color: 'cyan',
          }}
        >
          <Text style={{ textAlign: 'center', color: '#444', fontSize: 14 }}>
            Capture
          </Text>
        </Pressable>
        <Pressable
          onPress={() => recognizeFromPicker()}
          style={styles.featureItem}
          android_ripple={{
            color: 'cyan',
          }}
        >
          <Text style={{ textAlign: 'center', color: '#444', fontSize: 14 }}>
            Gellery
          </Text>
        </Pressable>
      </View>
      {imgSrc && (
        <Image
          source={{ uri: imgSrc }}
          style={{
            width: 200,
            resizeMode: 'contain',
            marginVertical: 20,
            alignItems: 'center',
            alignSelf: 'center',
            height: 200,
          }}
        />
      )}
      {!resultText && progress ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        >
          <ActivityIndicator size={'large'} color={'cyan'} />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
            }}
          >
            Progress - {progress}%
          </Text>
        </View>
      ) : null}
      {resultText && (
        <View
          style={{
            marginBottom: 50,
          }}
        >
          <Text style={{ textAlign: 'center', fontSize: 22 }}>Result</Text>
          <Text
            style={{
              backgroundColor: '#fff',
              borderColor: '#888',
              borderTopRightRadius: 8,
              borderTopLeftRadius: 8,
              padding: 20,
              textAlign: 'center',
              fontSize: 14,
            }}
          >
            {resultText}
          </Text>
          <TouchableOpacity
            onPress={() => handleCopy()}
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: '#c3c3c3',
              borderRadius: 8,
              alignSelf: 'center',
            }}
            title="Copy Text"
          >
            <Text
              style={{
                color: '#000',
                fontWeight: '600',
                paddingHorizontal: 30,
              }}
            >
              Copy Text
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  featureItem: {
    flex: 1,
    padding: 10,
    margin: 5,
    marginTop: 50,
    borderRadius: 12,
    flexDirection: 'column',
    alignContent: 'center',
    backgroundColor: 'lightgrey',
  },
});
