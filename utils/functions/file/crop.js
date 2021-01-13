export default function getCropped(file, width, height, crop) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const image = new Image();
        image.src = dataUrl;
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          // Set width
          if (width) {
            canvas.width = width;
          } else {
            canvas.width = image.width;
          }
          // Set height
          if (height) {
            canvas.height = height;
          } else {
            canvas.height = canvas.width * (image.height / image.width);
          }
          if (crop) {
            // If a crop is defined
            ctx.drawImage(
              image,
              crop.x,
              crop.y,
              crop.width,
              crop.height,
              0,
              0,
              canvas.width,
              canvas.height
            );
          } else {
            // If no crop is defined
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          }
          const result = canvas.toDataURL('image/jpeg');
          resolve(result);
        };
      };
    } else {
      reject();
    }
  });
}
