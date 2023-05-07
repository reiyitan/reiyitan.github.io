import React from "react"; 
import { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import "./style.css";

/**
 * Creates a component that changes volume based on position of 
 * a slider. 
 * 
 * @param volume - The current volume. 
 * @param setVolume - Sets the state of volume. 
 * @param playbackRef - A reference to the current Howl.
 */
const VolumeBar = ({volume, setVolume, playbackRef}) => {
    const [values, setValues] = useState([volume]);
    const changeVolume = (volume) => {
        setVolume(volume);
        setValues([volume]);
        if (playbackRef.current) playbackRef.current.volume(volume);
    }

    return (
        <Range 
            values={values}
            min={0}
            max={1}
            step={0.01}
            onChange={(values) => changeVolume(values[0])}
            renderTrack={({props, children}) => (
                <div
                    {...props}
                    className="volume-range-track"
                    style={{
                        right: "35px",
                        background: getTrackBackground({
                            values,
                            colors: ["#8FBCBB", "#434C5E"],
                            min: 0,
                            max: 1,
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
                    className="volume-range-thumb"
                >
                </div>
            )}
        />
    )
}

export default VolumeBar;