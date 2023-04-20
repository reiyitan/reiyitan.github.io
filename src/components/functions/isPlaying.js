import { default as songsAreEqual } from "./songsAreEqual";
/**
* Determines if the current song being played is the same as the 
* specified song.
* 
* @param currentSong - An object representing the current song. 
* @param song - The song to be compared.
* @param songIsPlaying - True of a song is currently playing. False otherwise. 
* 
* @returns True if the songs are the same, false otherwise.
*/
export default function isPlaying(currentSong, song, songIsPlaying) {
    return (
        songsAreEqual(currentSong, song)
        && songIsPlaying
    );
}