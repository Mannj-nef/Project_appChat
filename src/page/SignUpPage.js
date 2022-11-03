import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { router_link, TOAST_TYPE, validate } from "../common ";
import Button from "../components/button";
import Field from "../components/field";
import Form from "../components/form/";
import { IconEyeHide, IconEyeShow } from "../components/icon";
import InputControl, { InputTogglePassword } from "../components/input/";
import Label from "../components/lablel";
import TitleWrapped from "../components/title";
import Image from "../module/login/Image";
import { auth } from "../firebase/firebase-config";
import { toast } from "react-toastify";
import { useAuthContext } from "../contexts/auth-context";
const schema = Yup.object({
  email: validate.EMAIL,
  password: validate.PASSWORD,
});

const SignUpPage = () => {
  const navigate = useNavigate();

  const { handleSignInFacebook } = useAuthContext();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleRegister = async (values) => {
    const { email, password } = values;
    if (isValid) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        toast.success("Rigister successful", TOAST_TYPE);
      } catch (error) {
        toast.error(error.message, TOAST_TYPE);
      }
    }
  };
  return (
    <div className="flex">
      <div className="flex flex-col flex-1 items-center justify-center bg-white ">
        <div className="shadow-2xl rounded-2xl px-20 py-10 w-[600px] ">
          <TitleWrapped
            level={2}
            title="Wellcome"
            desc="Wellcome! Please enter your details."
          ></TitleWrapped>
          <Form handle={handleSubmit(handleRegister)} className="form-control">
            <Field>
              <Label htmlFor="email">Email address</Label>
              <InputControl
                control={control}
                error={errors?.email?.message}
                name="email"
                placeholder="Enter your email address..."
              ></InputControl>
            </Field>
            <Field>
              <Label htmlFor="password">Password</Label>
              <InputTogglePassword
                control={control}
                iconHide={<IconEyeHide />}
                iconShow={<IconEyeShow />}
                name="password"
                error={errors?.password?.message}
                placeholder="Enter your password..."
              ></InputTogglePassword>
            </Field>
            <Button type="submit" isLoading={isSubmitting}>
              Register
            </Button>
          </Form>
          <Button
            type="button"
            className="mt-3 bg-slate-50 border border-gray-300 text-gray-800"
            handle={() => handleSignInFacebook()}
          >
            Sign in width Facebook
          </Button>
          <p className="mt-3 text-center">
            You have an account{" "}
            <span
              className="text-purple-600 font-medium cursor-pointer"
              onClick={() => navigate(router_link.SIGN_IN)}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
      <Image></Image>
    </div>
  );
};

export default SignUpPage;
