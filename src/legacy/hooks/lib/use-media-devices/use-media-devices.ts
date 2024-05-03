import { useEffect, useState } from 'react';

export interface UseMediaDevicesProps {}

export interface UseMediaDevices {
  devices: MediaDeviceInfo[];
  getUserMedia: (constraints?: MediaStreamConstraints | undefined) => Promise<MediaStream>;
}

export function useMediaDevices(): UseMediaDevices {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    if (!navigator.mediaDevices) {
      console.log('enumerateDevices() not supported.');
    } else {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices: MediaDeviceInfo[]) => {
          setDevices(devices);
        })
        .catch((err) => {
          console.error(`${err.name}: ${err.message}`);
        });
    }
  }, []);

  return { devices, getUserMedia: (...arg) => navigator.mediaDevices.getUserMedia(...arg) };
}

export default useMediaDevices;
