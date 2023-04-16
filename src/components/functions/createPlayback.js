import { Howl } from "howler"; 

export default function createPlayback(
    title,
    artist, 
    album, 
    length, 
    setSongIsPlaying,
    shuffleRef,
    queueRef,
    setQueue,
    historyRef,
    setHistory,
    setCurrentSong,
    playbackRef,
    setCurrPlaylistPlaying
) {
    let path;
    if (title === "test1") {
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
        path = `../../songs/Flight of the Bumblebee.mp3`;
    }
    else {
        path = `../../songs/${title}.mp3`;
    }
    const playback = new Howl({
        src: [path],
        volume: 0.1,
        onload: () => {
            playback.play();
            setSongIsPlaying(true);
            playbackRef.current = playback;
        },
        onend: () => {
            playback.unload();
            if (queueRef.current.length === 0) {
                setSongIsPlaying(false);
                setCurrPlaylistPlaying("");
                setCurrentSong("");
                return;
            }
            const newQueue = queueRef.current;
            const nextSong = newQueue.pop();
            setCurrentSong(nextSong);
            setQueue(newQueue);
            createPlayback(
                nextSong.title,
                nextSong.artist,
                nextSong.album,
                nextSong.length,
                setSongIsPlaying,
                shuffleRef,
                queueRef,
                setQueue,
                historyRef,
                setHistory,
                setCurrentSong,
                playbackRef,
                setCurrPlaylistPlaying
            );
        }
    });
    return playback;
}