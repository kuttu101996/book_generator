import React, { useCallback } from "react";
import { useBookData } from "../context/DataContect";

const Page = () => {
  const {
    bookData,
    handleInputChange,
    currentPage,
    bookName,
    author,
    setBookName,
    setAuthor,
  } = useBookData();
  const pageData = bookData[`page${currentPage}`] || {};

  const handleContentChange = useCallback(
    (key, e) => {
      handleInputChange(`page${currentPage}`, key, e.target.value);
    },
    [currentPage, handleInputChange]
  );

  const handleImageUpload = useCallback(
    async (key, pic) => {
      if (pic.type === "image/jpeg" || pic.type === "image/png") {
        const formData = new FormData();
        formData.append("file", pic);
        formData.append("upload_preset", "first_chat_app");
        formData.append("cloud_name", "dlz45puq4");

        try {
          const res = await fetch(
            `https://api.cloudinary.com/v1_1/dlz45puq4/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await res.json();
          console.log(data);
          handleInputChange(`page${currentPage}`, key, data.secure_url);
        } catch (err) {
          console.log(err);
        }
      }
    },
    [currentPage, handleInputChange]
  );

  return (
    <div>
      <div>
        <label htmlFor="bgColor" className="mr-3">
          Choose Background Color
        </label>
        <input
          type="color"
          id="bgColor"
          value={pageData.bgColor || ""}
          onChange={(e) => handleContentChange("bgColor", e)}
        />
      </div>
      <div className="flex flex-col w-60 mt-5">
        <label htmlFor="bgImg" className="font-semibold text-sm">
          Background Image
        </label>
        <input
          id="bgImg"
          className="ring-1 text-gray-500 rounded-sm w-60 mt-1 text-sm"
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload("bgImg", e.target.files[0])}
        />
      </div>

      {currentPage <= 0 || currentPage >= 11 ? (
        <>
          <div className="flex flex-col w-60 mt-5">
            <label htmlFor="bookName" className="font-semibold text-sm">
              Book Name
            </label>
            <input
              type="text"
              id="bookName"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className="outline-none ring-1 rounded-sm mt-1 px-2 text-sm py-1"
            />
          </div>
          <div className="flex flex-col w-60 mt-5">
            <label htmlFor="author" className="font-semibold text-sm">
              Author Name
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="outline-none ring-1 rounded-sm mt-1 px-2 text-sm py-1"
            />
          </div>
          {currentPage === 11 && (
            <>
              <div className="flex flex-col w-60 mt-5">
                <label htmlFor="authorImg" className="font-semibold text-sm">
                  Author Image
                </label>
                <input
                  id="authorImg"
                  className="ring-1 text-gray-500 rounded-sm w-60 mt-1 text-sm"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload("authorImg", e.target.files[0])
                  }
                />
              </div>
              <div className="flex flex-col w-60 mt-5">
                <label
                  htmlFor="additionalMsg"
                  className="font-semibold text-sm"
                >
                  Additional Message
                </label>
                <textarea
                  id="additionalMsg"
                  value={pageData.additionalMsg || ""}
                  onChange={(e) => handleContentChange("additionalMsg", e)}
                  className="outline-none ring-1 rounded-sm mt-1 px-2 text-sm py-1"
                />
              </div>
              <div className="flex flex-col w-60 mt-5">
                <label htmlFor="publishedBy" className="font-semibold text-sm">
                  Publisher Name
                </label>
                <input
                  type="text"
                  id="publishedBy"
                  value={pageData.publishedBy || ""}
                  onChange={(e) => handleContentChange("publishedBy", e)}
                  className="outline-none ring-1 rounded-sm mt-1 px-2 text-sm py-1"
                />
              </div>
              <div className="flex flex-col w-60 mt-5">
                <label htmlFor="publisherMsg" className="font-semibold text-sm">
                  Publisher Message
                </label>
                <textarea
                  id="publisherMsg"
                  value={pageData.publisherMsg || ""}
                  onChange={(e) => handleContentChange("publisherMsg", e)}
                  className="outline-none ring-1 rounded-sm mt-1 px-2 text-sm py-1"
                />
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col w-60 mt-5">
            <label htmlFor="chapter" className="font-semibold text-sm">
              Chapter
            </label>
            <input
              type="text"
              id="chapter"
              value={pageData.chapter || ""}
              onChange={(e) => handleContentChange("chapter", e)}
              placeholder="Chapter number"
              className="content-input outline-none ring-1 rounded-sm mt-1 px-2 text-sm py-1"
            />
          </div>
          <div className="flex flex-col w-60 mt-5">
            <label htmlFor="chapterHead" className="font-semibold text-sm">
              Chapter Heading
            </label>
            <input
              type="text"
              id="chapterHead"
              value={pageData.chapterHead || ""}
              onChange={(e) => handleContentChange("chapterHead", e)}
              placeholder="Chapter Heading"
              className="content-input outline-none ring-1 rounded-sm mt-1 px-2 text-sm py-1"
            />
          </div>
          <div className="flex flex-col w-60 mt-5">
            <label htmlFor="content" className="font-semibold text-sm">
              Content
            </label>
            <textarea
              id="content"
              value={pageData.content || ""}
              disabled={currentPage === 0 || currentPage === 11}
              onChange={(e) => handleContentChange("content", e)}
              placeholder="Write your content here..."
              className="content-input outline-none ring-1 rounded-sm mt-1 px-2 text-sm py-1"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
