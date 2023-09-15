import { useEffect } from "react";
import { NativeModules, DeviceEventEmitter,Platform } from "react-native";

const LINKING_ERROR =
  `The package 'react-native-tessractocr' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

export function useEventListener(eventType:string, listener:any) {
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(eventType, listener);
    return () => {
      subscription.remove();
    };
  });
}

const TesseractOcr = NativeModules.TesseractOcr  ? NativeModules.TesseractOcr  : new Proxy(
  {},
  {
    get() {
      throw new Error(LINKING_ERROR);
    },
  }
);

export default TesseractOcr;