import React from "react";
import { Context } from "../App/App";
import Seekbar from "../Seekbar";
import { useContext, useEffect } from "react";
import { 
    createPlayback, 
    createQueue
 } from "../functions";
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
    loopRef,
    historyRef,
    displayType,
    currPlaylistPlayingRef,
    currentSongRef
}) => {
    const {
        currentSong,
        setCurrentSong,
        setSongIsPlaying,
        pauseSong,
        shuffleRef,
        queueRef
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
        if (!playbackRef.current && historyRef.current.length === 0) return;
        if (playbackRef.current 
            && (playbackRef.current.seek() >= 5 
            || historyRef.current.length === 0)
        ) playbackRef.current.seek(0);
        else {
            queueRef.current.push(currentSong); 
            const previousSong = historyRef.current.pop(); 
            createPlayback(
                previousSong,
                setSongIsPlaying,
                shuffleRef,
                loopRef,
                queueRef,
                historyRef,
                currentSongRef,
                setCurrentSong,
                playbackRef,
                displayType,
                currPlaylistPlayingRef,
                setCurrPlaylistPlaying
            );
        }
    }

    /**
     * Skips the current song and plays the next song in the queue. 
     */
    const handleForward = () => {
        if (playbackRef.current) {
            playbackRef.current.unload(); 
            historyRef.current.push(currentSong);
        }
        let nextSong;
        if (queueRef.current.length > 0) {
            nextSong = queueRef.current.pop();
        }
        else if (loop && currPlaylistPlaying) {
            queueRef.current = createQueue(currPlaylistPlaying, shuffle, queueRef, currentSong, loopRef);
            if (queueRef.current.length === 0) {
                setCurrentSong("");
                setSongIsPlaying(false);
                playbackRef.current = null;
                return;
            }
            nextSong = queueRef.current.pop();
        }
        else {
            setCurrentSong("");
            setSongIsPlaying(false);
            playbackRef.current = null;
            return;
        }
        createPlayback(
            nextSong,
            setSongIsPlaying,
            shuffleRef,
            loopRef,
            queueRef,
            historyRef,
            currentSongRef,
            setCurrentSong,
            playbackRef,
            displayType,
            currPlaylistPlayingRef,
            setCurrPlaylistPlaying
        );
    }

    const handleShuffle = () => {
        if (displayType === "search") {
            return;
        }
        queueRef.current = createQueue(currPlaylistPlaying, shuffle, queueRef, currentSong, loopRef);
    }

    useEffect(() => {
        if (currPlaylistPlaying) handleShuffle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shuffle]);

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
            <Seekbar />
        </div>
    )
}

export default BottomBar;