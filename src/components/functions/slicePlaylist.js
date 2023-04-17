import { default as loadPlaylistSongs } from "./loadPlaylistSongs";
/**
 * Takes a playlist and searches the playlist in order for a song. 
 * Once the song is found, the function returns the rest of the songs
 * in the playlist not including the specified song.
 * 
 * @param user - The user of the playlist to search.
 * @param playlistName - The name of the playlist to search.
 * @param title - The title of the song to be searched for.
 * @param artist - The artist of the song to be searched for.
 * @param album - The album of the song to be searched for.
 * @param length - The length of the song to be searched for. 
 * 
 * @returns The sliced playlist.
 */
export default function slicePlaylist(
    user, 
    playlistName,
    title,
    artist,
    album,
    length
) {
    let playlist = loadPlaylistSongs(user, playlistName);
    for (let i = 0; i < playlist.length; i++) {
        let currSong = playlist[i]; 
        if (
            currSong.title === title
            && currSong.artist === artist 
            && currSong.album === album
            && currSong.length === length
        ) {
            return playlist.slice(i + 1);
        }
    }
}