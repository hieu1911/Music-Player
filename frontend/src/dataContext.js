import { useState, createContext } from "react";

const DataContext = createContext();

function DataProvider({ children }) {
    const [searchResult, setSearchResult] = useState({})
    const [playlist, setPlaylist] = useState({})
    // const [playlistCurrentId, setPlaylistCurrentId] = useState('6B7EI9AA')
    const [playlistCurrentId, setPlaylistCurrentId] = useState('')

    const value = {
        searchResult,
        setSearchResult,
        playlist,
        setPlaylist,
        playlistCurrentId,
        setPlaylistCurrentId,
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;
export { DataContext };