import { storage } from '../../../firestore';

// Path should contain the name of the file
export default function uploadFile(file, path) {
  return new Promise((resolve, reject) => {
    storage
      .child(path)
      .put(file)
      .then((response) => {
        storage
          .child(response.metadata.fullPath)
          .getDownloadURL()
          .then((url) => resolve(url));
      })
      .catch((error) => reject(error));
  });
}
