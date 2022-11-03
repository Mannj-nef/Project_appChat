import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { router_link, validate } from "../common ";
import Button from "../components/button";
import Field from "../components/field";
import Form from "../components/form";
import { IconEyeHide, IconEyeShow } from "../components/icon";
import InputControl, { InputTogglePassword } from "../components/input";
import Label from "../components/lablel";
import TitleWrapped from "../components/title";
import Image from "../module/login/Image";
import { useAuthContext } from "../contexts/auth-context";

const schema = Yup.object({
  email: validate.EMAIL,
  password: validate.PASSWORD,
});

const SignInPage = () => {
  const navigate = useNavigate();
  const { handleSignInFacebook } = useAuthContext();
  const { handleSubmit, control, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignIn = (values) => {};
  return (
    <div className="flex">
      <Image></Image>
      <div className="flex flex-col flex-1 items-center justify-center bg-white ">
        <div className="shadow-lg rounded-2xl p-20 w-[600px] ">
          <TitleWrapped
            level={2}
            title="Wellcome back"
            desc="Wellcome back! Please enter your details."
          ></TitleWrapped>
          <Form handle={handleSubmit(handleSignIn)} className="form-control">
            <Field>
              <Label htmlFor="email">Email address</Label>
              <InputControl
                control={control}
                name="email"
                placeholder="Enter your email address..."
              ></InputControl>
            </Field>
            <Field>
              <Label htmlFor="email">Password</Label>
              <InputTogglePassword
                control={control}
                iconHide={<IconEyeHide />}
                iconShow={<IconEyeShow />}
                name="email"
                placeholder="Enter your password..."
              ></InputTogglePassword>
            </Field>
            <Button isLoading={false}>Sign in</Button>
          </Form>
          <Button
            type="button"
            isLoading={false}
            className="mt-3 bg-slate-50 border border-gray-300 text-gray-800"
            handle={() => handleSignInFacebook()}
          >
            Sign in width Facebook
          </Button>
          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <span
              className="text-purple-600 font-medium cursor-pointer"
              onClick={() => navigate(router_link.SIGN_UP)}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
