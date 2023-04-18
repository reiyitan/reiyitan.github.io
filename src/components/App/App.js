import React from "react"; 
import "./style.css"; 
import { useState, useRef, useEffect, createContext } from "react";
import { createPlayback, slicePlaylist } from "../functions";
import Header from "../Header"; 
import Searchbar from "../Searchbar";
import Sidebar from "../Sidebar"; 
import BottomBar from "../BottomBar";
import SongDisplay from "../SongDisplay";

const Context = createContext();

/**
 * Wrapper component for the website.
 * 
 * @returns The main component.
 */
const App = () => {
    const [header, setHeader] = useState("work in progress");
    const [displayType, setDisplayType] = useState("");
    const [displaySongs, setDisplaySongs] = useState([]);
    const [currentSong, setCurrentSong] = useState("");
    const [openID, setOpenID] = useState("");
    const [currPlaylistDisplaying, setCurrPlaylistDisplaying] = useState("");
    const [songIsPlaying, setSongIsPlaying] = useState(false);
    const playbackRef = useRef(null);
    const [currPlaylistPlaying, setCurrPlaylistPlaying] = useState(null);
    const currPlaylistPlayingRef = useRef(currPlaylistPlaying);
    useEffect(() => {currPlaylistPlayingRef.current = currPlaylistPlaying;}, [currPlaylistPlaying]);
    const queueRef = useRef([]);
    const historyRef = useRef([]);
    const [shuffle, setShuffle] = useState(false);
    const shuffleRef = useRef(shuffle);
    useEffect(() => {shuffleRef.current = shuffle;}, [shuffle]);
    const [loop, setLoop] = useState(false);
    const loopRef = useRef(loop);
    useEffect(() => {loopRef.current = loop;}, [loop]);

    /**
     * Deletes a song from a playlist.
     * 
     * @param target - The song to be deleted. 
     */
    const handleDelete = (target) => {
        setDisplaySongs((prevDisplaySongs) => {
            return prevDisplaySongs.filter((song) => {
                return !(song.title === target.title
                    && song.artist === target.artist
                    && song.album === target.album
                    && song.length === target.length
                )
            });
        });
    }

    /**
    * Pauses the current Howl.
    */
    const pauseSong = () => {
        setSongIsPlaying(false);
        if (playbackRef.current) {
            playbackRef.current.pause();
        }
    }
    
    /**
    * Creates a Howl from currentSong.
    * If the requested song is equal to the current song resume the current song,
    * otherwise load the requested song.
    * 
    * @param title - The title of the song to be played.
    * @param artist - The artist of the song to be played.
    * @param album - The album of the song to be played.
    * @param length - The length of the song to be played.
    */
    const playSong = (title, artist, album, length) => {
        //the requested song is already playing. 
        if (playbackRef.current
            && currentSong.title === title
            && currentSong.artist === artist
            && currentSong.album === album 
            && currentSong.length === length
        ) {
            setSongIsPlaying(true);
            playbackRef.current.play();
        }
        //the requested song is not already playing. 
        else {
            if (playbackRef.current) playbackRef.current.unload();
            playbackRef.current = createPlayback(
                title,
                artist,
                album,
                length,
                setSongIsPlaying,
                shuffleRef,
                loopRef,
                queueRef,
                historyRef,
                setCurrentSong,
                playbackRef,
                displayType,
                currPlaylistPlayingRef,
                setCurrPlaylistPlaying
            );
        }
        if (displayType === "playlist") {
            queueRef.current = slicePlaylist(
                "user goes here",
                currPlaylistDisplaying,
                title,
                artist,
                album,
                length
            ).reverse()
        }
    }

    const context = {
        setDisplaySongs,
        currentSong,
        setCurrentSong,
        setSongIsPlaying,
        handleDelete,
        pauseSong,
        playSong,
        currPlaylistDisplaying,
        setCurrPlaylistDisplaying,
        currPlaylistPlaying,
        setCurrPlaylistPlaying,
        queueRef
    };

    return (
        <Context.Provider value={context}>  
            <Searchbar 
                setHeader={setHeader}
                setDisplayType={setDisplayType}
                setOpenID={setOpenID}
            />
            <Sidebar 
                setHeader={setHeader} 
                setDisplaySongs={setDisplaySongs} 
                displayType={displayType}
                setDisplayType={setDisplayType}
            />
            <Header title={header} />
            <SongDisplay
                displayType={displayType}
                displaySongs={displaySongs}
                songIsPlaying={songIsPlaying}
                openID={openID}
                setOpenID={setOpenID}
            />
            <BottomBar
                currPlaylistPlaying={currPlaylistPlaying}
                setCurrPlaylistPlaying={setCurrPlaylistPlaying}
                playbackRef={playbackRef}
                songIsPlaying={songIsPlaying}
                shuffle={shuffle}
                setShuffle={setShuffle}
                loop={loop}
                setLoop={setLoop}
                loopRef={loopRef}
                queueRef={queueRef}
                historyRef={historyRef}
                displayType={displayType}
                currPlaylistPlayingRef={currPlaylistPlayingRef}
            />
        </Context.Provider>
    );
}

export { Context };
export default App;