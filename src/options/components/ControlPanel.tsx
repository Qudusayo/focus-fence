import React, { useEffect } from "react";
import { FiPlus, FiPaperclip } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";
import { useCallback, useState } from "react";
import { cn } from "../lib/utils";
import Switcher from "./Switcher";
import Divider from "./Divider";
import Logo from "./Logo";
import Schedule from "./Schedule";

export default function ControlPanel({
  mode,
}: {
  mode: "work" | "study" | "fun";
}) {
  const [state, setState] = useState<"blocklist" | "whitelist">("blocklist");
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
  const [list, setList] = useState<
    {
      faviconUrl: string;
      url: string;
    }[]
  >([]);
  const [redirectPage, setRedirectPage] = useState({
    active: false,
    redirect: "",
  });
  const [personalizedBlockedPage, setPersonalizedBlockedPage] = useState({
    active: false,
    image: "",
    textContent: "",
  });
  const location = useLocation();

  useEffect(() => {
    let searchParams = new URLSearchParams(location.search);
    let mode = searchParams.get("mode");
    if (mode) {
      setState(mode as "blocklist" | "whitelist");
    }
  }, [location]);

  useEffect(() => {
    if (redirectPage.active) {
      if (personalizedBlockedPage.active) {
        setPersonalizedBlockedPage((personalizedVals) => {
          return { ...personalizedVals, active: false };
        });
      }
      // Update the storage to set Active value to true and active url to google.com
      chrome.storage.sync.set(
        {
          [`${mode}_redirect`]: {
            active: true,
            redirect: "https://www.google.com",
          },
        },
        function () {
          console.log("Value is set to " + redirectPage.redirect);
        }
      );
    }
  }, [redirectPage]);
  useEffect(() => {
    if (personalizedBlockedPage.active) {
      if (redirectPage.active)
        setRedirectPage((redirectVals) => {
          return { ...redirectVals, active: false };
        });
    }
  }, [personalizedBlockedPage]);

  useEffect(() => {
    chrome.storage.sync.get([`${mode}_blacklist`], function (result) {
      const blacklist = result[`${mode}_blacklist`];

      if (blacklist && blacklist?.length > 0) {
        console.log(blacklist);
        setList(blacklist);
      }
    });

    chrome.storage.sync.get([`${mode}_redirect`], function (result) {
      let redirectObj = result[`${mode}_redirect`];

      if (redirectObj && redirectObj.active) {
        setRedirectPage((prev) => {
          return {
            ...prev,
            active: true,
            redirect: redirectObj.redirect,
          };
        });
      }
    });
  }, []);

  const controlRedirectUrl = () => {
    setRedirectPage((prev) => {
      return {
        ...prev,
        active: !prev.active,
      };
    });
    chrome.storage.sync.set(
      {
        [`${mode}_redirect`]: {
          active: !redirectPage.active,
          redirect: redirectPage.redirect,
        },
      },
      function () {
        console.log("Value is set to " + redirectPage.redirect);
      }
    );
  };

  const removeURLFromBlacklist = (url: string) => {
    chrome.storage.sync.get([`${mode}_blacklist`], function (result) {
      const blacklist = result[`${mode}_blacklist`];

      if (blacklist && blacklist?.length > 0) {
        const newBlacklist = blacklist.filter((item: any) => item.url !== url);
        console.log(newBlacklist);
        setList(newBlacklist);
        chrome.storage.sync.set(
          { [`${mode}_blacklist`]: newBlacklist },
          function () {
            console.log("Value is set to " + newBlacklist);
          }
        );
      }
    });
  };

  return (
    <div className="text-white w-4/5 mx-auto">
      <div className="flex items-center gap-4 justify-center mb-8">
        <h2 className="text-center text-4xl font-bold">
          {mode[0].toUpperCase() + mode.slice(1)} Mode
        </h2>
        <Switcher11 setState={setState} state={state} />
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
            {/* <Switcher /> */}
          </div>
        </div>
        <Divider />
        <div>
          <div>
            <h2 className="font-bold text-2xl">
              Your {state === "whitelist" ? "whitelist" : "blocklist"}:
            </h2>
            <span className="text-sm">
              Add or remove websites from your{" "}
              {state === "whitelist" ? "whitelist" : "blocklist"}.
            </span>
          </div>
          <div className="flex gap-4 my-6">
            <input
              type="text"
              className="border border-[#808080] rounded-2xl text-base px-4 py-3 flex-grow outline-none bg-transparent"
              placeholder={`Type the website you would like to ${
                state === "whitelist" ? "allow" : "block"
              }.`}
            />
            <button
              className={cn(
                "px-5 py-3 rounded-2xl w-max flex items-center gap-2",
                state === "blocklist" &&
                  "bg-gradient-to-r from-[#DD0043] to-[#FF7C60]",
                state === "whitelist" && "bg-white text-black"
              )}
            >
              <FiPlus />
              <span>
                Add to {state === "whitelist" ? "Whitelist" : "Blocklist"}
              </span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 max-h-[345px] overflow-auto">
            {list.map((item) => {
              return (
                <SiteLabel
                  url={item.url}
                  faviconUrl={item.faviconUrl}
                  removeURLFromBlacklist={removeURLFromBlacklist}
                />
              );
            })}
          </div>
        </div>
        {state === "blocklist" && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-bold text-2xl">Most visited websites:</h2>
              <span className="text-sm">
                You spend a lot of time in these websites. Consider adding them
                to your blacklist to save some time.
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 max-h-[200px] overflow-auto">
              {/* <SiteLabel url="facebook.com" />
            <SiteLabel url="instagram.com" />
            <SiteLabel url="tiktok.com" />
            <SiteLabel url="9gag.com" />
            <SiteLabel url="twitter.com" />
            <SiteLabel url="x.com" /> */}
            </div>
          </div>
        )}
        <Divider />
        <Schedule />
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
              <Switcher
                isActive={redirectPage.active}
                setIsActive={controlRedirectUrl}
              />
            </div>
          </div>
          <div className="relative text-gray-600 focus-within:text-gray-400 w-full">
            <input
              type="text"
              className="border border-[#808080] rounded-2xl text-base px-4 py-3 w-full outline-none bg-transparent pr-16 pl-4 focus:outline-none"
              placeholder="Type the website you'll like to redirect to here..."
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <button
                type="submit"
                className="p-1 focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </span>
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
              <Switcher
                isActive={personalizedBlockedPage.active}
                setIsActive={() => {
                  setPersonalizedBlockedPage((prev) => {
                    return {
                      ...prev,
                      active: !prev.active,
                    };
                  });
                }}
              />
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

const SiteLabel = ({
  url,
  faviconUrl,
  removeURLFromBlacklist,
}: {
  url: string;
  faviconUrl: string;
  removeURLFromBlacklist: (url: string) => void;
}) => {
  return (
    <div className="bg-[#ffffff0d] border border-[#ffffff0f] flex items-center gap-4 py-2 px-4 rounded-xl h-14">
      {/* <FaWhatsappSquare size={35} fill="#4AC959" className="text-white" /> */}
      <Logo
        src={faviconUrl}
        alt=""
        className="w-8 h-8 object-cover object-center"
      />
      <span className="flex-grow">{url}</span>
      <RiDeleteBin6Line
        size={20}
        className="cursor-pointer hover:text-red-500 transition-colors"
        onClick={() => removeURLFromBlacklist(url)}
      />
    </div>
  );
};

const Switcher11 = ({
  state,
  setState,
}: {
  state: "blocklist" | "whitelist";
  setState: React.Dispatch<React.SetStateAction<"blocklist" | "whitelist">>;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  // useEffect(() => {
  //   if (isChecked) {
  //     setState("whitelist");
  //   } else {
  //     setState("blocklist");
  //   }

  //   if (state === "whitelist") {
  //     setIsChecked(true);
  //   } else {
  //     setIsChecked(false);
  //   }
  // }, [isChecked, state]);

  const handleCheckboxChange = () => {
    if (state === "blocklist") {
      setState("whitelist");
    } else {
      setState("blocklist");
    }
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
            state === "blocklist"
              ? "text-primary bg-gradient-to-r from-[#DD0043] to-[#FF7C60]"
              : "text-body-color"
          }`}
        >
          Blocklist
        </span>
        <span
          className={`block space-x-[6px] rounded-lg py-3 px-[18px] text-sm font-medium w-32 text-center ${
            state === "whitelist" ? "text-black bg-white" : "text-body-color"
          }`}
        >
          Whitelist
        </span>
      </label>
    </>
  );
};
