import logo from "../assets/logo.svg";
import { IoSettingsOutline, IoInformationCircleOutline } from "react-icons/io5";
import { FaRegChartBar, FaRegSmile } from "react-icons/fa";
import { FiBriefcase, FiBook, FiCompass } from "react-icons/fi";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-[#ffffff1a] rounded-3xl p-12 text-white flex flex-col">
      <div className="flex-1 flex flex-col gap-10">
        <div className="flex gap-4">
          <img src={logo} alt="logo" />
          <div>
            <h2 className="text-3xl font-bold">FocusFence</h2>
            <span className="text-xs">by WorkStack</span>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">General Options</h2>
          <ul className="flex flex-col mt-2 gap-2">
            <Link to="/">
              <FaRegChartBar />
              <span>Dashboard</span>
            </Link>
            <Link to="/settings">
              <IoSettingsOutline />
              <span>Settings</span>
            </Link>
            <Link to="/tutorial">
              <IoInformationCircleOutline />
              <span>Tutorial</span>
            </Link>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Profile Configuration</h2>
          <ul className="flex flex-col mt-2 gap-2">
            <Link to="/work">
              <FiBriefcase />
              <span>Work</span>
            </Link>
            <Link to="/study">
              <FiBook />
              <span>Study</span>
            </Link>
            <Link to="/fun">
              <FaRegSmile />
              <span>Fun</span>
            </Link>
          </ul>
        </div>
      </div>
      <div className="text-center">
        <p className="mb-2">
          <span>Made By </span>
          <span className="text-2xl font-bold">WorkStack</span>
        </p>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://google.com"
          className="flex bg-[#ffffff08] rounded-xl p-3 border border-[#ffffff1f] gap-4 w-full justify-center items-center"
        >
          <FiCompass size={25} />
          <span>Discover more apps</span>
        </a>
      </div>
    </div>
  );
}

const Link = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  to: string;
  props?: typeof NavLink;
}) => {
  return (
    <li>
      <NavLink
        {...props}
        className={({ isActive }) =>
          `py-3 px-4 cursor-pointer flex items-center gap-2 text-lg rounded-xl ${
            isActive && " bg-gradient-to-r from-[#DD0043] to-[#FF7C60]"
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
};
