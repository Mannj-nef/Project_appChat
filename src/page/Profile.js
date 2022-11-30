import React, { useEffect } from "react";
import { query, updateDoc, where } from "firebase/firestore";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import Form from "../components/form";
import Field from "../components/field";
import Label from "../components/lablel";
import InputControl from "../components/input";
import Button from "../components/button";
import { db } from "../firebase/firebase-config";
import { firebase_collection, TOAST_TYPE } from "../common ";
import { useAuthContext } from "../contexts/auth-context";
import InputFileUploadImage from "../components/input/InputFileUploadImage";
import useImageUpload from "../hooks/useImageUpload";
import { IconDelete } from "../components/icon";
import { generateKeywords } from "../firebase/services";

const Profile = () => {
  const { userInfo } = useAuthContext();
  const {
    control,
    formState,
    isSubmitting,
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      uid: "",
      displayName: "",
      phoneNumber: "",
      photoURL: "",
    },
  });

  const userAvatar = getValues("photoURL");

  const {
    imageUrlFile,
    handleSelectImage,
    handleRemoveImageFile,
    setImageUrlFile,
  } = useImageUpload();

  const updateDocFirebase = async (id, value) => {
    try {
      const docRef = doc(db, firebase_collection.USERS, id);
      await updateDoc(docRef, value);
      toast.success("update success", TOAST_TYPE);
    } catch (error) {
      toast.error(error.message, TOAST_TYPE);
    }
  };

  const handleUpdateProfile = async (values) => {
    const { uid, displayName } = values;
    const data = {
      ...values,
      keywords: generateKeywords(displayName),
    };
    updateDocFirebase(uid, data);
  };

  const handleRemoveImage = () => {
    const id = getValues("uid");
    try {
      handleRemoveImageFile();
      setImageUrlFile("");
      setValue("photoURL", "");

      updateDocFirebase(id, {
        photoURL: "",
      });
    } catch (error) {
      toast.error(error.message, TOAST_TYPE);
    }
  };

  // set value photoURL
  useEffect(() => {
    if (imageUrlFile) {
      setValue("photoURL", imageUrlFile);
    }
  }, [imageUrlFile, setValue]);

  // get and update data user
  useEffect(() => {
    if (!userInfo?.uid) return;
    const colRef = collection(db, firebase_collection.USERS);
    const queryUser = query(colRef, where("uid", "==", userInfo?.uid));

    const unsubscibed = onSnapshot(queryUser, (snapshot) => {
      const users = snapshot.docs.map((user) => ({
        uid: user?.id,
        displayName: user?.data()?.displayName,
        phoneNumber: user?.data()?.phoneNumber || "",
        photoURL: user?.data()?.photoURL,
      }));
      reset(...users);
    });
    return unsubscibed;
  }, [userInfo, reset]);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-[450px] p-10 rounded-xl bg-white">
        <h2 className="font-extrabold text-2xl mb-5 text-black27 text-center underline">
          Update Profile
        </h2>
        <Form
          handle={handleSubmit(handleUpdateProfile)}
          className="form-control"
        >
          <div className="group relative w-[100px] h-[100px] rounded-full">
            <InputFileUploadImage
              classImage="w-full h-full rounded-full object-cover"
              valueImage={imageUrlFile || userAvatar || ""}
              handlSelectImage={handleSelectImage}
            ></InputFileUploadImage>
            <button
              type="button"
              className="absolute bg-opacity-50 bg-white p-1 rounded-full text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block"
              onClick={handleRemoveImage}
            >
              <IconDelete className="w-5 h-5"></IconDelete>
            </button>
          </div>
          <Field>
            <Label htmlFor=" displayName" className="mb-5">
              Name
            </Label>
            <InputControl
              control={control}
              name="displayName"
              error={formState.errors?.displayName?.message}
              placeholder="Enter your Name..."
            ></InputControl>
          </Field>
          <Field>
            <Label htmlFor="phoneNumber" className="mb-5">
              Phone number
            </Label>
            <InputControl
              control={control}
              name="phoneNumber"
              error={formState.errors?.phoneNumber?.message}
              placeholder="Enter your Phone..."
            ></InputControl>
          </Field>

          <Button isLoading={isSubmitting}>Update</Button>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
