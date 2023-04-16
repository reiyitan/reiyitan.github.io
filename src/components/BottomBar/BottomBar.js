import React from "react";
import { Context } from "../App/App";
import { useContext } from "react";
import "./style.css";

/**
 * Component for the bottom bar of the webpage.
 * 
 * @param currentSong - Information for the song that is currently playing. Part of index.js state.
 * @param setCurrentSong - Used to update state of currentSong.
 * @param currPlaylistPlaying - The current playlist being listened to.
 * @param setCurrPlaylistPlaying - Set state of currPlaylistPlaying.
 * @param playbackRef - A reference to the current Howl. 
 * @param pauseSong - Function that handles pausing the current song. 
 * @param songIsPlaying - True if a song is currently playing, false otherwise. 
 * @param setSongIsPlaying - Sets the state of songIsPlaying.
 * @param history - A list of songs that were previously played.
 * @param setHistory - Set state of history.
 * @param queue - The queue of songs to be played.
 * @param setQueue - Sets the song queue. 
 */
const BottomBar = ({
    currPlaylistPlaying,
    setCurrPlaylistPlaying,
    playbackRef, 
    songIsPlaying, 
    shuffle,
    setShuffle,
    loop,
    setLoop,
}) => {
    const {
        currentSong,
        setCurrentSong,
        setSongIsPlaying,
        queue,
        setQueue,
        history,
        setHistory,
        pauseSong,
        shuffleRef
    } = useContext(Context);

    /**
     * Sets the pp-button to display the pause icon and plays the chosen .mp3. 
     */
    const handlePlay = () => {
        if (playbackRef.current) {
            setSongIsPlaying(true);
            playbackRef.current.play();
        }
    }

    /**
     * Sets the pp-button to display the play icon and plays the chosen .mp3.
     */
    const handlePause = () => {
        pauseSong();
    }

    /**
     * Either plays the current song from its beginning or plays the previous song. 
     * The rewind button will play the previous song if less than 5 seconds of the current 
     * song have elapsed. 
     */
    const handleRewind = () => {

    }

    /**
     * Skips the current song and plays the next song in the queue. 
     */
    const handleForward = () => {

    }

    return (
        <div id="bottom-bar">
            <span className="bottom-bar-title">{currentSong.title}</span>
            <span className="bottom-bar-artist">{currentSong.artist}</span>
            <button 
                className={(shuffle) ? "button small shuffle shuffle-on" : "button small shuffle shuffle-off"}
                onClick={() => setShuffle(!shuffle)}
            >
            </button>
            <button 
                className={"button small rw"}
                onClick={handleRewind}
            >
            </button>
            <button 
                className={(songIsPlaying) ? "button pause-play pause" : "button pause-play play"}
                onClick={(songIsPlaying)
                    ? handlePause
                    : handlePlay
                }
            >
            </button>
            <button 
                className={"button small ff"}
                onClick={handleForward}
            >
            </button>
            <button 
                className={(loop) ? "button small loop loop-on" : "button small loop loop-off"}
                onClick={() => setLoop(!loop)}
            >
            </button>
        </div>
    )
}

export default BottomBar;