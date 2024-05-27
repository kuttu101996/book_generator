import React, { useState } from "react";
import Pagination from "./PageStep";
import { useBookData } from "../context/DataContect";
import PDFPreview from "./PDFPreview";

function MainContent() {
  const { currentPage, bookData, bookName, author, textColor } = useBookData();
  const pageData = bookData[`page${currentPage}`] || {};
  const [showPreview, setShowPreview] = useState(false);
  //   console.log(pageData);

  // Function to render content with extra spacing
  const renderContentWithSpacing = (content = "") => {
    return content.split("\n").map((line, index) => (
      <span key={index} style={{ display: "block", marginBottom: "1em" }}>
        {line}
      </span>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen w-full py-2 px-7 ml-80">
      <button
        onClick={() => setShowPreview(!showPreview)}
        className={`mt-2 px-4 py-1 bg-blue-500 rounded`}
      >
        {showPreview ? "Hide PDF Preview" : "Show PDF Preview"}
      </button>
      {showPreview ? (
        <PDFPreview />
      ) : (
        <>
          <div
            className={`relative w-[700px] h-[297mm] my-2 overflow-hidden border`}
            style={{
              color: `${textColor}`,
              backgroundColor:
                pageData.bgImg === "" ? `${pageData.bgColor}` : "",
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{ backgroundImage: `url(${pageData.bgImg})` }}
            ></div>
            <div
              className={`relative w-full h-full flex flex-col ${
                currentPage === 0 ? "justify-between" : ""
              } p-4 px-8 ${
                pageData.bgImg === "" && pageData.bgColor === ""
                  ? "bg-gray-400"
                  : ``
              } bg-opacity-70`}
              style={{ color: `${textColor}` }}
            >
              {currentPage === 0 && (
                <h2 className="text-7xl text-center font-bold bg-opacity-70 p-2 px-20">
                  {bookName}
                </h2>
              )}
              {currentPage === 11 && (
                <>
                  <div
                    className={`border-b border-gray-300 pb-2`}
                    style={{ color: `${textColor}` }}
                  >
                    <h2 className="text-3xl font-semibold">{bookName}</h2>
                    <h2 className=" text-xs bg-opacity-70">
                      Written by{" "}
                      <span className=" text-sm font-semibold">{author}</span>
                    </h2>
                  </div>
                  <div className="flex py-5 px-2 border-b border-gray-300 min-h-56">
                    <div className="w-2/5 relative">
                      {bookData.page11.authorImg !== "" && (
                        <img
                          src={bookData.page11.authorImg}
                          alt="Author"
                          className="w-full h-full object-cover rounded-lg"
                          style={{ height: "170px", width: "140px" }}
                        />
                      )}
                      <h3 className="text-sm font-semibold">{author}</h3>
                    </div>
                    <div className="w-3/5 whitespace-pre-wrap">
                      {bookData.page11.additionalMsg}
                    </div>
                  </div>
                  <div className="py-5 px-2 border-b border-gray-300 min-h-44 flex flex-col items-center justify-center">
                    <h2 className="text-xl font-semibold">
                      Published by {pageData.publishedBy}
                    </h2>
                    <h2 className="bg-opacity-70 text-sm whitespace-pre-wrap">
                      {pageData.publisherMsg}
                    </h2>
                  </div>
                </>
              )}
              {currentPage > 0 && currentPage < 11 && (
                <>
                  <div className="w-full border-b border-gray-100 bg-opacity-80 px-3 py-1 text-right">
                    <div
                      className={`font-bold bg-opacity-70`}
                      style={{ color: `${textColor}` }}
                    >
                      {bookName}
                    </div>
                  </div>
                  {pageData.chapter !== "" && (
                    <>
                      <div className="mt-24 text-3xl text-center tracking-widest font-bold">
                        CHAPTER {pageData.chapter}
                      </div>
                    </>
                  )}
                  {pageData.chapterHead !== "" && (
                    <>
                      <div className="text-2xl my-5 text-center tracking-wider font-semibold">
                        {pageData.chapterHead}
                      </div>
                    </>
                  )}
                </>
              )}
              <div
                className={`relative font-bold p-2 bg-opacity-70 whitespace-pre-wrap`}
                style={{ color: `${textColor}` }}
              >
                {renderContentWithSpacing(pageData.content)}
              </div>
              {currentPage === 0 && (
                <h2
                  className={`text-right bg-opacity-70 p-2`}
                  style={{ color: `${textColor}` }}
                >
                  Written by <span className="text-xl">{author}</span>
                </h2>
              )}
            </div>
          </div>
          <Pagination />
        </>
      )}
    </div>
  );
}

export default MainContent;
