import React from "react";
import Logo from "./Logo";
import {
  FaUser,
  FaSortUp,
  FaSortDown,
  FaFileInvoice,
  FaPowerOff,
} from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/reducers/auth";
import { useDispatch } from "react-redux";

function Navbar() {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  function btnlogout() {
    dispatch(logout(token));
  }
  return (
    <>
      <nav className="flex justify-between items-center bg-yellow-300 p-10">
        <Logo />

        <div className="flex gap-3">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            type="button"
            className="flex items-center gap-3 relative"
          >
            <div className="flex rounded-full overflow-hidden text-[40px]">
              <FaUser />
            </div>
            <div>
              {!showDropdown && (
                <FaSortDown className="text-2xl text-[#4F5665]" />
              )}
              {showDropdown && <FaSortUp className="text-2xl text-[#4F5665]" />}
            </div>
            {showDropdown && (
              <div className="absolute -bottom-[115px] p-5 right-0 w-full min-w-[200px] bg-white shadow rounded">
                <div className="flex flex-col gap-5">
                  <Link
                    to="/dataJamaah"
                    className="flex gap-5 hover:bg-yellow-300 p-1 rounded-md items-center"
                  >
                    <FaFileInvoice />
                    <span>Data Jamaah</span>
                  </Link>
                  <button
                    type="button"
                    onClick={btnlogout}
                    className="flex  hover:bg-red-500 p-1 rounded-md gap-5 items-center"
                  >
                    <FaPowerOff />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
