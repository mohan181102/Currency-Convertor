"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const page = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [localuserdata, setlocaluserdata] = useState(null);
  const [loader, setloader] = useState(false);
  if (typeof window != "undefined" && window.localStorage) {
    const localuser = JSON.parse(localStorage.getItem("user"));
    localuserdata == null ? setlocaluserdata(localuser) : null;
    console.log(localuserdata);
  }

  // SUCCESS
  function success() {
    toast.success("Login successfully! ");
  }

  // SAVE DATA IN LOCAL STORAGE
  async function savedata(data) {
    localStorage.setItem("user", null);
    localStorage.setItem("user", JSON.stringify({ data }));
  }

  // FUNCTION FOR LOGIN
  async function login(formdata) {
    console.log("formdata", formdata);
    await setloader(true);
    const data = await axios
      .post("http://localhost:3000/api/user/login", formdata)
      .then(() => success())
      .then(() => (formdata.remember ? savedata(formdata) : null))
      .then(() => router.push("/profile"))
      .finally(setloader(false));
    console.log(data);
  }

  return (
    <>
      <div
        className={`w-screen h-screen bg-purple-300 flex items-center justify-center`}
      >
        <form
          onSubmit={handleSubmit(login)}
          className={`w-2/4 md:w-3/4 h-auto p-4 bg-white rounded-md text-gray-500 flex items-center flex-col gap-2`}
        >
          <h2
            className={`w-full md:py-2 h-auto px-2 text-3xl font-bold text-gray-500 flex items-center justify-center  `}
          >
            Login from here
          </h2>
          <label
            className={`w-[90%] md:text-[1.2rem] h-auto px-2 text-xl font-bold text-gray-500 flex items-center justify-start `}
          >
            Email:-{" "}
          </label>
          <input
            className={` w-[90%] md:text-sm h-14 p-2 rounded-md border-2 border-spacing-1 border-gray-500 text-xl outline-none flex items-center justify-start`}
            type="text"
            name="email"
            defaultValue={localuserdata ? localuserdata.data.email : null}
            placeholder="your email"
            {...register("email", { required: true })}
          />
          <label
            className={`w-[90%] md:text-[1.2rem] h-auto px-2 text-xl font-bold text-gray-500 flex items-center justify-start `}
          >
            Password:-{" "}
          </label>
          <div
            className={` w-[90%] h-14rounded-md border-2 border-spacing-1 rounded-md border-gray-500 text-xl outline-none flex items-center justify-center flex-wrap`}
          >
            <input
              className={` w-[90%] md:text-sm md:w-[80%] h-14 p-2 rounded-md border-gray-500 text-xl outline-none flex items-center justify-start`}
              type="password"
              id="password"
              defaultValue={localuserdata ? localuserdata.data.password : null}
              name="password"
              placeholder="your password"
              {...register("password", { required: true, min: 8 })}
            />
            <div
              className={`w-[10%] md:text-sm md:w-[20%] cursor-pointer h-14 outline-none text-gray-500 flex items-center justify-center`}
              onClick={() =>
                document.getElementById("password").getAttribute("type") ==
                "password"
                  ? document
                      .getElementById("password")
                      .setAttribute("type", "text")
                  : document
                      .getElementById("password")
                      .setAttribute("type", "password")
              }
            >
              <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
          <div className={`w-[90%] h-auto flex items-center justify-between`}>
            <label
              className={`w-[50%] md:text-sm  h-auto px-2 py-4 text-xl font-bold text-gray-500 flex items-center justify-start gap-2`}
            >
              <input
                type="checkbox"
                className={`w-6 md:text-sm h-6 rounded-md `}
                {...register("remember", { required: false })}
              />
              Remember me
            </label>
            {/*  NEW USER*/}
            <label
              className={`w-auto md:text-sm h-auto p-2 text-xl font-bold text-purple-500 flex items-center justify-start gap-2`}
            >
              <Link href={"/signup"}>New user?</Link>
            </label>
          </div>

          <button
            className={`w-full disabled:opacity-50 disabled:cursor-not-allowed h-14 rounded-md bg-gray-500 text-white text-xl font-bold `}
            type="submit"
            disabled={loader}
          >
            {loader == true ? "loading..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default page;
