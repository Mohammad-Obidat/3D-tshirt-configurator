export const reader = (file: File): Promise<string | ArrayBuffer> =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result) {
        resolve(fileReader.result);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
    fileReader.readAsDataURL(file);
  });
