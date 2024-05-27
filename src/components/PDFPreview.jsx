import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useBookData } from "../context/DataContect";

const PDFPreview = () => {
  const { bookData, bookName, author, textColor } = useBookData();

  const generatePDF = (value) => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const input = document.getElementById("pdfContent");
    const pages = input.children;

    const processPages = async () => {
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        console.log(page);
        const canvas = await html2canvas(page);
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // Fit image to A4 size

        if (i < pages.length - 1) {
          pdf.addPage(); // Add new page for next content
        } else {
          if (value === "preview") {
            const pdfBlob = pdf.output("blob");
            const url = URL.createObjectURL(pdfBlob);

            // Open the PDF in a new tab
            window.open(url);
          } else if (value === "download") {
            pdf.save(`${bookName}.pdf`); // Save PDF after all pages are added
          }
        }
      }
    };

    processPages();
  };
  // Function to render content with extra spacing
  const renderContentWithSpacing = (content = "") => {
    return content.split("\n").map((line, index) => (
      <span key={index} style={{ display: "block", marginBottom: "1em" }}>
        {line}
      </span>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen w-full pb-7 px-8">
      <div className="flex">
        <button
          onClick={() => generatePDF("preview")}
          className="my-2 mr-2 px-2 py-1 bg-blue-500 text-white rounded outline-none"
        >
          <span>Browser Preview</span>
        </button>
        <button
          onClick={() => generatePDF("download")}
          className="my-2 px-2 py-1 bg-blue-500 text-white rounded outline-none"
        >
          Download PDF
        </button>
      </div>
      <div id="pdfContent" className="bg-white py-3 px-5">
        {Object.keys(bookData).map((key) => (
          <>
            {bookData[key].content !== "" && (
              <div
                key={key}
                className="page mb-4 p-4 border relative w-[210mm] h-[297mm] overflow-hidden"
              >
                {bookData[key].bgImg && (
                  <img
                    src={bookData[key].bgImg}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                  />
                )}
                <div
                  className={`relative w-full h-full flex flex-col p-4 px-10 ${
                    bookData[key].bgImg === "" && bookData[key].bgColor === ""
                      ? "bg-gray-400"
                      : ``
                  } bg-opacity-70`}
                  style={{
                    color: `${textColor}`,
                    backgroundColor:
                      bookData[key].bgImg === "" && bookData[key].bgColor !== ""
                        ? `${bookData[key].bgColor}`
                        : "",
                  }}
                >
                  {key !== "page0" && key !== "page11" && (
                    <div className="w-full border-b border-gray-400 px-3 py-1 pb-3 text-right">
                      <div className=" font-bold">{bookName}</div>
                    </div>
                  )}
                  {bookData[key].chapter && bookData[key].chapter !== "" && (
                    <>
                      <div className="mt-24 text-3xl text-center tracking-widest font-bold">
                        CHAPTER {bookData[key].chapter}
                      </div>
                    </>
                  )}
                  {bookData[key].chapterHead !== "" && (
                    <>
                      <div className="text-2xl my-5 text-center tracking-wider font-semibold">
                        {bookData[key].chapterHead}
                      </div>
                    </>
                  )}
                  {key === "page0" && (
                    <div className="flex flex-col justify-between h-full">
                      <h2
                        className="text-7xl text-center font-bold p-2 px-20"
                        style={{ color: `${textColor}` }}
                      >
                        {bookName}
                      </h2>
                      <h2 className="text-right bg-opacity-70 p-2">
                        Written by <span className="text-xl">{author}</span>
                      </h2>
                    </div>
                  )}
                  {key !== "page0" && key !== "page11" && (
                    <p
                      className="mt-6 font-bold p-2 whitespace-pre-wrap"
                      style={{ color: `${textColor}` }}
                    >
                      {renderContentWithSpacing(bookData[key].content)}
                    </p>
                  )}
                  {key === "page11" && (
                    <>
                      <div
                        className="border-b border-gray-300 pb-6"
                        style={{ color: `${textColor}` }}
                      >
                        <h2 className="text-4xl font-semibold">{bookName}</h2>
                        <h2 className="text-sm mt-1">
                          Written by{" "}
                          <span className="font-semibold">{author}</span>
                        </h2>
                      </div>
                      <div className="flex py-7 px-2 border-b border-gray-300 min-h-56">
                        <div className="w-2/5 relative">
                          {bookData.page11.authorImg && (
                            <img
                              src={bookData[key].authorImg}
                              alt="Author"
                              className="w-full h-full object-cover rounded-lg"
                              style={{ height: "170px", width: "140px" }}
                            />
                          )}
                          <h3 className="text-sm font-semibold">{author}</h3>
                        </div>
                        <div className="w-3/5 text-sm overflow-auto whitespace-pre-wrap">
                          {bookData[key].additionalMsg}
                        </div>
                      </div>
                      <div className="py-7 px-2 border-b border-gray-300 min-h-44 flex flex-col items-center justify-center">
                        <h2 className="text-xl font-semibold">
                          Published by {bookData[key].publishedBy}
                        </h2>
                        <h2 className="text-sm whitespace-pre-wrap">
                          {bookData[key].publisherMsg}
                        </h2>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default PDFPreview;
