import React, { useState, useEffect, useRef } from "react";
import { Close } from "./icons/Close";
import { LeftCaret } from "./icons/LeftCaret";
import { RightCaret } from "./icons/RightCaret";
import "../styles/slider.css";

export function Slider({ isSliderOpen, setIsSliderOpen, selectedPortfolio }) {
    const sliderRef = useRef(null);
    const size = {
        "bodas": 134,
        "retratos": 56,
        "moda": 11
    }
    const [position, setPosition] = useState(1);
    const [thumbnailOffset, setThumbnailOffset] = useState(0);
    const thumbnailsRef = useRef(null);

    const handleLeftClick = () => {
        setPosition((prev) => (prev === 1 ? size[selectedPortfolio] : prev - 1));
    };

    const handleRightClick = () => {
        setPosition((prev) => (prev === size[selectedPortfolio] ? 1 : prev + 1));
    };

    const handleKeyUp = (e) => {
        if (e.key === "Escape") {
            closeSlider();
        } else if (e.key === "ArrowLeft") {
            handleLeftClick();
        } else if (e.key === "ArrowRight") {
            handleRightClick();
        }
    };

    const closeSlider = (e) => {
        setPosition(1);
        setIsSliderOpen();
    }

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.focus();
        }
    }, [isSliderOpen]);

    useEffect(() => {
        if (thumbnailsRef.current) {
            const selectedThumbnail = thumbnailsRef.current.children[position - 1];
            if (selectedThumbnail) {
                selectedThumbnail.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            }
        }
    }, [position]);

    if (!isSliderOpen) return null;

    return (
        <div
            className="slider"
            onKeyUp={(e) => handleKeyUp(e)}
            ref={sliderRef}
            tabIndex="-1"
        >
            <div onClick={closeSlider}>
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
                style={{ backgroundImage: `url('/portafolio/${selectedPortfolio}/${selectedPortfolio} ${position}.jpg')` }}>
            </div>
            <div className="thumbnail-container">
                <div className="thumbnails" ref={thumbnailsRef}>
                    {Array.from({ length: size[selectedPortfolio] }, (_, i) => i + 1).map((num) => (
                        <img
                            key={num}
                            className={`thumbnail ${position === num ? "selected" : ""}`}
                            src={`/portafolio/${selectedPortfolio}/miniaturas/${selectedPortfolio} ${num}.jpg`}
                            alt={`Miniatura ${num}`}
                            onClick={() => setPosition(num)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}