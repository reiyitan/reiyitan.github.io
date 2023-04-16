/**
 * Loads the songs within a specified playlist.
 * Each song contains title, artist, album, length.
 * 
 * @param user - The owner of the playlist.
 * @param playlistName - The title of the playlist.
 * 
 * @returns A list of the songs in the playlist.
 */
export default function loadPlaylistSongs(user, playlistName) {
    //TODO: actually get the songs from the backend
    if (playlistName === "test") {
        return [
            {"title": "test1", "artist": "testing", "album": "tests", "length": "1:23"},
            {"title": "test2", "artist": "Kevin Macleod", "album": "N/A", "length": "length"},
            {"title": "test3", "artist": "Kevin Macleod", "album": "N/A", "length": "length"},
            {"title": "test4", "artist": "Kevin Macleod", "album": "N/A", "length": "length"}
        ]
    }
    if (playlistName === "kevin") {
        return [
            {"title": "test", "artist": "testing", "album": "tests", "length": "1:23"},
            {"title": "Cipher", "artist": "Kevin Macleod", "album": "N/A", "length": "length"},
            {"title": "The Builder", "artist": "Kevin Macleod", "album": "N/A", "length": "length"},
            {"title": "Sneaky Snitch", "artist": "Kevin Macleod", "album": "N/A", "length": "length"},
            {"title": "Sneaky Adventure", "artist": "Kevin Macleod", "album": "N/A", "length": "length"},
            {"title": "Monkeys Spinning Monkeys", "artist": "Kevin Macleod", "album": "N/A", "length": "length"},
            {"title": "Investigations", "artist": "Kevin Macleod", "album": "N/A", "length": "length"},
        ]
    }

    if (playlistName === "a") {
        return (
            [
                {"title":"fergsrt", "artist":"arsdfsdfsdfsdf", "album":"alsdfsdfsdfsdfsdfm1", "length":"1sdfsdfds:23"},
                {"title":"sonyhgtyghtdhfdjkfsjkdfnjknsdjkfnksjdnsdfnksdnjsdnjknsdknjknjkdnjksdnjknjksdnfjksjdnkfgdgdfgdfg1", "artist":"arergergergergergist2", "album":"asdfsdfsdfsdfsd", "length":"1:23"},
                {"title":"soergtydyubfhyjfb yuj1", "artist":"adfgdnfsdnfjknsdfnjksdnfksndjkfeyuigbtg r tg rthjg sdkfnsjkndfjknsdknfkjnsdjkfnfgt3", "album":"aldfgdfgud", "length":"1:2sdfsd3"},
                {"title":"sdfgdfgdfgdfgng1", "artist":"artgdfgdfbtybtybt4", "album":"aldfgdfgfdum14", "length":"1:2sdfsdf3"},
                {"title":"gthtyhtyh", "artist":"sdfsdf", "album":"teryhbgrthb", "length":"tydnbdfgb"},
                {"title":" dgh bxfvb ", "artist":"g rsh bdgh ", "album":"sv ydhvbh", "length":"scerfscsg"},
                {"title":"sdfg sg f", "artist":"  fghn sfg n", "album":"adf as v cv", "length":" werg fg "},
                {"title":"sdf gs rtsg ", "artist":" sdfg aerg sdfg ", "album":"g t gsfhb fh ", "length":"gsdfg sdfg "},
                {"title":"sfg sdfg sdf", "artist":"sd fgsdf g", "album":" tj ghj ", "length":" hth dfgh dfg h"},
                {"title":"sfg rtsh ", "artist":"afg rtsh sfg", "album":"sth gdtyh gfh ", "length":"s fg srth "},
                {"title":"sdfg rsth sfgh ", "artist":"g yh dgfh dfgh ", "album":"gh rtyh fgh ", "length":"g rtyh sgh "},
                {"title":"sdfgh sdfg sdfg ", "artist":"sfg sfgh fh ", "album":"gsdf grtydh", "length":" sthg dh g"},
                {"title":"s gfdsg df sdfgsdfg ", "artist":" yutrj hn ", "album":" fwerg sfdg ", "length":" rtg "},
                {"title":" jy tyj gbj ", "artist":"we fdf g", "album":"g erwg e", "length":" erg"},
                {"title":"g erdfg ", "artist":"f h fgn ", "album":"234 2e  dsv ", "length":" as sg cv"},
                {"title":"sdf sdf sdf ", "artist":"sdf sdf cv ", "album":"sdf scv fghn fgn ", "length":" jm gh d xs"},
                {"title":"b htn n", "artist":"tyuj tyu ", "album":"sdf sdf ", "length":" bgdf bdfhb "},
                {"title":"sfgh tyj tghn ", "artist":"sgfd h hj", "album":"sdfg af tyjh ", "length":"gs dfg sdfg"},
                {"title":" yuik tgh dgh ", "artist":"adfg asdfg dfg bb", "album":"sdfgh rt sfgb ", "length":"sdfg sfhdhgn "}
            ]
        )
    }
    return (
        [
            {"title":"song1", "artist":"artist1", "album":"album1", "length":"1:23"},
            {"title":"song1", "artist":"artist2", "album":"album2", "length":"1:23"},
            {"title":"song1", "artist":"artist3", "album":"album3", "length":"1:23"},
            {"title":"song1", "artist":"artist4", "album":"album14", "length":"1:23"},
        ]
    )
}