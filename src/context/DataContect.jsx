import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [bookName, setBookName] = useState("Name Your Book");
  const [author, setAuthor] = useState("Author");
  const [textColor, setTextColor] = useState("#ffffff");
  const [bookData, setBookData] = useState({
    page0: {
      bgImg: "",
      bgColor: "",
    },
    page1: {
      content: "",
      bgImg: "",
      bgColor: "",
      chapter: "",
      chapterHead: "",
    },
    page2: {
      content: "",
      bgImg: "",
      bgColor: "",
      chapter: "",
      chapterHead: "",
    },
    page3: {
      content: "",
      bgImg: "",
      bgColor: "",
      chapter: "",
      chapterHead: "",
    },
    page4: {
      content: "",
      bgImg: "",
      bgColor: "",
      chapter: "",
      chapterHead: "",
    },
    page5: {
      content: "",
      bgImg: "",
      bgColor: "",
      chapter: "",
      chapterHead: "",
    },
    page6: {
      content: "",
      bgImg: "",
      bgColor: "",
      chapter: "",
      chapterHead: "",
    },
    page7: {
      content: "",
      bgImg: "",
      bgColor: "",
      chapter: "",
      chapterHead: "",
    },
    page8: {
      content: "",
      bgImg: "",
      bgColor: "",
      chapter: "",
      chapterHead: "",
    },
    page9: {
      content: "",
      bgImg: "",
      bgColor: "",
      chapter: "",
      chapterHead: "",
    },
    page10: {
      content: "",
      bgImg: "",
      bgColor: "",
      chapter: "",
      chapterHead: "",
    },
    page11: {
      bgImg: "",
      bgColor: "",
      authorImg: "",
      additionalMsg: "Additional Message from Author",
      publishedBy: "Publisher",
      publisherMsg: "Published By this, And some message for all",
    },
  });
  const handleInputChange = (page, key, value) => {
    setBookData((prevData) => ({
      ...prevData,
      [page]: { ...prevData[page], [key]: value },
    }));
  };

  // Effect to load data from localStorage on mount
  useEffect(() => {
    const savedBookData = localStorage.getItem("bookData");
    const savedAuthor = localStorage.getItem("author");
    const savedBookName = localStorage.getItem("bookName");
    const savedTextColor = localStorage.getItem("textColor");

    if (savedBookData) setBookData(JSON.parse(savedBookData));
    if (savedAuthor) setAuthor(JSON.parse(savedAuthor));
    if (savedBookName) setBookName(JSON.parse(savedBookName));
    if (savedTextColor) setTextColor(JSON.parse(savedTextColor));
  }, []);

  // Effect to save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("bookData", JSON.stringify(bookData));
    localStorage.setItem("author", JSON.stringify(author));
    localStorage.setItem("bookName", JSON.stringify(bookName));
    localStorage.setItem("textColor", JSON.stringify(textColor));
  }, [bookData, author, bookName, textColor]);

  return (
    <DataContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        bookData,
        handleInputChange,
        bookName,
        setBookName,
        author,
        setAuthor,
        textColor,
        setTextColor,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useBookData = () => useContext(DataContext);
