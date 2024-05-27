import React from "react";
import { useBookData } from "../context/DataContect";
import Page from "./Page";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// const pdf = new jsPDF({
//   orientation: "portrait",
//   unit: "px",
//   format: [canvas.width, canvas.height],
// });

function Sidebar() {
  const { currentPage, textColor, setTextColor } = useBookData();

  return (
    <div className={`fixed h-screen min-h-full min-w-80 bg-gray-200 pl-8 pt-8`}>
      <div>
        <div className="flex flex-col">
          <div>
            <h2 className="font-bold text-xl">
              Page{" "}
              {currentPage === 0
                ? "Front Cover"
                : currentPage === 11
                ? "Back Cover"
                : currentPage}
            </h2>
          </div>
          <div className="flex mt-2">
            <label htmlFor="tColor" className="mr-3">
              Choose Text Color
            </label>
            <input
              type="color"
              name=""
              id="tColor"
              value={textColor}
              onChange={(e) => {
                setTextColor(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <Page />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
