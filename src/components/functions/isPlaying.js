/**
    * Determines if the current song being played is the same as the 
    * specified song.
    * 
    * @param currentSong - A JSON representing the current song. 
    * @param title - The title of the song to be compared.
    * @param artist - The artist of the song to be compared. 
    * @param length - The length of the song to be compared. 
    * @param songIsPlaying - True of a song is currently playing. False otherwise. 
    * 
    * @returns True if the songs are the same, false otherwise.
    */
export default function isPlaying(currentSong, title, artist, album, length, songIsPlaying) {
    return (
        currentSong.title === title
        && currentSong.artist === artist
        && currentSong.album === album
        && currentSong.length === length
        && songIsPlaying
    );
}