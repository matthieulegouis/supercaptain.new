import { storage } from '../../../firestore';
import b64toBlob from './b64toBlob';

// Transform file to base64
// Path should contain the name of the file
export default function uploadImage(base64, path) {
  return new Promise((resolve, reject) => {
    const blob = b64toBlob(base64);
    storage
      .child(path)
      .put(blob)
      .then((response) => {
        storage
          .child(response.metadata.fullPath)
          .getDownloadURL()
          .then((url) => resolve(url));
      })
      .catch((error) => reject(error));
  });
}
