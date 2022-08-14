# react-native-tesseractocr
tesseract ocr wrapper for react-native...
It can recognize text from remote image(url)
also support multi-language recognization.


<h2>For multi-language </h2>
Just Use '@' between two languages 
Examples -  for Hindi and english - 'hin@eng'
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
  //progess listener for tesseractocr JOB
  useEventListener('onProgressChange', (p) => {
    setprogress(p.percent / 100);
  });
  ```
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

