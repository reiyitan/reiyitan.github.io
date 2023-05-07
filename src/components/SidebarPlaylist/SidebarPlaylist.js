import React from "react"; 
import { Context } from "../App/App";
import { loadPlaylistSongs } from "../functions";
import { useContext } from "react";
import "./style.css";
import { MinusIcon } from "@heroicons/react/24/solid";

/**
 * Component for creating a playlist in the Sidebar. 
 * 
 * @param playlistName - The name of the playlist.
 * @param playlists - The list of playlists in the Sidebar. 
 * @param setPlaylists - Used to update state of Sidebar playlists when deleting a playlist.
 * @param setHeader - Used to update the state of the header. 
 * @param currPlaylistDisplaying - Used to check what playlist is currently being displayed on the main panel.
 * @param setCurrPlaylistDisplaying - Used to update the state of Sidebar.
 * @param displayType - Part of state of the entire web app. Value is either "search" or "playlist".
 * @param setDisplayType - Used to set current display type to "playlist".
 * @param setDisplaySongs - Used to display the contents of the playlist.
 * 
 * @returns A playlist to be displayed in the sidebar.
 */
const SidebarPlaylist = ({
    playlistName,
    playlists, 
    setPlaylists, 
    setHeader, 
    displayType, 
    setDisplayType, 
    setDisplaySongs
}) => {
    const {
        currPlaylistDisplaying,
        setCurrPlaylistDisplaying
    } = useContext(Context);
    const handleDelete = () => {
        const newList = playlists.filter((playlist) => playlist !== playlistName);
        setPlaylists(newList);
        if (playlistName === currPlaylistDisplaying && displayType === "playlist") {
            setCurrPlaylistDisplaying(""); 
            setHeader([""]);
            setDisplaySongs([]);
        }
    }
    const displayPlaylist = () => {
        setCurrPlaylistDisplaying(playlistName);
        setHeader([playlistName]);
        setDisplayType("playlist");
        setDisplaySongs(loadPlaylistSongs("user", playlistName));
    }   
    return (
        <div className="sidebar-playlist">
            <button 
                className={(playlistName===currPlaylistDisplaying) ? "playlist-button showing" : "playlist-button notshowing"}
                onClick={displayPlaylist}
            >{playlistName}</button>
            <button className="delete-button" onClick={handleDelete}>
                <div id="delete-icon-div">
                    <MinusIcon className="delete-icon" />
                </div>
            </button>
        </div>
    );
}

export default SidebarPlaylist;