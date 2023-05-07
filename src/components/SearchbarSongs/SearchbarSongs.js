import React from "react"; 
import { Context } from "../App/App";
import { useState, useContext } from "react";
import { loadPlaylists, isPlaying } from "../functions";
import "./style.css";
import { PlusIcon } from "@heroicons/react/24/solid";

/**
 * A component that appears when the + is clicked next to a SearchbarSong. 
 * Represents a playlist. Clicking on a Playlist adds a song to it from the Searchbar. 
 * 
 * @param playlistTitle - The title of this playlist.
 * @param song - The song to be added to the playlist.
 * 
 * @returns The component to be displayed in the add-to-playlist menu.
 */
const Playlist = ({
    playlistTitle, 
    song
}) => {
    const handleClick = () => {
        console.log(`TODO: add ${song.title} by ${song.artist} to ${playlistTitle}`);
    }

    return (
        <>
            <button 
                className="playlist-select-button"
                onClick={handleClick}>
                {playlistTitle}
            </button>
        </>
    )
}

/**
 * A component that represents a single song when a user uses the searchbar. 
 * 
 * @param song - An object containing this song's information.
 * @param currentSong - The current song that is playing.
 * @param setCurrentSong - Sets the value of currentSong.
 * @param popupShowing - Either true or false. True if add to playlist popup should show. 
 * @param setOpenID - Used to change the state in SongDisplay to let the component know what popup is showing. 
 * @param pauseSong - A function that handles pausing a song. 
 * @param songIsPlaying - True if a song is currently playing. False otherwise. 
 * 
 * @return One of the search results to be displayed. 
 */
const SearchbarSong = ({
    song,
    setOpenID,
    currentSong,
    popupShowing, 
    songIsPlaying
}) => {
    const {
        pauseSong,
        playSong,
        queueRef
    } = useContext(Context);
    const [playlists, setPlaylists] = useState([]);
    /**
     * When the + button is clicked on a song, the user is prompted
     * to add it to a playlist. 
     */
    const addSong = () => {
        if (popupShowing) {
            setOpenID("");
            return
        }
        setPlaylists(loadPlaylists("user goes here"));
        setOpenID(`${song.title}${song.artist}${song.album}${song.length}`);
    }

    /**
     * Plays the current song. 
     */
    const handlePlay = () => {
        queueRef.current = [];
        playSong(song);
    }

    return (
        <>
            <div className="search-song-row">
                <button className={(isPlaying(currentSong, song, songIsPlaying)) 
                        ? "search-song-row-playbutton playing"
                        : "search-song-row-playbutton notplaying"}
                    onClick={(isPlaying(currentSong, song, songIsPlaying))
                        ? pauseSong
                        : handlePlay
                    }>
                    <span className="song-span-title">{song.title}</span>
                    <span className="song-span-artist">{song.artist}</span>
                    <span className="song-span-album">{song.album}</span>
                    <span className="song-span-length">{song.length}</span>
                </button>
                <button 
                    className={(popupShowing) 
                        ? "search-add-button adding" 
                        : "search-add-button notadding"} 
                    onClick={addSong}>
                        <PlusIcon className="add-song-icon" />
                </button>
            </div>
            <div className={(popupShowing) ? "playlist-list-wrapper" : "hidden"}>
                <div className="playlist-list-header">Choose a playlist to add to:</div>
                <div className="playlist-list">
                    {playlists.map((playlistTitle) => (
                        <Playlist
                            key={playlistTitle}
                            playlistTitle={playlistTitle} 
                            song={song}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

/**
 * Component containing all SearchbarSong components. 
 * 
 * @param displaySongs - List of songs to be displayed. 
 * @param currentSong - The current song that is playing 
 * @param setCurrentSong - Update what song is currently playing. 
 * @param openID - The ID of the SearchbarSong that has its add to playlist menu open. 
 * @param setOpenID - Update what SearchbarSong is currently open by changing openID.
 * @param songIsPlaying - True if a song is playing, false otherwise. 
 */
const SearchbarSongs = ({
    displaySongs, 
    currentSong,
    openID,
    setOpenID,
    songIsPlaying, 
}) => {
    return (
        displaySongs.map((song) => (
            <SearchbarSong
                key={`${song.title}${song.artist}${song.album}${song.length}`}
                song={song}
                currentSong={currentSong}
                popupShowing={(openID===`${song.title}${song.artist}${song.album}${song.length}`)
                                ? true
                                : false
                }
                setOpenID={setOpenID}
                songIsPlaying={songIsPlaying}
            />
        ))
    ); 
}

export default SearchbarSongs; 