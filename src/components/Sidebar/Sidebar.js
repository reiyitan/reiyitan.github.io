import React from "react"; 
import { useState } from "react"; 
import SidebarPlaylist from "../SidebarPlaylist"; 
import Form from "../Form";
import { loadPlaylists } from "../functions";
import "./style.css";

/**
 * Component for the sidebar containing the Searchbar, add playlist button, and playlists.
 * 
 * @param setHeader - Allows the sidebar to change the text of the header component.
 * @param setDisplaySongs - Allows the sidebar to change the songs being displayed.
 * @param displayType - Part of state of the entire web app. Value is either "search" or "playlist".
 * @param setDisplayType - Used to specify whether a playlist or search result should be displayed.
 * 
 * @returns The Sidebar component.
 */
const Sidebar = ({
    setHeader, 
    setDisplaySongs, 
    displayType, 
    setDisplayType,
}) => {
    const [playlists, setPlaylists] = useState(loadPlaylists("user goes here"));

    /**
     * Adds a new empty playlist to this component's list of playlists. 
     * Unhides the add play list button and hides the playlist name form. 
     * 
     * @param playlistName - The name of the new playlist.
     */
    const createPlaylist = (e) => {
        const playlistName = e.target.query.value;
        if (playlistName === "") {
            console.log("no empty playlist name allowed");
        }
        else if (playlists.find((playlist) => playlist === playlistName) !== undefined) {
            //TODO add code saying you cannot have duplicate names
            console.log("no duplicates allowed");
        }
        else { 
            //TODO add this playlist to the backend as an empty playlist
            setPlaylists([...playlists, playlistName]);
        }
    }

    return (
        <div id="sidebar">
            <Form 
                title="Add a playlist"
                placeholder="Enter playlist title:"
                handleSubmit={createPlaylist}
                position = {{
                    left: "0px",
                    top: "0px"
                }}
                image="/icons/add/add.png"
                imageHover="/icons/add/add-hover.png"
            />
            <div id="sidebar-playlists">
                {playlists.slice().reverse().map((playlistName) => (
                    <SidebarPlaylist 
                        key={playlistName} 
                        playlistName={playlistName}
                        playlists={playlists}
                        setPlaylists={setPlaylists}
                        setHeader={setHeader}
                        displayType={displayType}
                        setDisplayType={setDisplayType}
                        setDisplaySongs={setDisplaySongs}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar; 