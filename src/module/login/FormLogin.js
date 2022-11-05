import React from "react";
import Button from "../../components/button";
import Field from "../../components/field";
import Form from "../../components/form";
import { IconEyeHide, IconEyeShow } from "../../components/icon";
import InputControl, { InputTogglePassword } from "../../components/input";
import Label from "../../components/lablel";
import TitleWrapped from "../../components/title";
import { useAuthContext } from "../../contexts/auth-context";

import PropTypes from "prop-types";

const FormLogin = ({
  handleSubmit,
  isSubmitting,
  control,
  formState,
  children,
  status,
  title,
  desc,
}) => {
  const { handleSignInFacebook } = useAuthContext();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white ">
      <div className="shadow-lg rounded-2xl p-20 w-[600px] ">
        <TitleWrapped level={2} title={title} desc={desc}></TitleWrapped>
        {/* ****************************************** */}
        <Form handle={handleSubmit} className="form-control">
          <Field>
            <Label htmlFor="email" className="mb-5">
              Email address
            </Label>
            <InputControl
              control={control}
              name="email"
              error={formState.errors?.email?.message}
              placeholder="Enter your email address..."
            ></InputControl>
          </Field>
          <Field>
            <Label htmlFor="email" className="mb-5">
              Password
            </Label>
            <InputTogglePassword
              control={control}
              iconHide={<IconEyeHide />}
              iconShow={<IconEyeShow />}
              error={formState.errors?.password?.message}
              name="email"
              placeholder="Enter your password..."
            ></InputTogglePassword>
          </Field>
          <Button isLoading={isSubmitting}>{status}</Button>
        </Form>
        {/* ******************************************** */}
        <Button
          type="button"
          isLoading={false}
          className="mt-[10px] bg-slate-50 border border-gray-300 text-gray-800"
          handle={() => handleSignInFacebook()}
        >
          Sign in width Facebook
        </Button>
        {children}
      </div>
    </div>
  );
};

FormLogin.propTypes = {
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  control: PropTypes.any,
  formState: PropTypes.object,
  children: PropTypes.any,
  status: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
};

export default FormLogin;
