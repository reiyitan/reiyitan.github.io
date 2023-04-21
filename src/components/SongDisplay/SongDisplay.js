import React from "react";
import { Context } from "../App/App";
import { useContext } from "react";
import PlaylistSongs from "../PlaylistSongs";
import SearchbarSongs from "../SearchbarSongs";
import "./style.css";

/**
 * Component to display the songs a playlist contains in the main panel.
 * 
 * @param displayType - Used to distinguish whether the component should display PlaylistSongs or SearchbarSongs.
 * @param displaySongs - The list of songs to be displayed.
 * @param currentSong - The current song that is playing.
 * @param setCurrentSong - Used to update the current song that is playing.
 * @param currPlaylistPlaying - The current playlist that is playing. 
 * @param setCurrPlaylistPlaying - Update state of currPlaylistPlaying.
 * @param currPlaylistDisplaying - The current playlist being displayed.
 * @param handleDelete - Used to delete a song from a playlist. 
 * @param pauseSong - A function that handles pausing the current Howl. 
 * @param songIsPlaying - True if a song if currently playing. False otherwise. 
 * @param setSongIsPlaying - Sets whether or not a song is playing. 
 * @param history - A list of songs that were previously played.
 * @param setHistory - Set state of history.
 * 
 * @returns The section of the webpage dedicated to displaying songs.
 */
const SongDisplay = ({
    displayType,
    displaySongs,
    songIsPlaying, 
    openID,
    setOpenID
}) => {
    const { 
        currentSong, 
    } = useContext(Context);
    return (
        <div id="main-panel">
            <button id="song-display-header">
                <span className="header-span-title">Title</span>
                <span className="header-span-artist">Artist</span>
                <span className="header-span-album">Album</span>
                <span className="header-span-length">Length</span>
            </button>
            <div id="filler"></div>
            <div id="song-display">
                {(displayType==="playlist")
                    ? <PlaylistSongs
                          displaySongs={displaySongs}
                          currentSong={currentSong}
                          songIsPlaying={songIsPlaying}
                    />
                    : <SearchbarSongs 
                          displaySongs={displaySongs}
                          currentSong={currentSong}
                          openID={openID}
                          setOpenID={setOpenID}
                          songIsPlaying={songIsPlaying}
                    />
                }
            </div>
        </div>
    );
}

export default SongDisplay;