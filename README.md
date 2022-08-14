# react-native-tesseractocr
tesseract ocr wrapper for react-native...

## Installation

```sh
npm install react-native-tesseractocr
```

## Usage

```js
import TesseractOcr, { useEventListener } from 'react-native-tessractocr';

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
  //progess listener for tessractocr JOB
  useEventListener('onProgressChange', (p) => {
    setprogress(p.percent / 100);
  });
  ```
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
