import { useState, createContext } from "react";

const DataContext = createContext();

function DataProvider({ children }) {
    const [searchResult, setSearchResult] = useState({})

    const value = {
        searchResult,
        setSearchResult,
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;
export { DataContext };