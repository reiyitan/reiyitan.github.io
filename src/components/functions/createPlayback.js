import { Howl } from "howler"; 
import { songsAreEqual } from "../functions";
import { createQueue } from "../functions";

function stopPlayback(
    setSongIsPlaying, 
    setCurrPlaylistPlaying, 
    setCurrentSong, 
    playbackRef,
    songShouldLoad
) {
    setSongIsPlaying(false);
    setCurrPlaylistPlaying(null);
    setCurrentSong(null);
    songShouldLoad.current = true;
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
    setCurrPlaylistPlaying,
    songShouldLoad,
    volume
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
    songShouldLoad.current = true;
    setCurrentSong(song);
    const playback = new Howl({
        src: [path],
        volume: volume,
        onload: () => {
            if (!songsAreEqual(song, currentSongRef.current)) return;
            if (!songShouldLoad.current) return;
            songShouldLoad.current = false;
            playback.play();
            setCurrentSong(song);
            setSongIsPlaying(true);
            playbackRef.current = playback;
        },
        onend: () => {
            playback.unload();
            songShouldLoad.current = true;
            if (
                historyRef.current.length === 0
                || !songsAreEqual(historyRef.current[historyRef.current.length - 1], song)
            ) historyRef.current.push(song);
            if ((queueRef.current.length === 0 && !loopRef.current) 
                || displayType === "search"
                || !currPlaylistPlayingRef.current
            ) {
                stopPlayback(setSongIsPlaying, setCurrPlaylistPlaying, setCurrentSong, playbackRef, songShouldLoad);
                return;
            }
            else if (queueRef.current.length === 0) {
                queueRef.current = createQueue(    
                    currPlaylistPlayingRef.current,
                    shuffleRef.current,
                    currentSongRef.current,
                    loopRef.current
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
                setCurrPlaylistPlaying,
                songShouldLoad,
                volume
            );
        }
    });
    return playback;
}