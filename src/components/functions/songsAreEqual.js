/**
 * Determines if two song objects are equal. 
 * 
 * @param song1 - The first song to be compared.
 * @param song2 - The second song to be compared.
 * 
 * @returns True if song1 and song2 both represent the same song, false otherwise.
 */
export default function songsAreEqual(song1, song2) {
    return (
        song1.title === song2.title
        && song1.artist === song2.artist
        && song1.album === song2.album
        && song1.length === song2.length
    );
}