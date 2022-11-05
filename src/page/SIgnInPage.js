import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { router_link, TOAST_TYPE, validate } from "../common ";
import Image from "../module/login/Image";
import { useAuthContext } from "../contexts/auth-context";
import FormLogin from "../module/login/FormLogin";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { toast } from "react-toastify";

const schema = Yup.object({
  email: validate.EMAIL,
  password: validate.PASSWORD,
});

const SignInPage = () => {
  const { handleSetUserInfo } = useAuthContext();
  const navigate = useNavigate();
  const { handleSubmit, control, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { isValid, isSubmitting } = formState;
  const handleSignIn = async (values) => {
    const { email, password } = values;
    if (!isValid) return;
    try {
      const authSign = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successful", TOAST_TYPE);
      console.log(authSign);
      handleSetUserInfo(authSign);
      navigate(router_link.HOME);
    } catch (error) {
      toast.error("Login failed, wrong account or password", TOAST_TYPE);
      throw new Error(error);
    }
  };
  return (
    <div className="flex">
      <Image></Image>
      <FormLogin
        control={control}
        handleSubmit={handleSubmit(handleSignIn)}
        status="Sign in"
        isSubmitting={isSubmitting}
        title="Wellcome back"
        desc="Wellcome back! Please enter your details."
        formState={formState}
      >
        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <span
            className="text-purple-600 font-medium cursor-pointer"
            onClick={() => navigate(router_link.SIGN_UP)}
          >
            Sign up
          </span>
        </p>
      </FormLogin>
    </div>
  );
};

export default SignInPage;
