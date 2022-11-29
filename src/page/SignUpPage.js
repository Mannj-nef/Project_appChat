import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  firebase_collection,
  router_link,
  TOAST_TYPE,
  validate,
} from "../common ";
import Image from "../module/login/Image";
import { auth } from "../firebase/firebase-config";
import { toast } from "react-toastify";
import FormLogin from "../module/login/FormLogin";
import { setDocById } from "../firebase/services";
import { useAuthContext } from "../contexts/auth-context";
import { serverTimestamp } from "firebase/firestore";
const schema = Yup.object({
  email: validate.EMAIL,
  password: validate.PASSWORD,
});

const avatarImage =
  "https://kucuklerocakbasi.com.tr/themes/tastyigniter-orange/assets/avatar.png";

const SignUpPage = () => {
  const { handleSetUserInfo } = useAuthContext();

  const navigate = useNavigate();

  const { handleSubmit, control, formState, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { isValid, isSubmitting } = formState;

  const handleRegister = async (values) => {
    const index = values.email.indexOf("@");
    const displayName = values.email.slice(0, index);
    if (isValid) {
      try {
        const { providerId, user } = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        const { email, phoneNumber, uid } = user;
        const timestamp = serverTimestamp();
        const docUser = {
          displayName,
          email,
          phoneNumber,
          uid,
          timestamp,
          providerId,
          photoURL: avatarImage,
        };
        await setDocById(firebase_collection.USERS, uid, docUser);
        handleSetUserInfo(docUser);

        reset();
        navigate(router_link.MESSAGES);

        toast.success("Rigister successful", TOAST_TYPE);
      } catch (error) {
        console.error(error.message);
        toast.error(error.message, TOAST_TYPE);
      }
    }
  };
  return (
    <div className="flex">
      <FormLogin
        control={control}
        handleSubmit={handleSubmit(handleRegister)}
        isSubmitting={isSubmitting}
        status="Sign up"
        title="Wellcome "
        desc="Wellcome! Please enter your details."
        formState={formState}
      >
        <p className="mt-3 text-center">
          You have an account{" "}
          <span
            className="text-purple-600 font-medium cursor-pointer"
            onClick={() => navigate(router_link.SIGN_IN)}
          >
            Sign in
          </span>
        </p>
      </FormLogin>
      <Image></Image>
    </div>
  );
};

export default SignUpPage;
