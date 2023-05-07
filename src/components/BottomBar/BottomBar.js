import React from "react";
import { Context } from "../App/App";
import SeekBar from "../SeekBar";
import VolumeBar from "../VolumeBar";
import { useContext, useEffect } from "react";
import { createPlayback, createQueue } from "../functions";
import "./style.css";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import { 
    BackwardIcon, 
    ForwardIcon, 
    ArrowPathIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon
} from "@heroicons/react/20/solid";

/**
 * Component for the bottom bar of the webpage.
 * 
 * PROPS
 * @param currentSong - Information for the song that is currently playing. Part of index.js state.
 * @param setCurrentSong - Used to update state of currentSong.
 * @param currPlaylistPlaying - The current playlist being listened to.
 * @param setCurrPlaylistPlaying - Set state of currPlaylistPlaying.
 * @param playbackRef - A reference to the current Howl. 
 * @param songIsPlaying - True if a song is currently playing, false otherwise. 
 * @param shuffle - True if the current playlist should be shuffled, false otherwise.
 * @param setShuffle - Update state of shuffle.
 * @param loop - True if the current playlist should be looped, false otherwise.
 * @param setLoop - Updates state of loop.
 * @param loopRef - A reference to loop to be passed into createPlayback. (provides most recent loop value)
 * @param historyRef - A list of the previous song objects that have been played.
 * @param displayType - Either "playlist" or "search". 
 * @param currPlaylistPlayingRef - A reference to currPlaylistPlaying to be passed into createPlayback.
 * @param currentSongRef - A reference to currentSong to be passed into createPlayback.
 * @param volume - Reference to the current volume. Between 0 and 1.
 * @param setVolume - Sets the state of volume. 
 * 
 * CONTEXT
 * @param currentSong - The currentSong that is playing. A JavaScript object with title, artist, album, length.
 * @param setCurrentSong - Set the state of currentSong. 
 * @param setSongIsPlaying - Sets the state of songIsPlaying.
 * @param pauseSong - Callback function for pausing the current Howl. 
 * @param shuffleRef - Reference to shuffle to be passed into createPlayback.
 * @param queueRef - A list of songs to be played.
 * @param songShouldLoad - Used in createPlayback to determine if a song can load without causing
 *                         two Howls to play at the same time.
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
    currentSongRef,
    volume,
    setVolume
}) => {
    const {
        currentSong,
        setCurrentSong,
        setSongIsPlaying,
        pauseSong,
        shuffleRef,
        queueRef,
        songShouldLoad
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
            if (currentSong) queueRef.current.push(currentSong); 
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
                setCurrPlaylistPlaying,
                songShouldLoad,
                volume
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
        //loop is on and able to load songs from the current playlist
        else if (loop && currPlaylistPlaying) {
            queueRef.current = createQueue(currPlaylistPlaying, shuffle, currentSong, loopRef);
            if (queueRef.current.length === 0) {
                setCurrentSong("");
                setSongIsPlaying(false);
                playbackRef.current = null;
                return;
            }
            nextSong = queueRef.current.pop();
        }
        //stop playback
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
            setCurrPlaylistPlaying,
            songShouldLoad,
            volume
        );
    }

    const setQueue = () => {
        if (displayType === "search") return;
        queueRef.current = createQueue(currPlaylistPlaying, shuffle, currentSong, loop);
    }

    useEffect(() => {
        if (currPlaylistPlaying) setQueue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shuffle, loop]);

    return (
        <div id="bottom-bar">
            <span className="bottom-bar-title">{(currentSong) ? currentSong.title : ""}</span>
            <span className="bottom-bar-artist">{(currentSong) ? currentSong.artist : ""}</span>

            <button 
                className={(shuffle) ? "button small shuffle shuffle-on" : "button small shuffle shuffle-off"}
                onClick={() => setShuffle(!shuffle)}
            >
            </button>

            <button 
                className={"button small rw"}
                onClick={handleRewind}
            >
                <BackwardIcon className="icon rw-icon" />
            </button>

            <button 
                className="button pause-play"
                onClick={(songIsPlaying)
                    ? handlePause
                    : handlePlay
                }
            >
                {songIsPlaying
                    ? <PauseIcon className="icon pause-icon" />
                    : <PlayIcon className="icon play-icon" />
                }
            </button>

            <button 
                className={"button small ff"}
                onClick={handleForward}
            >
                <ForwardIcon className="icon ff-icon" />
            </button>

            <button 
                className={loop ? "button small loop loop-on" : "button small loop loop-off"}
                onClick={() => setLoop(!loop)}
            >
                <ArrowPathIcon className="icon" />
            </button>

            <div id="volume-icon-div">
                {volume === 0
                    ? <SpeakerXMarkIcon className="volume-icon" />
                    : <SpeakerWaveIcon className="volume-icon" />
                }
            </div>
            <SeekBar />
            <VolumeBar 
                volume={volume}
                setVolume={setVolume}
                playbackRef={playbackRef}
            />
        </div>
    )
}

export default BottomBar;