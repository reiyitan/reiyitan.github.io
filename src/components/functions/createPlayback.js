import { Howl } from "howler"; 
import { songsAreEqual } from "../functions";
import { createQueue } from "../functions";

function stopPlayback(
    setSongIsPlaying, 
    setCurrPlaylistPlaying, 
    setCurrentSong, 
    playbackRef,
) {
    setSongIsPlaying(false);
    setCurrPlaylistPlaying("");
    setCurrentSong("");
    playbackRef.current = null;
}

export default function createPlayback(
    song,
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
) {
    let path;
    if (song.title === "matthew") {
        path = "../../songs/Matthew.mp3";
    }
    else if (song.title === "MOTIVATION") {
        path = "../../songs/MOTIVATION.mp3";
    }
    else if (song.title === "test1") {
        path = "../../songs/test1.mp3";
    }
    else if (song.title === "test2") {
        path = "../../songs/test2.mp3";
    }
    else if (song.title === "test3") {
        path = "../../songs/test3.mp3";
    }
    else if (song.title === "test4") {
        path = "../../songs/test4.mp3";
    }
    else if (song.artist !== "Kevin Macleod") {
        path = `../../songs/countdown.mp3`;
    }
    else {
        path = `../../songs/${song.title}.mp3`;
    }
    if (playbackRef.current) playbackRef.current.unload();
    setCurrentSong(song);
    const playback = new Howl({
        src: [path],
        volume: 0.2,
        onload: () => {
            if (!songsAreEqual(song, currentSongRef.current)) return;
            playback.play();
            setSongIsPlaying(true);
            playbackRef.current = playback;
        },
        onend: () => {
            playback.unload();
            if (
                historyRef.current.length === 0
                || !songsAreEqual(historyRef.current[historyRef.current.length - 1], song)
            ) historyRef.current.push(song);
            if ((queueRef.current.length === 0 && !loopRef.current) || displayType === "search") {
                stopPlayback(setSongIsPlaying, setCurrPlaylistPlaying, setCurrentSong, playbackRef);
                return;
            }
            else if (queueRef.current.length === 0) {
                createQueue(    
                    currPlaylistPlayingRef.current,
                    shuffleRef.current,
                    queueRef,
                    currentSongRef.current,
                    loopRef
                )
            }
            const nextSong = queueRef.current.pop(); 
            setCurrentSong(nextSong);
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
    });
    return playback;
}