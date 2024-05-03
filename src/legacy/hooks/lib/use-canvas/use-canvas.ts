export interface UseCanvas {
  capture: (deviceId?: string, filename?: string, scale?: number) => void;
}

export function useCanvas(): UseCanvas {
  const download = (data: string, filename: string) => {
    const link = document.createElement('a');
    link.download = 'filename.png';
    link.href = data;
    link.click();
  };

  const capture = (deviceId = '', filename = 'test.png', scale = 1) => {
    const video = document.getElementById(deviceId) as HTMLVideoElement;

    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    const context = canvas.getContext('2d');

    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

    download(image, filename);
  };

  return { capture };
}

export default useCanvas;
