# react-native-tesseractocr
tesseract ocr wrapper for react-native...

it Uses - [Tesseract4Android](https://github.com/adaptech-cz/Tesseract4Android) for android.
 [Tesseract-OCR-iOS](https://github.com/gali8/Tesseract-OCR-iOS) for ios (not implemented yet !)

It can recognize text from remote image(url)
also support multi-language recognization.


https://github.com/Devichand1/react-native-tesseractocr/assets/57847076/efc378b9-9d57-454f-8cf8-5d4571790fd2



For multi-language 
Just Use '@' between two languages 
Examples -  for Hindi and english - 'hin@eng'
## Installation

```sh
npm install @devinikhiya/react-native-tesseractocr
```

## Usage

```js
import TesseractOcr, { useEventListener } from '@devinikhiya/react-native-tesseractocr';

// ...

  try {
      const recognizedText = await TesseractOcr.recognize(
        path,
        'eng',
        {},
      );
      console.log('text is', recognizedText);
    } catch (error) {
      console.log('error is', error);
    }
```


```js
  //progess listener for tesseractocr JOB
  useEventListener('onProgressChange', (p) => {
    setprogress(p.percent / 100);
  });
  ```

## TessData
   Strict requirement on language files existing in a referenced "tessdata" folder. 
   For Android

   Save TessData Files into - android/app/src/main/assets/tessdata

   exaample -  for the language english -  android/app/src/main/assets/tessdata/eng.traineddata
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

