import React from "react";
import { useForm } from "react-hook-form";
import Form from "../../components/form/Form";
import { IconSend } from "../../components/icon";
import InputControl from "../../components/input";
import UserItemChart from "../message/UserItemChart";

const WindownChat = () => {
  const { control } = useForm();
  return (
    <div className="flex-1 flex flex-col bg-black27">
      <div className="flex justify-between items-center shadow-lg p-5 text-white bg-black35 rounded-tl-3xl rounded-tr-3xl">
        <div className="">
          <h2>Ten phong</h2>
          <p>Ten mo ta phong</p>
        </div>
        <div>
          <h2>Ten phong</h2>
          <p>Ten mo ta phong</p>
        </div>
      </div>

      <div className="p-5 flex flex-1 flex-col h-[500px]">
        <div className="mess-content flex-1 flex flex-col justify-end overflow-auto mb-5">
          <UserItemChart></UserItemChart>
          <UserItemChart></UserItemChart>
          <UserItemChart></UserItemChart>
        </div>

        <Form>
          <InputControl
            control={control}
            name="message"
            placeholder="Message..."
            className="pr-20"
          >
            <IconSend></IconSend>
          </InputControl>
        </Form>
      </div>
    </div>
  );
};

export default WindownChat;
