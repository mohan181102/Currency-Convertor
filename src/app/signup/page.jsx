"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

const page = () => {
  const { handleSubmit, register } = useForm();
  const [loader, setloder] = useState(false);
  const [keyplace, setkeyplace] = useState(null);
  const [profilephoto, setprofilephoto] = useState(null);
  const router = useRouter();

  // UPLOAD IN CLOUDNARY

  async function profilephotoupload(imagePath) {}

  // CREATE TOASTER

  function successtost() {
    toast.success("Signup successfully!!");
  }

  async function signup(data) {
    setloder(true);
    console.log(loader);
    console.log(data);
    const newUser = await axios
      .post("http://localhost:3000/api/user/signup", data)
      .then(() => successtost())
      .then(() => router.push("/login"))
      .finally(() => setloder(false));
  }

  if (keyplace == 0) {
    document.getElementById("username").focus();
  }
  if (keyplace == 1) {
    document.getElementById("email").focus();
  }
  if (keyplace == 2) {
    document.getElementById("password").focus();
  }

  return (
    <>
      <div
        className={`w-screen h-screen py-5 bg-purple-300 flex items-center justify-center`}
      >
        <form
          onSubmit={handleSubmit(signup)}
          className={`w-2/4 h-auto p-4 md:w-[75%] md:h-auto bg-white rounded-md text-gray-500 flex items-center flex-col gap-2`}
        >
          <h2
            className={`w-full md:mb-2 md:text-2xl h-auto px-2 text-3xl font-bold text-gray-500 flex items-center justify-center  `}
          >
            Signup from here
          </h2>

          {/*  CREATE IMAGE SECTION */}
          <div
            className={`w-full md:w-[3/4] md:h-full my-1 h-[140px]  flex items-center justify-center`}
          >
            <div
              className={`w-[140px] overflow-hidden h-full border mt-2 border-spacing-1 border-gray-500  cursor-pointer rounded-md bg-center bg-cover flex items-center justify-center text-[1rem] text-gray-500 font-medium`}
            >
              {profilephoto == null ? (
                <p className={`flex flex-col items-center p-2`}>
                  {" "}
                  <FontAwesomeIcon icon={faPlus} />
                  <CldUploadWidget
                    onSuccess={(e) => {
                      console.log(e.info.url), setprofilephoto(e.info.url);
                    }}
                    uploadPreset="ai-world"
                  >
                    {({ open }) => {
                      return (
                        <button onClick={() => open()}>Profile Photo</button>
                      );
                    }}
                  </CldUploadWidget>
                </p>
              ) : (
                <Image
                  src={`${profilephoto}`}
                  width={400}
                  height={400}
                  alt="missing?"
                  name="profilePhoto"
                  className={`w-full h-full bg-cover bg-center`}
                  {...register("profilePhoto", {
                    required: false,
                    value: profilephoto,
                  })}
                />
              )}
            </div>
          </div>
          <label
            className={`w-[90%] h-auto md:text-[1.2rem] px-2 text-xl font-bold text-gray-500 flex items-center justify-start `}
          >
            Username:-{" "}
          </label>
          <input
            className={` w-[90%] md:text-sm h-14 p-2 rounded-md border-2 border-spacing-1 border-gray-500 text-xl outline-none flex items-center justify-start`}
            type="text"
            name="username"
            id="username"
            placeholder="your username"
            onKeyDownCapture={(event) => {
              event.key == "Enter" ? setkeyplace(1) : "";
            }}
            {...register("username", { required: true })}
          />
          <label
            className={`w-[90%] md:text-[1.2rem] h-auto px-2 text-xl font-bold text-gray-500 flex items-center justify-start `}
          >
            Email:-{" "}
          </label>
          <input
            className={` w-[90%] md:text-sm h-14 p-2 rounded-md border-2 border-spacing-1 border-gray-500 text-xl outline-none flex items-center justify-start`}
            type="text"
            id="email"
            name="email"
            onKeyDownCapture={(event) => {
              event.key == "Enter" ? setkeyplace(2) : "";
            }}
            placeholder="your email"
            {...register("email", { required: true })}
          />
          <label
            className={`w-[90%] md:text-[1.2rem] h-auto px-2 text-xl font-bold text-gray-500 flex items-center justify-start `}
          >
            Password:-{" "}
          </label>
          <input
            className={` w-[90%] md:text-sm h-14 p-2 rounded-md border-2 border-spacing-1 border-gray-500 text-xl outline-none flex items-center justify-start`}
            type="password"
            id="password"
            name="password"
            onKeyDownCapture={(event) => {
              event.key == "Enter" ? setkeyplace(0) : "";
            }}
            placeholder="your password"
            {...register("password", { required: true, min: 8 })}
          />
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
              <Link href={"/login"}>Already user?</Link>
            </label>
          </div>
          <button
            className={`w-full md:text-sm h-14 rounded-md bg-gray-500 text-white text-xl font-bold `}
            type="submit"
            // onClick={() => setloder(true)}
          >
            {loader ? "Procesing..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default page;

// res.cloudinary.com
