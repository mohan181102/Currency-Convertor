"use client";
import { faDownload, faMagic, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Cloudinary } from "@cloudinary/url-gen";
import React, { useRef, useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { Gravity, focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

const page = () => {
  const [image, setimage] = useState();
  const [width, setwidth] = useState("");
  const [height, setheight] = useState("");
  const [changewidth, setchangewidth] = useState("");
  const [changeheight, setchangeheight] = useState("");
  const [loading, setloading] = useState(false);
  const [publicID, setpublicID] = useState(null);
  const [transformedImage, setTransformed] = useState(null);
  const [tansformed_image_url, seturl] = useState(null);
  const editImage = useRef();

  const sidebaritem = [
    {
      name: "Fill image",
      description: "fill images",
    },
    {
      name: "Background remove",
    },
    {
      name: "Ai genrate",
    },
  ];

  function process() {
    console.log(changeheight, changewidth);
    setloading(true);
    console.log(editImage);
    seturl(editImage.current.attributes[8].nodeValue);
    console.log(tansformed_image_url);
    // const timage = cloudinary.image(publicID);
    // timage();
    // setTransformed(timage);
    // seturl(timage.toURL());
    // console.log(tansformed_image_url);
  }

  function changeprocess(e) {
    if (e.target.value == "1920 x 1080") {
      setchangeheight(1080), setchangewidth(1920);
    }
    if (e.target.value == "1080 x 720") {
      setchangeheight(720), setchangewidth(1080);
    }
    if (e.target.value == "1080 x 1920") {
      setchangeheight(1920), setchangewidth(1080);
    }
  }

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: "dwpzzc7ty",
    },
  });

  return (
    <>
      <div
        className={`min-w-screen overflow-scroll min-h-screen max-h-max flex items-center flex-col gap-2 bg-purple-400 p-3 `}
      >
        {/* navbar */}
        <nav
          className={`w-full m-2 h-12 rounded-md flex items-center justify-between bg-white`}
        ></nav>
        <section
          className={`w-full h-full overflow-scroll p-2 flex items-center justify-start bg-white rounded-md `}
        >
          <div
            className={`w-[100%]  p-4 h-auto bg-purple-200 overflow-scroll rounded-md`}
          >
            <div className={` text-purple-400 w-full h-auto `}>
              <h1
                className={`w-full px-2 h-auto text-purple-400 text-3xl font-bold`}
              >
                Fill Image
                <p className={`w-full h-auto text-[1.2rem] text-purple-400`}>
                  subheafing
                </p>
              </h1>
            </div>
            {/*  image*/}
            <div
              className={`w-auto overflow-scroll gap-10 h-full flex items-center justify-center`}
            >
              {image == null ? (
                <CldUploadWidget
                  onSuccess={(e) => {
                    console.log(e),
                      setwidth(e.info.width),
                      setheight(e.info.height),
                      setimage(e.info.url),
                      setpublicID(e.info.public_id);
                    console.log(publicID);
                  }}
                  uploadPreset="ai-world"
                >
                  {({ open }) => {
                    return (
                      <button
                        className={`w-[40%] min-h-[180px] max-h-max bg-white rounded-md flex flex-col items-center justify-center text-purple-400 text-xl `}
                        onClick={() => open()}
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          className={`p-2 rounded-full bg-purple-400  text-white`}
                        />
                        Upload your image
                      </button>
                    );
                  }}
                </CldUploadWidget>
              ) : (
                <Image
                  src={image}
                  width={200}
                  height={200}
                  className={` min-w-[40%] max-w-max h-auto bg-center object-fit bg-cover`}
                  alt="name"
                />
              )}
              {/* crete output */}
              <div className={`w-[40%]  h-auto bg-white rounded-md `}>
                {loading == false ? (
                  <p
                    className={`w-full h-[180px]  flex items-center flex-col justify-center text-purple-400 text-xl`}
                  >
                    <FontAwesomeIcon icon={faMagic} />
                    {`Background fill image`}
                  </p>
                ) : (
                  // <AdvancedImage
                  //   ref={(e) => console.log(e)}
                  //   className={`w-auto h-auto rounded-md bg-center bg-cover object-fit`}
                  //   cldImg={transformedImage}
                  // />
                  <div
                    className={`w-auto h-auto rounded-md bg-center bg-cover object-fit`}
                  >
                    <CldImage
                      ref={editImage}
                      src={image}
                      width={changewidth}
                      loading="please wait"
                      alt="Something went wrong"
                      className={`w-auto h-auto rounded-md bg-center bg-cover object-fit`}
                      height={changeheight}
                      fillBackground
                    />
                    <button
                      onClick={(e) => donload(e)}
                      className={`w-auto h-auto absolute z-20 text-2xl p-2 rounded-full flex items-center justify-center bg-orange-400 text-white`}
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* details */}
            <div
              className={`w-[80%]   mr-[10%] ml-[10%] h-auto flex items-center justify-between mt-4 gap-10`}
            >
              {/* left side */}
              <div className={`w-auto  h-auto`}>
                <label
                  className={`w-auto gap-2 h-auto text-[1rem] text-purple-500 flex items-center justify-start`}
                >
                  Width
                  <p>{width}</p>
                </label>

                <label
                  className={`w-auto gap-2 h-auto text-[1rem] text-purple-500 flex items-center justify-start`}
                >
                  Height
                  <p>{height}</p>
                </label>
              </div>
              {/* right side */}
              <div className={`w-auto h-auto`}>
                <select
                  onChange={(e) => {
                    console.log(e.target.value), changeprocess(e);
                  }}
                  className={`w-auto h-auto text-2xl p-1 bg-white text-purple-400 outline-none flex items-center justify-center rounded-md`}
                  value={"Select resolution"}
                >
                  <option>select resolution</option>
                  <option
                    onClick={() => {
                      setchangeheight("1080"), setchangewidth("1920");
                    }}
                  >
                    1920 x 1080
                  </option>
                  <option
                    onClick={() => {
                      setchangeheight("1920"), setchangewidth("1080");
                    }}
                  >
                    1080 x 1920
                  </option>
                  <option
                    onClick={() => {
                      setchangeheight("720"), setchangewidth("1080");
                    }}
                  >
                    1080 x 720
                  </option>
                </select>
                <div className={`w-[40%] h-auto`}>
                  <label
                    className={`w-auto gap-2 h-auto text-[1rem] text-purple-500 flex items-center justify-start`}
                  >
                    Width
                    <p>{changewidth}</p>
                  </label>

                  <label
                    className={`w-auto gap-2 h-auto text-[1rem] text-purple-500 flex items-center justify-start`}
                  >
                    Height
                    <p>{changeheight}</p>
                  </label>
                </div>
                {/* process btn */}
              </div>
            </div>
            <button
              onClick={() => process()}
              disabled={!image == null}
              className={` bg-green-300 ml-[45%] mr-[45%] w-[10%] disabled:opacity-50 cursor-not-allowed   text-white rounded-md p-2 `}
            >
              Process
            </button>
          </div>
        </section>

        {/* details */}
      </div>
    </>
  );
};

export default page;
