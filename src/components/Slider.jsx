import React, { useState, useEffect, useRef } from "react";
import { Close } from "./icons/Close";
import { LeftCaret } from "./icons/LeftCaret";
import { RightCaret } from "./icons/RightCaret";
import "../styles/slider.css";

const images = [
    "dan-patino-fotografia-contatti.jpg",
    "dan-patino-fotografia-matrimonio-portfolio-1.jpg",
    "dan-patino-fotografia-moda-portfolio-1.jpg",
    "dan-patino-fotografia-ritratto-1.jpg",
    "daniel-patino-hero-mobile.jpeg",
]

export function Slider({ isSliderOpen, setIsSliderOpen }) {
    const sliderRef = useRef(null);
    const size = images.length - 1;
    const [position, setPosition] = useState(0);

    const handleLeftClick = () => {
        if (position === 0) {
            setPosition(size);
        } else {
            setPosition(position - 1);
        }
    }

    const handleRightClick = () => {
        if (position === size) {
            setPosition(0);
        } else {
            setPosition(position + 1);
        }
    }

    const handleKeyUp = (e) => {
        if (e.key === "Escape") {
            setIsSliderOpen();
        } else if (e.key === "ArrowLeft") {
            handleLeftClick();
        } else if (e.key === "ArrowRight") {
            handleRightClick();
        }
    }

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.focus();
        }
    }, [isSliderOpen]);

    if (!isSliderOpen) return null;

    return (
        <div
            className="slider"
            onKeyUp={(e) => handleKeyUp(e)}
            ref={sliderRef}
            tabIndex="-1"
        >
            <div onClick={setIsSliderOpen}>
                <Close />
            </div>
            <div onClick={handleLeftClick}>
                <LeftCaret />
            </div>
            <div onClick={handleRightClick}>
                <RightCaret />
            </div>
            <div
                className="slider-image"
                style={{ backgroundImage: `url(/landing/${images[position]})` }}>
            </div>
        </div>
    );
}