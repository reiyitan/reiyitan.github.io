import { Howl } from "howler"; 
import { default as loadPlaylistSongs } from "./loadPlaylistSongs";

function stopPlayback(
    setSongIsPlaying, 
    setCurrPlaylistPlaying, 
    setCurrentSong, 
    playbackRef,
    setQueue
) {
    setQueue([]);
    setSongIsPlaying(false);
    setCurrPlaylistPlaying("");
    setCurrentSong("");
    playbackRef.current = null;
}

function popFromQueue(queueRef, setQueue, setCurrentSong) {
    const newQueue = queueRef.current.slice();
    const nextSong = newQueue.pop();
    setQueue(newQueue);
    setCurrentSong(nextSong);
    return nextSong;
}

export default function createPlayback(
    title,
    artist, 
    album, 
    length, 
    setSongIsPlaying,
    shuffleRef,
    loopRef,
    queueRef,
    setQueue,
    historyRef,
    setHistory,
    setCurrentSong,
    playbackRef,
    displayType,
    currPlaylistPlayingRef,
    setCurrPlaylistPlaying
) {
    let path;
    if (title === "matthew") {
        path = "../../songs/Matthew.mp3";
    }
    else if (title === "MOTIVATION") {
        path = "../../songs/MOTIVATION.mp3";
    }
    else if (title === "test1") {
        path = "../../songs/test1.mp3";
    }
    else if (title === "test2") {
        path = "../../songs/test2.mp3";
    }
    else if (title === "test3") {
        path = "../../songs/test3.mp3";
    }
    else if (title === "test4") {
        path = "../../songs/test4.mp3";
    }
    else if (artist !== "Kevin Macleod") {
        path = `../../songs/countdown.mp3`;
    }
    else {
        path = `../../songs/${title}.mp3`;
    }
    const playback = new Howl({
        src: [path],
        volume: 0.2,
        onload: () => {
            playback.play();
            setSongIsPlaying(true);
            playbackRef.current = playback;
        },
        onend: () => {
            playback.unload();
            if ((queueRef.current.length === 0 && !loopRef.current) || displayType === "search") {
                stopPlayback(setSongIsPlaying, setCurrPlaylistPlaying, setCurrentSong, playbackRef, setQueue);
                return;
            }
            else if (queueRef.current.length === 0 && loopRef.current) {
                queueRef.current = loadPlaylistSongs("user id here", currPlaylistPlayingRef.current).reverse();
            }
            const nextSong = popFromQueue(queueRef, setQueue, setCurrentSong, loopRef);
            createPlayback(
                nextSong.title,
                nextSong.artist,
                nextSong.album,
                nextSong.length,
                setSongIsPlaying,
                shuffleRef,
                loopRef,
                queueRef,
                setQueue,
                historyRef,
                setHistory,
                setCurrentSong,
                playbackRef,
                displayType,
                currPlaylistPlayingRef,
                setCurrPlaylistPlaying
            );
        }
    });
    return playback;
}