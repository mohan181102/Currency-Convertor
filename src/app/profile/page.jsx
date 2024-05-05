"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CurrencyAPI from "@everapi/currencyapi-js";
import { curreny } from "./currency_list";
import toast from "react-hot-toast";
import {
  faUser,
  faRightFromBracket,
  faArrowRightArrowLeft,
  faMagic,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import Image from "next/image";

const page = () => {
  const [data, setdata] = useState(null);
  const [base_currency, set_base_curreny] = useState(null);
  const [change_currency, set_change_currency] = useState(null);
  const [currencies_value, set_currencies_value] = useState(null);
  const [multiplynumm, setmultiplynum] = useState(1);
  const [match, setmatch] = useState(null);
  const [loader, setloader] = useState(false);
  const localdata = JSON.parse(localStorage.getItem("recent"));
  const router = useRouter();

  const client = new CurrencyAPI(
    "cur_live_EGV25Klp7ItwxZgU2T7jkuF4OLd8LZGAIrPlZq6C"
  );
  const currency_list = curreny;

  if (localdata) {
    console.log(localdata);
    base_currency == null ? set_base_curreny(localdata[0].base) : null;
    console.log(base_currency);
    change_currency == null ? set_change_currency(localdata[0].change) : null;
  }

  // GET USER
  async function user() {
    const userfromtoken = await axios.post(
      "http://localhost:3000/api/user/profile"
    );
    if (userfromtoken && data == null) {
      setdata(userfromtoken.data.user);
    }
  }

  useEffect(() => {
    user();
  }, []);

  // CURRENCY CHANGE
  async function currencies_change() {
    setloader(true);
    console.log(base_currency);
    // set local storage
    const localarray = [
      {
        base: base_currency,
        change: change_currency,
      },
    ];
    console.log(localarray);

    localStorage.setItem("recent", JSON.stringify(localarray));

    const data = await client
      .latest({
        base_currency: `${base_currency}`,
        currencies: `${change_currency}`,
      })
      .then((response) => {
        console.log(response);
        const value = Object.values(response.data);

        set_currencies_value(value[0].value * multiplynumm);
      })
      .finally(setloader(false));
  }

  // LOGOUT
  console.log(data);

  async function logout() {
    const logout = await axios
      .get("http://localhost:3000/api/user/logout")
      .then(() => {
        toast.success("Logout successfully!!");
      })
      .then(router.back);
  }

  // SWAPING

  function swap_currency() {
    set_base_curreny(change_currency);
    set_change_currency(base_currency);
  }

  return (
    <>
      {/* CREATE MAIN DIV */}
      <div
        className={`min-w-full min-h-screen max-h-max max-w-max p-10 gap-4 bg-purple-300 flex items-center flex-col`}
      >
        <div
          className={`w-[90%] h-16 p-4 md:h-12 bg-white rounded-md flex items-center justify-between`}
        >
          {/* username */}
          <h4
            onClick={() => router.push("/profile/userdetails")}
            className={`w-auto flex items-center md:text-sm cursor-pointer justify-between gap-1 h-full text-xl font-bold text-purple-400 `}
          >
            {data != null ? (
              <Image
                width={200}
                height={200}
                alt=""
                className={` w-10 h-10 md:w-6 md:h-6  rounded-md bg-cover object-cover bg-center`}
                src={data?.profilePhoto}
              />
            ) : (
              <FontAwesomeIcon icon={faUser} />
            )}
            {`${data?.username}`}
          </h4>
          {/* IMAGE TRANFORMATION */}
          <section className={`flex items-center justify-center gap-4 mx-2`}>
            <button
              className={`h-full md:text-sm  w-auto text-2xl px-2 font-bold flex items-center  bg-gradient-to-r from-violet-500 to-fuchsia-500  justify-center text-white rounded-md p-2`}
              onClick={() => router.push("/profile/transformation")}
            >
              {" "}
              <FontAwesomeIcon icon={faStar} />
              {`ImageTransformation`}
            </button>
            {/* logout btn */}
            <button
              className={`h-full w-auto text-xl flex items-center justify-center gap-1 cursor-pointer font-bold text-purple-400`}
              onClick={() => logout()}
            >
              {`Logout`}
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </section>
        </div>
        {/* box */}

        <div
          className={`w-[90%] md:p-2 min-h-[60%] max-h-max bg-white rounded-md flex flex-col items-center p-6`}
        >
          <h2
            className={`w-auto md:text-xl h-auto mt-0 text-4xl font-bold cursor-default text-purple-500`}
          >{`Welcome ${data != null ? data.username : ""}`}</h2>
          <div
            className={`w-[90%] min-h-[70%] max-h-max rounded-md gap-4 bg-purple-500 mt-4 p-4 flex  flex-col items-center`}
          >
            <div
              className={`w-full min-h-[60%] max-h-max flex items-center md:flex-col md:gap-4 justify-center`}
            >
              <section
                className={`w-[40%] md:w-full h-auto bg-white rounded-md flex items-center justify-center flex-wrap `}
              >
                <h3
                  className={`w-full h-auto p-1 px-2 text-md font-semibold text-purple-500 cursor-default `}
                >{`Base currency`}</h3>
                <select
                  className={`w-full md:text-sm h-auto text-gray-600 outline-none rounded-md flex items-center p-2 text-xl`}
                  onChange={(e) => set_base_curreny(e.target.value.slice(0, 3))}
                  value={base_currency}
                >
                  {localdata.length != 0
                    ? localdata.map((item, index) => {
                        return (
                          <>
                            <option
                              key={index + Date.now()}
                              className={`w-full md:text-sm outline-none overflow-hidden h-auto text-[1.2rem] p-1 ${
                                item.base.includes(base_currency)
                                  ? " bg-purple-400"
                                  : ""
                              } `}
                              onClick={() => set_base_curreny(item.base)}
                            >
                              {item.base}
                            </option>
                          </>
                        );
                      })
                    : null}
                  {currency_list.map((item, index) => {
                    return (
                      <>
                        <option
                          className={`w-full md:text-sm outline-none overflow-hidden h-auto text-[1.2rem] p-1 ${
                            item.includes(base_currency) ? " bg-purple-400" : ""
                          } `}
                          key={index}
                          onClick={() => set_base_curreny(item)}
                        >
                          {item}
                        </option>
                      </>
                    );
                  })}
                </select>
              </section>

              <button
                className={`w-[5%] md:w-auto text-sm h-auto md:text-sm p-2 font-bold text-purple-500 rounded-md mx-8 bg-white outline-none`}
                onClick={() => swap_currency()}
              >
                {loader ? (
                  <div
                    className={` w-4 h-4 bg-transparent border-2 border-t-2 border-purple-400 animate-spin`}
                  />
                ) : (
                  <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                )}
              </button>

              {/* right side for change curry */}
              <section
                className={`w-[40%] md:w-full h-auto mx-2 bg-white rounded-md flex items-center gap-1  justify-center flex-wrap `}
              >
                <h3
                  className={`w-full h-auto p-1 text-purple-500 px-2 text-md font-semibold cursor-default `}
                >{`Change currency`}</h3>
                <select
                  className={`w-full md:text-sm mx-2  text-gray-600 outline-none h-auto rounded-md flex items-center p-2 text-xl`}
                  onChange={(e) =>
                    set_change_currency(e.target.value.slice(0, 3))
                  }
                  value={change_currency}
                >
                  {localdata.length != 0
                    ? localdata.map((item, index) => {
                        return (
                          <>
                            <option
                              key={index + Date.now()}
                              className={`w-full md:text-sm outline-none overflow-hidden h-auto text-[1.2rem] p-1 ${
                                item.change.includes(change_currency)
                                  ? " bg-purple-400"
                                  : ""
                              } `}
                              onClick={() => set_change_currency(item.change)}
                            >
                              {item.change}
                            </option>
                          </>
                        );
                      })
                    : null}

                  {currency_list.map((item, index) => {
                    return (
                      <>
                        <option
                          className={`w-full md:text-sm overflow-hidden h-auto text-[1.2rem] p-1 ${
                            item.includes(change_currency)
                              ? " bg-purple-400"
                              : ""
                          } `}
                          key={index * 2}
                          onClick={() => set_change_currency(item)}
                        >
                          {item}
                        </option>
                      </>
                    );
                  })}
                </select>
              </section>
            </div>
            <input
              placeholder="How many ammout?"
              type="number"
              defaultValue={null}
              onChange={(e) => setmultiplynum(e.target.value)}
              className={` min-w-[30%] overflow-scroll h-[60px] md:h-[40px] md:w-full md:text-sm md:font-semibold md:mt-3 my-4  p-2 py-2 outline-none rounded-md text-gray-500 text-xl font-bold flex items-center justify-start`}
            />

            {/* Value */}
            <section
              className={`w-full md:w-auto flex items-center justify-start p-2 text-xl`}
            >
              <label
                className={`w-auto md:w-full  md:text-[1.2rem] md:font-semibold text-white flex items-center justify-center p-2 text-xl`}
              >{`Converted number`}</label>
              <input
                className={` min-w-[40%] md:text-sm md:w-full bg-transparent w-auto  max-w-max h-10 outline-none cursor-default rounded-md text-xl p-2 font-bold `}
                readOnly
                value={currencies_value + `  ${change_currency}`}
                placeholder="No currency change"
              />
            </section>
            <button
              onClick={() => currencies_change()}
              className={`w-auto p-2 text-xl h-full font-bold bg-white text-purple-500 rounded-md mt-2 md:text-[1rem] flex items-center justify-center`}
            >
              Convert
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
