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
    currentSong,
    loopRef
) {
    let newQueue = loadPlaylistSongs("user goes here", currPlaylistPlaying);
    if (newQueue.length === 1) return newQueue;
    if (songsAreEqual(newQueue[newQueue.length - 1], currentSong) && !loopRef.current) {
        return [];
    }
    if (shuffle) {
        shuffleArray(newQueue);
    }
    else {
        newQueue = slicePlaylist("user goes here", currPlaylistPlaying, currentSong, loopRef).reverse();
    }
    newQueue = newQueue.filter((song) => !songsAreEqual(song, currentSong));
    return newQueue;
}