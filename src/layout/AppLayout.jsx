import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const AppLayout = () => {
  const inputRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const NavButton = ({ to, children }) => (
    <Link to={to}>
      <button className="hover:opacity-50 transition ease">{children}</button>
    </Link>
  );
  return (
    <div>
      <div className="relative flex justify-between items-center px-5 !z-10 bg-gradient-to-b from-[#1F1F1F] to-transparent border-b-[0.05rem] border-opacity-50 border-slate-100">
        <div className="nav__left grid grid-cols-2 gap-8 items-center ">
          <div className="flex items-center gap-2">
            <RxHamburgerMenu
              className="text-3xl cursor-pointer md:hidden min-w-10"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
            <Link to="/">
              <img className="logo w-32 py-2 min-w-32" src={logo} alt="logo" />
            </Link>
          </div>
          <div className="flex gap-6 max-md:hidden">
            <NavButton to="/">Home</NavButton>
            <NavButton to="/movies">Movies</NavButton>
          </div>
        </div>
        <div className="search flex items-center gap-1 p-1 has-[:focus]:border has-[:focus]:bg-black has-[:focus]:bg-opacity-50">
          <IoSearchOutline
            className="text-2xl !cursor-pointer"
            onClick={() => inputRef.current.focus()}
          />
          <input
            ref={inputRef}
            type="text"
            className="focus:outline-none bg-transparent focus:w-52 w-0 transition-all ease-in-out duration-300"
            placeholder="Search"
          />
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-52 bg-[#21252A] text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4">
          <IoClose
            className="text-2xl cursor-pointer fixed right-0 top-16"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
        <div className="flex flex-col p-4 gap-3 mt-5">
          <NavButton to="/">Home</NavButton>
          <NavButton to="/movies">Movies</NavButton>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default AppLayout;
