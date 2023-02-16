/* Copyright (C) Douglas Burkinshaw - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Douglas Burkinshaw <douglaswburkinshaw@hotmail.co.uk>, Feb 2023
 */

import React from "react";
import Modal from "react-modal";
import OutsideClickHandler from "react-outside-click-handler";
import { Token } from "./App";

interface scheduleModalProps {
  setClose: () => void;
  show: false | "token1" | "token2";
  tokens: Array<Token>;
  selectToken1: (token: Token) => void;
  selectToken2: (token: Token) => void;
}

export const ScheduleModal = (props: scheduleModalProps) => {
  const handleTokenSelect = async (token: Token) => {
    if (props.show === "token1") props.selectToken1(token);
    if (props.show === "token2") props.selectToken2(token);
    props.setClose();
  };

  return (
    <Modal
      className={`border-2 absolute left-1/2 top-1/2 transform translate-x-[-50%] translate-y-[-50%] rounded`}
      isOpen={props.show !== false}
    >
      <OutsideClickHandler onOutsideClick={props.setClose}>
        <div className={"w-96 text-center p-5  bg-grey"}>
          <div>Choose Token</div>
          <div className={"pt-5"}>
            {props.tokens &&
              props.tokens.map((token) => {
                return (
                  <button
                    onClick={() => handleTokenSelect(token)}
                    className={
                      "block m-auto py-3 px-6 rounded text-white bg-pink mb-3 w-full flex rounded border p-1 "
                    }
                  >
                    <img src={`/svgs/${token.icon}`} className={"w-3 mr-1"} />
                    <span className={"text-black"}>{token.name}</span>
                  </button>
                );
              })}
          </div>
        </div>
      </OutsideClickHandler>
    </Modal>
  );
};

export default ScheduleModal;
