import React, {useState} from 'react'
import './Slider.css'
import BtnSlider from './BtnSlider'
import useFetch from '../../hooks/useFetch'
import { JPA_API_URL } from "../../Constants";


export default function Slider(id) {

    console.log(id);

    const { data, loading, error } = useFetch(`${JPA_API_URL}/estivageCentre/` + id.id );

    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== data.estivageCentrePhotos.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === data.estivageCentrePhotos.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(data.estivageCentrePhotos.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }
    if(data.length !==0 && data.estivageCentrePhotos.length !==0)
    {
    return (
        <div className="container-slider">
            {data.estivageCentrePhotos.map((obj, index) => {
                return (
                    <div
                    key={index}
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <img 
                        src={obj.photo} 
                        />
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: data.estivageCentrePhotos.length}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )}
    else return (
        <></>
    )
}
