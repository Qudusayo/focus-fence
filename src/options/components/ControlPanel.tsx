import React, { useEffect } from "react";
import { FiPlus, FiPaperclip } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "../lib/utils";
import Switcher from "./Switcher";
import Divider from "./Divider";
import Logo from "./Logo";
import Schedule from "./Schedule";
import { extractDomain, isValidUrl, notify } from "../functions";
import { FaPlus } from "react-icons/fa6";
import Dropzone from "react-dropzone";

interface IvisitedSites {
  [key: string]: {
    count: number;
    faviconUrl: string;
  };
}

export default function ControlPanel({
  mode,
}: {
  mode: "work" | "study" | "fun";
}) {
  const [state, setState] = useState<"blacklist" | "whitelist">("blacklist");
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
  const [visitedSites, setVisitedSites] = useState<IvisitedSites[]>([]);
  const [redirectURL, setRedirectURL] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const location = useLocation();

  useEffect(() => {
    let searchParams = new URLSearchParams(location.search);
    let mode = searchParams.get("mode");
    if (mode) {
      setState(mode as "blacklist" | "whitelist");
    }
  }, [location]);

  const [linkInput, setLinkInput] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (redirectPage.active) {
      if (personalizedBlockedPage.active) {
        setPersonalizedBlockedPage((personalizedVals) => {
          return { ...personalizedVals, active: false };
        });
      }
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
    // chrome.storage.sync.get([`${mode}_blacklist`], function (result) {
    //   const blacklist = result[`${mode}_blacklist`];

    //   if (blacklist && blacklist?.length > 0) {
    //     console.log(blacklist);
    //     setList(blacklist);
    //   }
    // });

    // Get mode state and use it to set the state and the list
    chrome.storage.sync.get([`${mode}_state`], function (result) {
      const state = result[`${mode}_state`];
      if (state) {
        setState(state);
      }

      chrome.storage.sync.get([`${mode}_${state}`], function (result) {
        const list = result[`${mode}_${state}`];
        if (list && list?.length > 0) {
          setList(list);
        }
      });
    });

    chrome.storage.sync.get([`${mode}_redirect`], function (result) {
      let redirectObj = result[`${mode}_redirect`];

      if (redirectObj) {
        setRedirectPage((prev) => {
          return {
            ...prev,
            active: redirectObj.active,
            redirect: redirectObj.redirect,
          };
        });
        setRedirectURL(redirectObj.redirect);
      }
    });

    // Get most visited websites
    chrome.storage.sync.get([`${mode}_visitedSites`], function (result) {
      const visitedSites = result[`${mode}_visitedSites`];
      if (visitedSites && Object.keys(visitedSites).length > 0) {
        setVisitedSites(visitedSites);
      }
    });

    // Get current mode
    chrome.storage.sync.get(["currentMode"], function (result) {
      const currentMode = result.currentMode;
      if (currentMode) {
        if (currentMode === mode) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      }
    });
  }, []);

  const controlRedirectUrl = () => {
    if (redirectPage.redirect === "") {
      notify("Please set a redirect URL first", "error");
      return;
    }

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

  const removeURLFromList = (url: string) => {
    chrome.storage.sync.get([`${mode}_${state}`], function (result) {
      const list = result[`${mode}_${state}`];

      if (list && list?.length > 0) {
        const newList = list.filter((item: any) => item.url !== url);
        setList(newList);
        chrome.storage.sync.set({ [`${mode}_${state}`]: newList }, function () {
          notify(`${url} is removed from your ${state}`, "success");
        });
      }
    });
  };

  const addURLToBlacklist = (url: string) => {
    chrome.storage.sync.get([`${mode}_blacklist`], function (result) {
      const blacklist = result[`${mode}_blacklist`];

      if (blacklist && blacklist?.length > 0) {
        // Check if the current url is already in the blacklist
        const isExist = blacklist.find((item: any) => item.url === url);
        if (isExist) {
          notify(`${url} is already in your blacklist`);
          return;
        }

        // Get the favicon of the url from statistics
        const faviconUrl = visitedSites[url].faviconUrl;

        blacklist.push({
          url: url,
          faviconUrl: faviconUrl ? faviconUrl : "",
        });
        chrome.storage.sync.set(
          { [`${mode}_blacklist`]: blacklist },
          function () {
            notify(`${url} is added to your blacklist`, "success");
          }
        );
        setList(blacklist);
      } else {
        chrome.storage.sync.set(
          {
            [`${mode}_blacklist`]: [
              {
                url: url,
                faviconUrl: "",
              },
            ],
          },
          function () {
            notify(`${url} is added to your blacklist`, "success");
            setList([
              {
                url: url,
                faviconUrl: "",
              },
            ]);
          }
        );
      }
    });
  };

  const saveRedirectUrl = () => {
    if (
      !(redirectURL.startsWith("http://") || redirectURL.startsWith("https://"))
    ) {
      notify("URL must start with http:// or https://", "error");
      return;
    }
    if (isValidUrl(redirectURL)) {
      setRedirectPage((prev) => {
        return {
          ...prev,
          redirect: redirectURL,
        };
      });
      chrome.storage.sync.set(
        {
          [`${mode}_redirect`]: {
            active: redirectPage.active,
            redirect: redirectURL,
          },
        },
        function () {
          notify(`Redirect URL (${redirectURL}) is saved`, "success");
        }
      );
    } else {
      notify("Please enter a valid URL", "error");
    }
  };

  const addSiteToList = () => {
    if (
      !(linkInput.startsWith("http://") || linkInput.startsWith("https://"))
    ) {
      notify("URL must start with http:// or https://", "error");
      return;
    }

    if (isValidUrl(linkInput)) {
      chrome.storage.sync.get([`${mode}_${state}`], function (result) {
        const blacklist = result[`${mode}_${state}`];
        if (blacklist && blacklist.length > 0) {
          // Check if the current url is already in the blacklist
          const isExist = blacklist.find(
            (item: any) => item.url === extractDomain(linkInput)
          );
          if (isExist) {
            return;
          }

          blacklist.push({
            url: extractDomain(linkInput),
            faviconUrl: "",
          });
          chrome.storage.sync.set(
            { [`${mode}_${state}`]: blacklist },
            function () {
              notify(`${linkInput} is added to your ${list}`, "success");
            }
          );
          setList(blacklist);
        } else {
          chrome.storage.sync.set(
            {
              [`${mode}_${state}`]: [
                {
                  url: extractDomain(linkInput),
                  faviconUrl: "",
                },
              ],
            },
            function () {
              notify(`${linkInput} is added to your ${list}`, "success");
              setList([
                {
                  url: extractDomain(linkInput),
                  faviconUrl: "",
                },
              ]);
            }
          );
        }
      });
    } else {
      notify("Please enter a valid URL", "error");
    }
  };

  const modeActiveHandler = () => {
    setIsActive((active) => !active);
    if (!isActive) {
      chrome.storage.sync.set({ currentMode: mode });
    } else {
      chrome.storage.sync.set({ currentMode: "" });
    }
  };

  const activeStateHandler = (state: "blacklist" | "whitelist") => {
    setState(state);
    chrome.storage.sync.set({ [`${mode}_state`]: state });

    chrome.storage.sync.get([`${mode}_${state}`], function (result) {
      const list = result[`${mode}_${state}`];

      if (list && list?.length > 0) {
        setList(list);
      } else {
        setList([]);
      }
    });
  };

  return (
    <div className="text-white w-4/5 mx-auto">
      <div className="flex items-center gap-4 justify-center mb-8">
        <h2 className="text-center text-4xl font-bold">
          {mode[0].toUpperCase() + mode.slice(1)} Mode
        </h2>
        <Switcher11 setState={activeStateHandler} state={state} />
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
            <Switcher isActive={isActive} setIsActive={modeActiveHandler} />
          </div>
        </div>
        <Divider />
        <div>
          <div>
            <h2 className="font-bold text-2xl">
              Your {state === "whitelist" ? "whitelist" : "blacklist"}:
            </h2>
            <span className="text-sm">
              Add or remove websites from your{" "}
              {state === "whitelist" ? "whitelist" : "blacklist"}.
            </span>
          </div>
          <div className="flex gap-4 my-6">
            <input
              type="text"
              className="border border-[#808080] rounded-2xl text-base px-4 py-3 flex-grow outline-none bg-transparent"
              placeholder={`Type the website you would like to ${
                state === "whitelist" ? "allow" : "block"
              }.`}
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
            />
            <button
              className={cn(
                "px-5 py-3 rounded-2xl w-max flex items-center gap-2",
                state === "blacklist" &&
                  "bg-gradient-to-r from-[#DD0043] to-[#FF7C60]",
                state === "whitelist" && "bg-white text-black"
              )}
              onClick={addSiteToList}
            >
              <FiPlus />
              <span>
                Add to {state === "whitelist" ? "Whitelist" : "blacklist"}
              </span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 max-h-[345px] overflow-auto">
            {list.map((item, i) => {
              return (
                <SiteLabel
                  key={i}
                  url={item.url}
                  type={state === "blacklist" ? "revoked" : "allowed"}
                  faviconUrl={item.faviconUrl}
                  callback={removeURLFromList}
                />
              );
            })}
          </div>
        </div>
        {state === "blacklist" && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-bold text-2xl">Most visited websites:</h2>
              <span className="text-sm">
                You spend a lot of time in these websites. Consider adding them
                to your blacklist to save some time.
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 max-h-[200px] overflow-auto">
              {Object.keys(visitedSites)
                .sort((a, b) => visitedSites[b].count - visitedSites[a].count)
                .map((item, i) => {
                  return (
                    <SiteLabel
                      key={i}
                      url={item}
                      type="visited"
                      faviconUrl={visitedSites[item].faviconUrl}
                      callback={addURLToBlacklist}
                    />
                  );
                })}
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
                is on your blacklist. This doesn&apos;t work with the block page
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
              value={redirectURL}
              onChange={(e) => setRedirectURL(e.target.value)}
            />
            <span className="absolute inset-y-0 right-0 flex items-center p-2">
              <button
                type="button"
                className="p-1 focus:outline-none focus:shadow-outline text-white bg-gradient-to-r from-[#DD0043] to-[#FF7C60] px-5 py-2 rounded-xl w-max flex items-center gap-2"
                onClick={saveRedirectUrl}
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
                you try to access some whebsite that is in your blacklist.
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
          <Dropzone
            onDrop={(acceptedFiles) => {
              if (acceptedFiles.length > 1) {
                notify("Please upload only one image", "error");
                return;
              }
              const file = acceptedFiles[0];
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                const base64 = reader.result;
                setPersonalizedBlockedPage((prev) => {
                  return {
                    ...prev,
                    image: base64 as string,
                  };
                });
              };
              reader.onerror = function (error) {
                console.log("Error: ", error);
              };
            }}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div className="grid grid-cols-4 gap-4">
                <div
                  {...getRootProps()}
                  className="bg-[#ffffff0d] border border-[#ffffff0d] flex items-center justify-center px-8 rounded-2xl cursor-pointer"
                  style={
                    image
                      ? {
                          backgroundImage: `url(${URL.createObjectURL(image)})`,
                        }
                      : {}
                  }
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
            )}
          </Dropzone>
        </div>
      </div>
    </div>
  );
}

const SiteLabel = ({
  url,
  faviconUrl,
  type,
  callback,
}: {
  url: string;
  faviconUrl: string;
  type: "visited" | "revoked" | "allowed";
  callback: (url: string) => void;
}) => {
  return (
    <div className="bg-[#ffffff0d] border border-[#ffffff0f] flex items-center gap-4 py-2 px-4 rounded-xl h-14">
      {/* <FaWhatsappSquare size={35} fill="#4AC959" className="text-white" /> */}
      <Logo
        src={faviconUrl}
        alt=""
        type={type}
        className="w-8 h-8 object-cover object-center"
      />

      <span className="flex-grow">{url}</span>
      {type === "visited" && (
        <FaPlus
          size={20}
          className="cursor-pointer"
          onClick={() => callback(url)}
        />
      )}
      {(type === "revoked" || type === "allowed") && (
        <RiDeleteBin6Line
          size={20}
          className="cursor-pointer hover:text-red-500 transition-colors"
          onClick={() => callback(url)}
        />
      )}
    </div>
  );
};

const Switcher11 = ({
  state,
  setState,
}: {
  state: "blacklist" | "whitelist";
  setState: (state: "blacklist" | "whitelist") => void;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    if (state === "blacklist") {
      setState("whitelist");
    } else {
      setState("blacklist");
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
            state === "blacklist"
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
