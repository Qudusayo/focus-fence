import React, { useState } from "react";
import { cn } from "../lib/utils";

export default function Schedule() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="font-bold text-2xl">Schedule</h2>
          <span className="text-sm">
            Set a schedule for the blacklist be turned on and off automatically.
          </span>
        </div>
        <div className="flex items-center justify-end">
          {/* <Switcher /> */}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-[#ffffff0d] border border-[#ffffff0d] rounded-2xl col-span-1 px-6 py-4 text-center">
          <h2 className="font-bold mb-4">Set schedule:</h2>
          <div className="flex gap-1">
            <div>
              <TimeSelector />
              <span className="font-light text-sm">start</span>
            </div>
            <div>
              <TimeSelector />
              <span className="font-light text-sm">finish</span>
            </div>
          </div>
        </div>
        <div className="bg-[#ffffff0d] border border-[#ffffff0d] rounded-2xl col-span-1 px-6 py-4 text-center">
          <h2 className="font-bold mb-4">Set interval:</h2>
          <div className="flex gap-1">
            <div>
              <TimeSelector />
              <span className="font-light text-sm">start</span>
            </div>
            <div>
              <TimeSelector />
              <span className="font-light text-sm">finish</span>
            </div>
          </div>
        </div>
        <div className="bg-[#ffffff0d] border border-[#ffffff0d] rounded-2xl col-span-2 px-6 py-4 text-center">
          <h2 className="font-bold mb-4">Select days of the week:</h2>
          <div className="flex items-center justify-between">
            <WeekDaySelector day="Sun" />
            <WeekDaySelector day="Mon" />
            <WeekDaySelector day="Tue" />
            <WeekDaySelector day="Wed" />
            <WeekDaySelector day="Thu" />
            <WeekDaySelector day="Fri" />
            <WeekDaySelector day="Sat" />
          </div>
        </div>
      </div>
    </div>
  );
}

const WeekDaySelector = ({ day }: { day: string }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <button
      className={cn(
        "rounded-full border border-[#ffffff1f] w-10 h-10 flex items-center justify-center text-sm cursor-pointer",
        isActive ? "bg-[#35C867]" : "bg-[#ffffff1f]"
      )}
      onClick={() => setIsActive((active) => !active)}
    >
      {day}
    </button>
  );
};

const TimeSelector = () => {
  return (
    <div className="flex text-xs bg-[#ffffff0d] border border-[#ffffff0f] rounded-xl p-2 flex-1">
      <select
        name=""
        id=""
        className="outline-none appearance-none bg-transparent"
      >
        <option value="01">01</option>
        <option value="02">02</option>
        <option value="03">03</option>
        <option value="04">04</option>
        <option value="05">05</option>
        <option value="06">06</option>
        <option value="07">07</option>
        <option value="08">08</option>
        <option value="09">09</option>
        <option value="10">10</option>
        <option value="11">10</option>
        <option value="12">12</option>
      </select>
      <span className="">:</span>
      <select
        name=""
        id=""
        className="outline-none appearance-none bg-transparent"
      >
        {[...Array(60)].map((_, index) => {
          return (
            <option key={index} value={index}>
              {index.toString().padStart(2, "0")}
            </option>
          );
        })}
      </select>
      <select
        name=""
        id=""
        className="outline-none appearance-none bg-transparent"
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};
