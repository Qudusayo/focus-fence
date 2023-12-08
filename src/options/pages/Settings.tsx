import React, { useState } from "react";
import Switcher from "../components/Switcher";
import Layout from "../layout/Layout";

export default function Settings() {
  return (
    <Layout>
      <div className="text-white w-4/5 mx-auto">
        <h2 className="text-center text-4xl font-bold mb-8">Settings</h2>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-8 border border-[#ffffff1f] bg-[#ffffff08] rounded-3xl p-10">
            <div>
              <h2 className="font-bold text-2xl mb-2">Language</h2>
              <span className="text-sm">
                Change the language of the app. Doesn&apos;t affect functions.
              </span>
            </div>
            <div className="flex items-center justify-end">
              <Select />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 border border-[#ffffff1f] bg-[#ffffff08] rounded-3xl p-10">
            <div>
              <h2 className="font-bold text-2xl mb-2">Time format</h2>
              <span className="text-sm">Change the time format:</span>
            </div>
            <div className="flex items-center justify-end">
              <Switcher11 />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 border border-[#ffffff1f] bg-[#ffffff08] rounded-3xl p-10">
            <div>
              <h2 className="font-bold text-2xl mb-2">
                Dificulty to change settings
              </h2>
              <span className="text-sm">
                Enhance the difficulty to add websites to your whitelists,
                remove websites from blocklist, change between whitelist and
                blacklist etc. The higher the number, more captchas will be
                requested before allowing the change. <br />
                <br />
                This is good for preventing you from change the settings to
                procrastinate, such as turning off work mode to access some
                social media for example.
              </span>
            </div>
            <div className="flex items-center justify-end">
              {/* <Switcher /> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const Select = () => {
  return (
    <>
      <select className="h-12 w-fit bg-[#ffffff0d] border border-[#ffffff0d] rounded-xl border-r-8 border-r-transparent px-4 text-sm outline outline-neutral-700 min-w-[200px]">
        <option value="US">English</option>
        <option value="CA">Portugese</option>
        <option value="FR">French</option>
      </select>
    </>
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
          className={`block space-x-[6px] rounded-lg py-2 px-[18px] text-sm font-medium w-40 text-center ${
            !isChecked
              ? "text-primary bg-gradient-to-r from-[#DD0043] to-[#FF7C60]"
              : "text-body-color"
          }`}
        >
          12h (am/pm)
        </span>
        <span
          className={`block space-x-[6px] rounded-lg py-2 px-[18px] text-sm font-medium  w-20 text-center ${
            isChecked
              ? "text-primary bg-gradient-to-r from-[#DD0043] to-[#FF7C60]"
              : "text-body-color"
          }`}
        >
          24h
        </span>
      </label>
    </>
  );
};
