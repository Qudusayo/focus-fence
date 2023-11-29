import { FiPlus, FiPaperclip } from "react-icons/fi";
import { FaWhatsappSquare } from "react-icons/fa";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { cn } from "../lib/utils";
import Switcher from "./Switcher";
import Divider from "./Divider";

export default function ControlPanel({
  mode,
}: {
  mode: "work" | "study" | "fun";
}) {
  const onDrop = useCallback(
    <T extends File>(
      acceptedFiles: T[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      // Do something with the files
    },
    []
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="text-white w-4/5 mx-auto">
      <div className="flex items-center gap-4 justify-center mb-8">
        <h2 className="text-center text-4xl font-bold">
          {mode[0].toUpperCase() + mode.slice(1)} Mode
        </h2>
        <Switcher11 />
      </div>
      <div className="border border-[#ffffff1f] bg-[#ffffff08] rounded-3xl p-10 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="font-bold text-2xl">Turn on or off</h2>
            <span className="text-sm">
              Turn it on or turn it off. The dificulty to swith between on and
              off can be changed in settings page.
            </span>
          </div>
          <div className="flex items-center justify-end">
            <Switcher />
          </div>
        </div>
        <Divider />
        <div>
          <div>
            <h2 className="font-bold text-2xl">Your blocklist:</h2>
            <span className="text-sm">
              Add or remove websites from your blocklist.
            </span>
          </div>
          <div className="flex gap-4 my-6">
            <input
              type="text"
              className="border border-[#808080] rounded-2xl px-4 py-3 flex-grow outline-none bg-transparent"
              placeholder="Type the website you would like to block."
            />
            <button className="bg-gradient-to-r from-[#DD0043] to-[#FF7C60] px-5 py-3 rounded-2xl w-max flex items-center gap-2">
              <FiPlus />
              <span>Add to Blocklist</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SiteLabel url="facebook.com" />
            <SiteLabel url="instagram.com" />
            <SiteLabel url="tiktok.com" />
            <SiteLabel url="9gag.com" />
            <SiteLabel url="twitter.com" />
            <SiteLabel url="x.com" />
            <SiteLabel url="youtube.com" />
            <SiteLabel url="whatsapp.com" />
            <SiteLabel url="f1.com" />
            <SiteLabel url="f1.com" />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="font-bold text-2xl">Most visited websites:</h2>
            <span className="text-sm">
              You spend a lot of time in these websites. Consider adding them to
              your blacklist to save some time.
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SiteLabel url="facebook.com" />
            <SiteLabel url="instagram.com" />
            <SiteLabel url="tiktok.com" />
            <SiteLabel url="9gag.com" />
            <SiteLabel url="twitter.com" />
            <SiteLabel url="x.com" />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="font-bold text-2xl">Schedule</h2>
              <span className="text-sm">
                Set a schedule for the blacklist be turned on and off
                automatically.
              </span>
            </div>
            <div className="flex items-center justify-end">
              <Switcher />
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
        <Divider />
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="font-bold text-2xl">Redirect Page</h2>
              <span className="text-sm">
                Redirect to somewhere when you try to access some website that
                is on your blocklist. This doesn&apos;t work with the block page
                bellow.
              </span>
            </div>
            <div className="flex items-center justify-end">
              <Switcher />
            </div>
          </div>
          <div>
            <input
              type="text"
              className="border border-[#808080] rounded-2xl px-4 py-3 w-full outline-none bg-transparent"
              placeholder="Type the website you would like to block."
            />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="font-bold text-2xl">Personalized Block Page</h2>
              <span className="text-sm">
                Shows a personalized image and some text of your preference when
                you try to access some whebsite that is in your blocklist.
              </span>
            </div>
            <div className="flex items-center justify-end">
              <Switcher />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div
              {...getRootProps()}
              className="bg-[#ffffff0d] border border-[#ffffff0d] flex items-center justify-center px-8 rounded-2xl cursor-pointer"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the image here ...</p>
              ) : (
                <div className="text-center">
                  <FiPaperclip size={28} className="m-auto" />
                  <p className="font-light text-xs">
                    Click here to upload or drag an image
                  </p>
                </div>
              )}
            </div>
            <textarea
              className="border border-[#808080] rounded-2xl px-4 py-3 w-full outline-none bg-transparent resize-none col-span-3"
              rows={5}
              placeholder="Type the phrase you would like to see in the block page."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const SiteLabel = ({ url }: { url: string }) => {
  return (
    <div className="bg-[#ffffff0d] border border-[#ffffff0f] flex items-center gap-4 py-2 px-4 rounded-xl h-14">
      <FaWhatsappSquare size={35} fill="#4AC959" className="text-white" />
      <span>{url}</span>
    </div>
  );
};

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

const Switcher11 = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-xl bg-[#ffffff0d] p-2">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`block space-x-[6px] rounded-lg py-3 px-[18px] text-sm font-medium w-32 text-center ${
            !isChecked
              ? "text-primary bg-gradient-to-r from-[#DD0043] to-[#FF7C60]"
              : "text-body-color"
          }`}
        >
          Blocklist
        </span>
        <span
          className={`block space-x-[6px] rounded-lg py-3 px-[18px] text-sm font-medium w-32 text-center ${
            isChecked ? "text-black bg-white" : "text-body-color"
          }`}
        >
          Whitelist
        </span>
      </label>
    </>
  );
};
