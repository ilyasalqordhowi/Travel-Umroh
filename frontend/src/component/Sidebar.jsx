import React from "react";
import { FaDatabase } from "react-icons/fa6";
import { FaRightFromBracket } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { logout } from "../redux/reducers/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Sidebar() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  function btnlogout() {
    dispatch(logout(token));
  }
  return (
    <div className="flex w-1/4 flex-col pl-20 pt-32 pr-2  font-bold text-[20px]  gap-10 bg-[#BCF2F6] h-screen">
      <Link
        to={"/dataJamaah"}
        className="flex items-center hover:bg-yellow-300 p-2  rounded-lg gap-2"
      >
        <FaDatabase />
        <h1 className="text-start">Data Jamaah</h1>
      </Link>
      <button
        onClick={btnlogout}
        className="flex items-center hover:bg-red-500 p-2 rounded-lg gap-2"
      >
        <FaRightFromBracket />
        <h2>Logout</h2>
      </button>
    </div>
  );
}
export default Sidebar;
