import {
  getStorage, ref as stRef, uploadBytesResumable, getDownloadURL,
} from 'firebase/storage';

import { firebaseApp } from './firebase';

export default class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) => new Promise((resolve, reject) => {
        /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
        // Create the file metadata
        console.log(file);
        // reader.readAsDataURL(file);
        const metadata = {
          contentType: 'image/jpeg',
        };
          // 取得上船的檔案名
        const updatefile = file;
        const newFileName = file.name;
        // 啟動storage
        const storage = getStorage(firebaseApp);
        // 指定檔案要放在storage的位址;
        const storageRef = stRef(storage, `files/${newFileName}`);
        const uploadTask = uploadBytesResumable(storageRef, updatefile, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
            switch (snapshot.state) {
              default: {
                break;
              }
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads

            switch (error.code) {
              default: {
                break;
              }
              case 'storage/unauthorized':
                reject(new Error("User doesn't have permission to access the object"));
                break;

              case 'storage/canceled':
                reject(new Error('User canceled the upload'));
                break;

              case 'storage/unknown':
                reject(new Error('Unknown error occurred, inspect error.serverResponse'));
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              resolve({
                default: downloadURL,
              });
            });
          },
        );
      }),
    );
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}
