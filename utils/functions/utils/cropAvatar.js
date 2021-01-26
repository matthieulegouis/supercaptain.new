// Generate the cropped image (size 480px * 480px)
// Create the image with a src of the base64 string
function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}

export default async function getCroppedAvatar(base64, crop) {
  const image = await createImage(base64);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // setting canvas width & height allows us to resize from the original image resolution
  canvas.width = 480;
  canvas.height = 480;

  ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height);

  // Return blob
  return canvas.toDataURL('image/jpeg');
}
