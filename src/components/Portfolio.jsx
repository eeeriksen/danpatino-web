import React, { useState } from 'react';
import { Slider } from './Slider';
import '../styles/portfolio.css';

export function Portfolio() {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);

    const handleOpenSlider = (e) => {
        if (isSliderOpen) {
            document.body.style.overflow = 'scroll';
        } else {
            setSelectedPortfolio(e.target.className);
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
                <div onClick={handleOpenSlider} className="bodas">
                    <h3>Bodas</h3>
                </div>
                <div onClick={handleOpenSlider} className="retratos">
                    <h3>Retratos</h3>
                </div>
                <div onClick={handleOpenSlider} className="moda">
                    <h3>Moda</h3>
                </div>
            </div>

            <Slider
                selectedPortfolio={selectedPortfolio}
                isSliderOpen={isSliderOpen}
                setIsSliderOpen={handleOpenSlider}
            />
        </section>
    )
}