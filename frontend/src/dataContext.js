import { useState, createContext } from "react";

const DataContext = createContext();

function DataProvider({ children }) {
    const [searchResult, setSearchResult] = useState({})
    const [playlist, setPlaylist] = useState({})
    const [playlistCurrentId, setPlaylistCurrentId] = useState('')
    const [currentSong, setCurrentSong] = useState({})
    const [playMusic, setPlayMusic] = useState(false)
    const [curVideo, setCurVideo] = useState({})

    const value = {
        searchResult,
        setSearchResult,
        playlist,
        setPlaylist,
        playlistCurrentId,
        setPlaylistCurrentId,
        currentSong,
        setCurrentSong,
        playMusic,
        setPlayMusic,
        curVideo,
        setCurVideo
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;
export { DataContext };