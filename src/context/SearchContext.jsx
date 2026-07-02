"use client";

import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const value = {
    search,
    setSearch,
    searchText,
    setSearchText,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
