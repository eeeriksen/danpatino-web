import React, { useState } from 'react';
import { Slider } from './Slider';
import '../styles/portfolio.css';

export function Portfolio() {
    const [isSliderOpen, setIsSliderOpen] = useState(false);

    const handleOpenSlider = () => {
        if (isSliderOpen) {
            document.body.style.overflow = 'scroll';
        } else {
            document.body.style.overflow = 'hidden';
        }
        setIsSliderOpen(!isSliderOpen);
    }

    return (
        <section id="portafolio">
            <div className="text">
                <h2>Portafolio</h2>
                <hr />
                <p>
                    Explora mi portafolio y descubre momentos capturados con creatividad
                    y pasión.
                </p>
            </div>

            <div className="parent">
                <div onClick={handleOpenSlider} className="div1">
                    <h3>Matrimonio</h3>
                </div>
                <div onClick={handleOpenSlider} className="div2">
                    <h3>Retrato</h3>
                </div>
                <div onClick={handleOpenSlider} className="div3">
                    <h3>Moda</h3>
                </div>
            </div>

            <Slider
                isSliderOpen={isSliderOpen}
                setIsSliderOpen={handleOpenSlider}
            />
        </section>
    )
}