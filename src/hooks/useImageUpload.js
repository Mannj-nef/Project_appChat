import { uuidv4 } from "@firebase/util";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TOAST_TYPE } from "../common ";

function useImageUpload() {
  const [imageUrlFile, setImageUrlFile] = useState("");
  const [imageName, setImageName] = useState("");
  const [idUid, setIdUid] = useState("");
  const [progressImage, setProgressImage] = useState(0);

  const idUuid = uuidv4();
  useEffect(() => {
    setIdUid(idUuid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectImage = (e) => {
    const fileImage = e.target.files[0];
    // const imageUrl = URL.createObjectURL(fileImage);

    if (fileImage) {
      handleUpLoadImage(fileImage);
    }
  };

  const handleRemoveImageFile = () => {
    const storage = getStorage();
    const imageRef = ref(storage, `images/${imageName + idUid}`);
    deleteObject(imageRef)
      .then(() => {
        setImageUrlFile("");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };

  const handleUpLoadImage = (file) => {
    const storage = getStorage();
    setImageName(file.name);

    const storageRef = ref(storage, "images/" + file.name + idUid);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgressImage(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            return;
        }
      },
      (error) => {
        toast.error(error.message, TOAST_TYPE);
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageUrlFile(downloadURL);
        });
      }
    );
  };

  return {
    imageUrlFile,
    handleSelectImage,
    handleRemoveImageFile,
    progressImage,
    setImageUrlFile,
  };
}

export default useImageUpload;
