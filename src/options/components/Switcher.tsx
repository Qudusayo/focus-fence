import React, { useState } from "react";
import { cn } from "../lib/utils";

const Switcher = ({
  isActive: isChecked,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: () => void;
}) => {
  return (
    <>
      <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          name="autoSaver"
          className="sr-only"
          checked={isChecked}
          onChange={setIsActive}
        />
        <span
          className={`slider mr-3 flex h-[32px] w-[55px] items-center rounded-full p-1 duration-200 ${
            isChecked ? "bg-green-500" : "bg-[#FFFFFF1F]"
          }`}
        >
          <span
            className={`dot h-[24px] w-[24px] rounded-full bg-white duration-200 ${
              isChecked ? "translate-x-[2.05rem]" : "translate-x-[.1rem]"
            }`}
          ></span>
        </span>
        <span className="label flex items-center text-sm font-medium text-white absolute">
          <span
            className={cn(
              "text-sm font-bold",
              isChecked ? "pl-2" : "pl-[2.5rem]"
            )}
          >
            {isChecked ? "On" : "Off"}
          </span>
        </span>
      </label>
    </>
  );
};

export default Switcher;
