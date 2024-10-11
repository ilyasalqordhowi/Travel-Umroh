import React from "react";
import Loading from "../assets/icon/travel.gif";

function PopUp() {
  return (
    <>
      <div className="absolute flex bg-black/50 w-full h-screen top-0 left-0 items-center justify-center">
        <div className="bg-[#AED2FF] flex items-center gap-[20px] rounded-md p-[10px]">
          <img className="w-[100px] " src={Loading}></img>
        </div>
      </div>
    </>
  );
}
export default PopUp;
