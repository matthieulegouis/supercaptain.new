import firebase from 'firebase/app';

export default function deleteImage(url) {
  return new Promise((resolve, reject) => {
    const refImage = firebase.storage().refFromURL(url);
    refImage
      .delete()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
