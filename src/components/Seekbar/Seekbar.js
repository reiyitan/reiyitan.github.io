import React from "react"; 
import { useState, useContext, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
import { Context } from "../App/App";
import "./style.css";

/**
 * A seek bar components that changes the position of the current song, as well as
 * displays the current timestamp and remaining time. 
 * 
 * @param playbackRef - A reference to the current Howl. 
 */
const SeekBar = () => {
    const {
        playbackRef
    } = useContext(Context);
    const [values, setValues] = useState([0]);
    const [timestamp, setTimestamp] = useState("0:00"); 

    //set thumb position to 0 if there is no song playing
    useEffect(() => {
        if (!playbackRef.current) setValues([0]);
    }, [playbackRef.current]);

    //update the position of the thumb every 60th of a second
    useEffect(() => {
        const seekUpdater = setInterval(() => {
            if (playbackRef.current) {
                setValues([Math.round(playbackRef.current.seek() * 100) / 100]);
            }
        }, 1000/60);
        return () => clearInterval(seekUpdater);
    }, [playbackRef]);

    //update timestamps
    useEffect(() => {
        const timestampUpdater = setInterval(() => {
            if (playbackRef.current) {
                setTimestamp(playbackRef.current.seek());
            }
            else {
                setTimestamp("0:00");
            }
        }, 1000/60);
        return () => clearInterval(timestampUpdater);
    }, [playbackRef]);

    const formatTime = (duration) => {
        if (duration < 0) return "0:00";
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    const handleSeek = (position) => {
        if (!playbackRef.current) return; 
        setValues([Math.round([position] * 100) / 100]);
        playbackRef.current.seek(position);
    }

    return (
        <>
            <div id="timestamp">
                {(playbackRef.current) 
                    ? formatTime(timestamp)
                    : "0:00"
                }
            </div>
            <Range 
                values={values}
                min={0}
                max={(playbackRef.current) ? Math.round(playbackRef.current.duration() * 100) / 100 : 1}
                step={0.01}
                onChange={(values) => handleSeek(values[0])}
                renderTrack={({props, children}) => (
                    <div
                        {...props}
                        className="react-range-track"
                        style={{
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: getTrackBackground({
                                values,
                                colors: ["#8FBCBB", "#434C5E"],
                                min: "0",
                                max: (playbackRef.current) ? playbackRef.current.duration() : 1,
                                direction: 'to right'
                            }),
                        }}  
                    >
                        {children}
                    </div>
                )}
                renderThumb={({props}) => (
                    <div
                        {...props}
                        className="react-range-thumb"
                    >
                    </div>
                )}
            />
            <div id="remaining">
                {(playbackRef.current) 
                    ? formatTime(playbackRef.current.duration() - timestamp)
                    : "0:00"
                }
            </div>
        </>
    )
}

export default SeekBar;