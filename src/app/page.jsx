import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <div
        className={`w-screen h-screen bg-purple-300 flex justify-center items-center flex-col gap-2`}
      >
        <h1
          className={`w-full h-auto p-4 text-4xl bg-transparent cursor-default flex items-center justify-center font-bold text-gray-500`}
        >
          Welcome to currency convertor!
        </h1>
        <p
          className={`w-full h-auto p-1 text-gray-500 text-md font-bold flex items-center justify-center`}
        >
          place where you can check your currency in diffrent currency
        </p>

        {/* CREATE BUTTON FOR LOGIN AND SIGNUP */}

        <div
          className={`w-full h-auto p-3 rounded-md bg-transparent flex gap-4 items-center justify-center`}
        >
          <Link
            href={"./login"}
            className={` w-40 h-auto p-2 rounded-md bg-white text-gray-500 font-bold text-xl bg-gradient-to-t from-gray-500 to-gray-100`}
          >
            <button>LogIn</button>
          </Link>
          <Link
            href={"./signup"}
            className={` w-40 h-auto p-2 rounded-md bg-white text-gray-500 font-bold text-xl bg-gradient-to-t from-gray-500 to-gray-100`}
          >
            <button>SignUp</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
