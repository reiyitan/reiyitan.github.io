import { default as shuffleArray } from "./shuffleArray";
import { default as songsAreEqual } from "./songsAreEqual";
import { default as loadPlaylistSongs } from "./loadPlaylistSongs";
import { default as slicePlaylist } from "./slicePlaylist";

/**
 * Sets queueRef based on shuffle and the current playlist that is playing. 
 */
export default function createQueue(
    currPlaylistPlaying,
    shuffle,
    queueRef,
    currentSong
) {
    let newQueue = loadPlaylistSongs("user goes here", currPlaylistPlaying);
    if (shuffle) {
        shuffleArray(newQueue);
    }
    else {
        newQueue = slicePlaylist("user goes here", currPlaylistPlaying, currentSong).reverse();
    }
    newQueue = newQueue.filter((song) => !songsAreEqual(song, currentSong));
    queueRef.current = newQueue;
}