import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { cn } from "../lib/utils";
import { BiBlock, BiSignal4, BiTimeFive } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { FaRegSmile } from "react-icons/fa";
import { FiBriefcase, FiBook } from "react-icons/fi";

type modes = "work" | "study" | "fun";

const today = new Date().toLocaleDateString();
export default function Dashboard() {
  const [statistics, setStatistics] = useState<{
    work: {
      [key: string]: {
        blockedSites: [];
        blockedWebsites: 0;
      };
    };
    study: {
      [key: string]: {
        blockedSites: [];
        blockedWebsites: 0;
      };
    };
    fun: {
      [key: string]: {
        blockedSites: [];
        blockedWebsites: 0;
      };
    };
  }>();
  const [currentMode, setCurrentMode] = useState<modes>("" as modes);

  useEffect(() => {
    chrome.storage.sync.get(["statistics"], function (result) {
      let statistics = result.statistics;
      // setStatistics(statistics);
      // Map statistics to the state
      setStatistics({
        ...statistics,
      });
    });

    chrome.storage.onChanged.addListener(function (changes, namespace) {
      for (var key in changes) {
        if (key === "statistics") {
          let statistics = changes[key].newValue;
          setStatistics(statistics);
        }
      }
    });

    chrome.storage.sync.get(["currentMode"], function (result) {
      const currentMode = result.currentMode;
      setCurrentMode(currentMode ?? "");
    });
  }, []);

  return (
    <Layout>
      <div className="text-white w-4/5 mx-auto">
        <h2 className="text-center text-4xl font-bold mb-8">Dashboard</h2>
        <div className="flex flex-col gap-8">
          <div className="border border-[#ffffff1f] bg-[#ffffff08] rounded-3xl p-10">
            <h2 className="font-bold text-2xl mb-4 flex items-center gap-4">
              <BiTimeFive />
              <span>Schedule status</span>
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <StatusCard
                isActive={currentMode === "work"}
                title="Work"
                status="Active now"
                time="Until 9:00pm"
              />
              <StatusCard
                isActive={currentMode === "study"}
                title="Study"
                status="Inactive now"
                time="Tomorrow - 7am to 9am"
              />
              <StatusCard
                isActive={currentMode === "fun"}
                title="Fun"
                status="Inactive"
                time=""
              />
            </div>
          </div>

          <div className="border border-[#ffffff1f] bg-[#ffffff08] rounded-3xl p-10">
            <h2 className="font-bold text-2xl mb-4 flex items-center gap-4">
              <FiBriefcase />
              <span>Work mode status</span>
            </h2>

            <div className="grid grid-cols-2 gap-12">
              <div className="grid grid-cols-7 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => {
                    return <DayChart day={day} mode="work" key={day} />;
                  }
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiBlock />
                    <span>
                      {statistics?.work
                        ? statistics?.work[today]?.blockedWebsites ?? 0
                        : 0}
                    </span>
                  </h2>
                  <span className="text-xs block">Blocked websites today</span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiSignal4 />
                    <span>
                      {statistics?.work
                        ? [
                            ...new Set(
                              statistics?.work[today]?.blockedSites ?? []
                            ),
                          ].length
                        : 0}
                    </span>
                  </h2>
                  <span className="text-xs block">
                    Average blocked websites
                  </span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <RxCountdownTimer />
                    <span>0</span>
                  </h2>
                  <span className="text-xs block">Estim. time saved today</span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiTimeFive />
                    <span>0</span>
                  </h2>
                  <span className="text-xs block">Average est. time saved</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-[#ffffff1f] bg-[#ffffff08] rounded-3xl p-10">
            <h2 className="font-bold text-2xl mb-4 flex items-center gap-4">
              <FiBook />
              <span>Study mode status</span>
            </h2>

            <div className="grid grid-cols-2 gap-12">
              <div className="grid grid-cols-7 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => {
                    return <DayChart day={day} mode="study" key={day} />;
                  }
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiBlock />
                    <span>
                      {statistics?.study
                        ? statistics?.study[today]?.blockedWebsites ?? 0
                        : 0}
                    </span>
                  </h2>
                  <span className="text-xs block">Blocked websites today</span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiSignal4 />
                    <span>
                      {statistics?.study
                        ? [
                            ...new Set(
                              statistics?.study[today]?.blockedSites ?? []
                            ),
                          ].length
                        : 0}
                    </span>
                  </h2>
                  <span className="text-xs block">
                    Average blocked websites
                  </span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <RxCountdownTimer />
                    <span>0</span>
                  </h2>
                  <span className="text-xs block">Estim. time saved today</span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiTimeFive />
                    <span>0</span>
                  </h2>
                  <span className="text-xs block">Average est. time saved</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-[#ffffff1f] bg-[#ffffff08] rounded-3xl p-10">
            <h2 className="font-bold text-2xl mb-4 flex items-center gap-4">
              <FaRegSmile />
              <span>Fun mode status</span>
            </h2>

            <div className="grid grid-cols-2 gap-12">
              <div className="grid grid-cols-7 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => {
                    return <DayChart day={day} mode="fun" key={day} />;
                  }
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiBlock />
                    <span>
                      {statistics?.fun
                        ? statistics?.fun[today]?.blockedWebsites ?? 0
                        : 0}
                    </span>
                  </h2>
                  <span className="text-xs block">Blocked websites today</span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiSignal4 />
                    <span>
                      {statistics?.fun
                        ? Math.floor(
                            statistics?.fun[today]?.blockedWebsites /
                              [
                                ...new Set(
                                  statistics?.fun[today]?.blockedSites ?? []
                                ),
                              ].length
                          )
                        : 0}
                    </span>
                  </h2>
                  <span className="text-xs block">
                    Average blocked websites
                  </span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <RxCountdownTimer />
                    <span>0</span>
                  </h2>
                  <span className="text-xs block">Estim. time saved today</span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiTimeFive />
                    <span>0</span>
                  </h2>
                  <span className="text-xs block">Average est. time saved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const DayChart = ({
  day,
  mode,
}: {
  day: string;
  mode?: "work" | "study" | "fun";
}) => {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date().getDay();
    const shortDay = daysOfWeek[today];
    setIsToday(shortDay === day);

    let dayIndex = daysOfWeek.indexOf(day) === 0 ? 7 : daysOfWeek.indexOf(day);
    let dayInterval = dayIndex - (today === 0 ? 7 : today);

    const td = new Date();
    const daysAgo = new Date(td);
    daysAgo.setDate(td.getDate() + dayInterval);

    // Get blocked websites for the daysAgo from the chrome storage
    chrome.storage.sync.get(["statistics"], function (result) {
      let statistics = result.statistics;
      let blockedWebsites = 0;
      if (mode === "work") {
        blockedWebsites =
          statistics?.work && statistics?.work[daysAgo.toLocaleDateString()]
            ? statistics?.work[daysAgo.toLocaleDateString()]?.blockedWebsites
            : 0;
      } else if (mode === "study") {
        blockedWebsites =
          statistics?.study && statistics?.study[daysAgo.toLocaleDateString()]
            ? statistics?.study[daysAgo.toLocaleDateString()]?.blockedWebsites
            : 0;
      } else if (mode === "fun") {
        blockedWebsites =
          statistics?.fun && statistics?.fun[daysAgo.toLocaleDateString()]
            ? statistics?.fun[daysAgo.toLocaleDateString()]?.blockedWebsites
            : 0;
      }
      setCount(blockedWebsites);
    });

    // Accumulate blocked websites for the daysAgo from the chrome storage
    chrome.storage.sync.get(["statistics"], function (result) {
      let statistics = result.statistics;
      let totalBlockedWebsitesForPastDays = 0;
      for (let i = 1; i <= today; i++) {
        let dayInterval = i - today;
        const td = new Date();
        const daysAgo = new Date(td);
        daysAgo.setDate(td.getDate() + dayInterval);

        if (mode === "work") {
          totalBlockedWebsitesForPastDays +=
            statistics?.work && statistics?.work[daysAgo.toLocaleDateString()]
              ? statistics?.work[daysAgo.toLocaleDateString()]?.blockedWebsites
              : 0;
        } else if (mode === "study") {
          totalBlockedWebsitesForPastDays +=
            statistics?.study && statistics?.study[daysAgo.toLocaleDateString()]
              ? statistics?.study[daysAgo.toLocaleDateString()]?.blockedWebsites
              : 0;
        } else if (mode === "fun") {
          totalBlockedWebsitesForPastDays +=
            statistics?.fun && statistics?.fun[daysAgo.toLocaleDateString()]
              ? statistics?.fun[daysAgo.toLocaleDateString()]?.blockedWebsites
              : 0;
        }
      }
      setTotalCount(totalBlockedWebsitesForPastDays);
    });
  }, [day]);

  return (
    <div className="text-center flex flex-col items-center justify-end gap-2">
      <div
        style={{
          height: `${
            Math.floor((count / totalCount) * 100) > 2
              ? Math.floor((count / totalCount) * 100)
              : 2
          }%`,
        }}
        className={cn(
          "border border-3 border-[#ffffff26] rounded-lg w-full text-center",
          isToday
            ? "bg-gradient-to-r from-[#DD0043] to-[#FF7C60]"
            : "bg-[#ffffff26]"
        )}
      ></div>
      <span className="text-sm block">{day}</span>
      <span className="text-sm block">{count}</span>
    </div>
  );
};

const StatusCard = ({
  isActive,
  title,
  status,
  time,
}: {
  isActive: boolean;
  title: string;
  status: string;
  time: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-3xl p-6 text-center",
        isActive
          ? "bg-gradient-to-r from-[#DD0043] to-[#FF7C60]"
          : "bg-[#ffffff08] border border-[#ffffff1f]"
      )}
    >
      <h2 className="font-bold text-3xl">{title}</h2>
      <span className="text-sm block">{status}</span>
      <span className="text-sm block">{time}</span>
    </div>
  );
};
