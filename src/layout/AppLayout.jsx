import React, { useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const AppLayout = () => {
  const [keyword, setKeyword] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const NavButton = ({ to, children }) => (
    <Link to={to}>
      <button className="hover:opacity-50 transition ease">{children}</button>
    </Link>
  );

  const searchByKeyword = (e) => {
    if (e.key === "Enter") {
      navigate(`/movies?q=${keyword}`);
      setKeyword("");
    }
  };

  return (
    <div>
      <div className="relative flex justify-between items-center px-10 bg-gradient-to-b from-[#1F1F1F] to-transparent z-20">
        <div className="flex items-center gap-2">
          <RxHamburgerMenu
            className="text-3xl cursor-pointer md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
          <Link to="/">
            <img className="w-32 py-2" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="flex gap-8 hidden md:flex">
          <NavButton to="/">Home</NavButton>
          <NavButton to="/movies">Movies</NavButton>
        </div>
        <div className="flex items-center gap-1 !z-10">
          <IoSearchOutline
            className="text-2xl cursor-pointer"
            onClick={() => inputRef.current.focus()}
          />
          <input
            ref={inputRef}
            onKeyDown={searchByKeyword}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            className="focus:outline-none bg-transparent w-0 focus:w-52 max-sm:focus:w-32 transition-all ease-in-out duration-300"
            placeholder="Search"
          />
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-52 bg-[#21252A] text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="flex justify-between items-center p-4">
          <IoClose
            className="text-2xl cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
        <div className="flex flex-col p-4 gap-3">
          <NavButton to="/">Home</NavButton>
          <NavButton to="/movies">Movies</NavButton>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
