import React from "react"; 
import { useState, useContext, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
import { Context } from "../App/App";
import "./style.css";

const Seekbar = () => {
    const {
        playbackRef
    } = useContext(Context);
    const [values, setValues] = useState([0]);

    useEffect(() => {
        if (!playbackRef.current) setValues([0]);
    }, [playbackRef.current]);

    useEffect(() => {
        const seekUpdater = setInterval(() => {
            if (playbackRef.current) {
                setValues([Math.round(playbackRef.current.seek() * 100) / 100]);
            }
        }, 1000/60);

        return () => clearInterval(seekUpdater);
    }, [playbackRef]);

    const handleSeek = (position) => {
        if (!playbackRef.current) return; 
        setValues([Math.round([position] * 100) / 100]);
        playbackRef.current.seek(position);
    }

    return (
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
    )
}

export default Seekbar;