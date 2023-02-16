/* Copyright (C) Douglas Burkinshaw - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Douglas Burkinshaw <douglaswburkinshaw@hotmail.co.uk>, Feb 2023
 */

import React, { useState } from "react";
import "./App.css";
import { Settings } from "./svgs/settings";
import ScheduleModal from "./modal";
import { Caron } from "./svgs/caron";
import Expand from "react-expand-animated";

export interface Token {
  symbol: string;
  name: string;
  price: string;
  icon: string;
  decimals: number;
}

const calcTokenTwoAmount = (
  amount: string,
  token1: Token,
  token2: Token
): string => {
  //todo convert to big number library as JS numbers will not handle larger input sizes
  return (
    parseFloat(amount) *
    (parseFloat(token1.price) / parseFloat(token2.price))
  ).toString();
};

const exampleTokens: Array<Token> = [
  {
    symbol: "ETH",
    name: "Ethereum",
    price: "30",
    icon: "eth.svg",
    decimals: 18,
  },
  {
    symbol: "NAZ",
    name: "Nazdaq",
    price: "20",
    icon: "eth.svg",
    decimals: 18,
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: "1000",
    icon: "eth.svg",
    decimals: 18,
  },
];

function TokenSelector(props: {
  value: string;
  dollarPrice: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onClick: () => void;
  token: Token | undefined;
}) {
  return (
    <div className={"font-bold flex justify-evenly bg-lightGrey p-4"}>
      <div>
        <input
          type={"string"}
          name={"token"}
          value={props.value}
          onChange={props.onChange}
        />
        {props.dollarPrice && <div>${props.dollarPrice}</div>}
      </div>

      <button onClick={props.onClick} className={"flex rounded border p-1 "}>
        {props.token?.icon && (
          <img src={`/svgs/${props.token.icon}`} className={"w-3 my-auto"} />
        )}
        <span className={"ml-1 my-auto"}>
          {props.token?.name ?? "select a token"}
        </span>
        <Caron />
      </button>
    </div>
  );
}

function App() {
  const [token1, setToken1] = useState<Token | undefined>();
  const [token2, setToken2] = useState<Token | undefined>();

  const [amount1, setAmount1] = useState<string>("0");
  const [amount2, setAmount2] = useState<string>("0");

  const [dollarPrice1, setDollarPrice1] = useState<string>("");
  const [dollarPrice2, setDollarPrice2] = useState<string>("");

  const [showModal, setShowModal] = useState<"token1" | "token2" | false>(
    false
  );

  const submit = () => {
    window.alert("successfully submitted");
  };

  const swap = () => {
    const first = token1;
    const second = token2;

    setToken1(second);
    setToken2(first);

    setAmount1(amount2);
    setAmount2(amount1);

    setDollarPrice1(dollarPrice2);
    setDollarPrice2(dollarPrice1);
  };

  const calcDollarPrice = (amount: string, price: string): string => {
    return (parseFloat(price) * parseFloat(amount)).toString();
  };

  const handleChange = (event: any, token: "token1" | "token2") => {
    const val = event.target.value;

    if (val === "" && token === "token1") {
      setDollarPrice1("");
      setAmount1("");
      return;
    }

    if (val === "" && token === "token2") {
      setDollarPrice2("");
      setAmount2("");
      return;
    }

    //todo better sanitization of input
    if (isNaN(parseFloat(event.target.value))) return;

    if (token === "token1") {
      setAmount1(val);

      if (token1 !== undefined) {
        setDollarPrice1(calcDollarPrice(val, token1.price));
      }
    } else {
      setAmount2(val);

      if (token2 !== undefined) {
        setDollarPrice2(calcDollarPrice(val, token2.price));
      }
    }

    if (token2 !== undefined && token1 !== undefined) {
      const amount2 = calcTokenTwoAmount(val, token1, token2);
      if (token === "token1") {
        setDollarPrice2(calcDollarPrice(amount2, token2.price));
        setAmount2(amount2);
      } else {
        setDollarPrice1(calcDollarPrice(amount2, token1.price));
        setAmount1(amount2);
      }
    }
  };

  return (
    <div>
      <div className={"   max-w-[480px] w-full m-auto pt-[68px] pb-0 px-2"}>
        <div
          className={
            " relative border transition-transform duration-[250ms] ease-[ease] delay-[0s] p-2 rounded-2xl border-solid border-[rgb(210,217,238)] background: rgb(255, 255, 255)"
          }
        >
          <div className={"p-3 flex justify-between font-bold"}>
            <div>SWAP</div>
            <Settings />
          </div>
          <div>
            <TokenSelector
              value={amount1}
              onChange={(event: any) => handleChange(event, "token1")}
              dollarPrice={dollarPrice1}
              onClick={() => setShowModal("token1")}
              token={token1}
            />

            <div
              className={
                " h-10 w-10 relative mt-[-18px] mb-[-18px] bg-[rgb(232,236,251)] z-[2] mx-auto rounded-xl border-4 border-solid border-white"
              }
            >
              <div className={" inline-flex justify-center w-full h-full"}>
                <button onClick={swap}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#98A1C0"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </button>
              </div>
            </div>
            <TokenSelector
              value={amount2}
              onChange={(event: any) => handleChange(event, "token2")}
              dollarPrice={dollarPrice2}
              onClick={() => setShowModal("token2")}
              token={token2}
            />
          </div>

          <Expand
            open={amount1 !== "" && amount2 !== ""}
            className={"px-6 font-bold"}
          >
            <div
              className={
                "p-6 flex justify-between border-solid border-2 py-4 rounded"
              }
            >
              <div>
                <div>Slippage </div>
                <div>price impact</div>
              </div>
              <div>
                <div>5.333%</div>
                <div>3.222%</div>
              </div>
            </div>
          </Expand>

          <button
            className="border-solid h-10 bg-lightPink rounded w-full font-bold mt-4"
            onClick={submit}
          >
            Connect Wallet
          </button>
        </div>
      </div>
      <ScheduleModal
        setClose={() => {
          setShowModal(false);
        }}
        show={showModal}
        tokens={exampleTokens}
        selectToken1={setToken1}
        selectToken2={setToken2}
      />
    </div>
  );
}

export default App;
