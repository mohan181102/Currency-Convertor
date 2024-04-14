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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const page = () => {
  const [data, setdata] = useState(null);
  const [base_currency, set_base_curreny] = useState("USD");
  const [change_currency, set_change_currency] = useState("INR");
  const [currencies_value, set_currencies_value] = useState(null);
  const localdata = JSON.parse(localStorage.getItem("recent"));
  const [multiplynumm, setmultiplynum] = useState(1);
  const [match, setmatch] = useState(null);
  const [loader, setloader] = useState(false);

  const client = new CurrencyAPI(
    "cur_live_EGV25Klp7ItwxZgU2T7jkuF4OLd8LZGAIrPlZq6C"
  );
  const currency_list = curreny;
  console.log(currency_list);
  console.log("load", localdata);

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
    console.log("bas", base_currency);
    console.log("cu", change_currency);
    // set local storage
    localStorage.setItem(
      "recent",
      JSON.stringify(
        Array({
          base: base_currency,
          change: change_currency,
        })
      )
    );

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

  async function logout() {
    await axios.get("http://localhost:3000/api/user/logout").then(() => {
      toast.success("Logout successfully!!");
    });
  }
  return (
    <>
      {/* CREATE MAIN DIV */}
      <div
        className={`min-w-full min-h-screen max-h-max max-w-max p-10 gap-4 bg-purple-300 flex items-center flex-col`}
      >
        <div
          className={`w-[90%] h-16 p-4 bg-white rounded-md flex items-center justify-between`}
        >
          {/* username */}
          <h2
            className={`w-auto flex items-center cursor-pointer justify-center gap-1 h-full text-xl font-bold text-purple-400 `}
          >
            <FontAwesomeIcon
              icon={faUser}
              className={`scale-110 md:scale-100`}
            />
            {`User`}
          </h2>
          {/* logout btn */}
          <button
            className={`h-full w-auto text-xl flex items-center justify-center gap-1 cursor-pointer font-bold text-purple-400`}
            onClick={() => logout()}
          >
            {`Logout`}
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
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
              className={`w-full min-h-[60%] max-h-max flex items-center md:flex-col md:gap-4 lg:justify-center`}
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
                  defaultValue={base_currency}
                  value={base_currency}
                >
                  {/* INPUT SECTION */}

                  <input
                    onChange={(e) => setmatch(e.target.value)}
                    value={match}
                    className={` w-full h-8 outline-none text-[1.3rem] md:text-sm`}
                  />

                  {/* recent */}
                  <p className={`w-full text-gray-500 h-auto p-1`}>Recent</p>
                  {localdata.length != 0
                    ? localdata.map((item) => {
                        return (
                          <>
                            <option
                              className={`w-full md:text-sm outline-none overflow-hidden h-auto text-[1.2rem] p-1 ${
                                item.base.includes(base_currency)
                                  ? " bg-purple-400"
                                  : ""
                              } `}
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
                onClick={() => currencies_change()}
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
                  defaultValue={change_currency}
                >
                  <p className={`w-full text-gray-500 h-auto p-1`}>Recent</p>
                  {localdata.length != 0
                    ? localdata.map((item) => {
                        return (
                          <>
                            <option
                              className={`w-full md:text-sm outline-none overflow-hidden h-auto text-[1.2rem] p-1 ${
                                item.base.includes(base_currency)
                                  ? " bg-purple-400"
                                  : ""
                              } `}
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
              className={`w-full md:w-auto flex items-start flex-col p-2 text-xl`}
            >
              <label
                className={`w-full md:w-full  md:text-[1.2rem] md:font-semibold text-white flex items-center justify-center p-2 text-xl`}
              >{`Converted number`}</label>
              <input
                className={` min-w-[40%] md:text-sm md:w-full  max-w-max h-10 outline-none cursor-default rounded-md text-xl p-2 font-bold `}
                readOnly
                value={currencies_value}
                placeholder="No currency change"
              />
              <button
                onClick={() => set_currencies_value(0)}
                className={`w-auto h-full bg-white text-purple-500 p-1 rounded-md mt-2 md:text-[1rem] flex items-center justify-center`}
              >
                Clear
              </button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
