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

  // Close dropdown when clicking outside of it
  React.useEffect(() => {
    function handleClickOutside(event) {
      const dropdown = document.getElementById("dropdown");
      if (dropdown && !dropdown.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex justify-between items-center bg-yellow-300 p-5 md:p-10">
      <Logo />

      <div className="flex gap-3 relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          type="button"
          className="flex items-center gap-3"
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
        </button>

        {showDropdown && (
          <div
            id="dropdown"
            className="absolute z-10 right-0 w-48 bg-white shadow rounded p-3"
          >
            <div className="flex flex-col gap-3">
              <Link
                to="/dataJamaah"
                className="flex gap-2 hover:bg-yellow-300 p-2 rounded-md items-center"
              >
                <FaFileInvoice />
                <span>Data Jamaah</span>
              </Link>
              <button
                type="button"
                onClick={btnlogout}
                className="flex hover:bg-red-500 p-2 rounded-md gap-2 items-center w-full text-left"
              >
                <FaPowerOff />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
