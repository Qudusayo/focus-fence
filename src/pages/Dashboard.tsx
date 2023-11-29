import Layout from "../layout/Layout";
import { cn } from "../lib/utils";
import { BiBlock, BiSignal4, BiTimeFive } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { FaRegSmile } from "react-icons/fa";
import { FiBriefcase, FiBook } from "react-icons/fi";

export default function Dashboard() {
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
              <div className="bg-gradient-to-r from-[#DD0043] to-[#FF7C60] rounded-3xl p-6 text-center">
                <h2 className="font-bold text-3xl">Work</h2>
                <span className="text-sm block">Active now</span>
                <span className="text-sm block">Until 9:00pm</span>
              </div>
              <div className="bg-[#ffffff08] border border-[#ffffff1f] rounded-3xl p-6 text-center">
                <h2 className="font-bold text-3xl">Study</h2>
                <span className="text-sm block">Inactive now</span>
                <span className="text-sm block">Tomorrow - 7am to 9am</span>
              </div>
              <div className="bg-[#ffffff08] border border-[#ffffff1f] rounded-3xl p-6 text-center">
                <h2 className="font-bold text-3xl">Fun</h2>
                <span className="text-sm block">Inactive</span>
              </div>
            </div>
          </div>

          <div className="border border-[#ffffff1f] bg-[#ffffff08] rounded-3xl p-10">
            <h2 className="font-bold text-2xl mb-4 flex items-center gap-4">
              <FiBriefcase />
              <span>Work mode status</span>
            </h2>

            <div className="grid grid-cols-2 gap-12">
              <div className="grid grid-cols-7 gap-2">
                <DayChart day="Mon" count={53} />
                <DayChart day="Tue" count={42} />
                <DayChart day="Wed" count={35} />
                <DayChart day="Thu" count={49} />
                <DayChart day="Fri" count={69} isToday />
                <DayChart day="Sat" count={0} />
                <DayChart day="Sun" count={0} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiBlock />
                    <span>69</span>
                  </h2>
                  <span className="text-xs block">Blocked websites today</span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiSignal4 />
                    <span>42</span>
                  </h2>
                  <span className="text-xs block">
                    Average blocked websites
                  </span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <RxCountdownTimer />
                    <span>3h15</span>
                  </h2>
                  <span className="text-xs block">Estim. time saved today</span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiTimeFive />
                    <span>2h00</span>
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
                <DayChart day="Mon" count={53} />
                <DayChart day="Tue" count={42} />
                <DayChart day="Wed" count={35} />
                <DayChart day="Thu" count={49} />
                <DayChart day="Fri" count={69} isToday />
                <DayChart day="Sat" count={0} />
                <DayChart day="Sun" count={0} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiBlock />
                    <span>69</span>
                  </h2>
                  <span className="text-xs block">Blocked websites today</span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiSignal4 />
                    <span>42</span>
                  </h2>
                  <span className="text-xs block">
                    Average blocked websites
                  </span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <RxCountdownTimer />
                    <span>3h15</span>
                  </h2>
                  <span className="text-xs block">Estim. time saved today</span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiTimeFive />
                    <span>2h00</span>
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
                <DayChart day="Mon" count={53} />
                <DayChart day="Tue" count={42} />
                <DayChart day="Wed" count={35} />
                <DayChart day="Thu" count={49} />
                <DayChart day="Fri" count={69} isToday />
                <DayChart day="Sat" count={0} />
                <DayChart day="Sun" count={0} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiBlock />
                    <span>69</span>
                  </h2>
                  <span className="text-xs block">Blocked websites today</span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiSignal4 />
                    <span>42</span>
                  </h2>
                  <span className="text-xs block">
                    Average blocked websites
                  </span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <RxCountdownTimer />
                    <span>3h15</span>
                  </h2>
                  <span className="text-xs block">Estim. time saved today</span>
                </div>
                <div className="bg-[#ffffff08] rounded-xl px-4 py-5 border border-[#ffffff1f]">
                  <h2 className="font-bold text-xl flex items-center gap-3 mb-1">
                    <BiTimeFive />
                    <span>2h00</span>
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
  count,
  isToday,
}: {
  day: string;
  count: number;
  isToday?: boolean;
}) => {
  return (
    <div className="text-center flex flex-col items-center justify-end gap-2">
      <div
        style={{ height: `${count ? count : 2}%` }}
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
