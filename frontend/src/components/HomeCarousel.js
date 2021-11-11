import React from 'react';
import { Carousel, Image } from 'react-bootstrap';

const HomeCarousel = () => {
    return (
        <div className="text-center">
            <h3>Explore College Admission Website And Find The Best Schools For You</h3>
            <Carousel pause="hover" className="bg-transparent">
                <Carousel.Item key="home1">
                    <Image src="images/home1.jpeg" fluid />
                </Carousel.Item>
                <Carousel.Item key="home2">
                    <Image src="images/home2.jpeg" fluid />
                </Carousel.Item>
                <Carousel.Item key="home3">
                    <Image src="images/home3.jpeg" fluid />
                </Carousel.Item>
                <Carousel.Item key="home4">
                    <Image src="images/home4.jpeg" fluid />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default HomeCarousel;
