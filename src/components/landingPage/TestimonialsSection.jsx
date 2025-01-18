import React from 'react'
import { AnimatedTestimonials } from '../ui/animated-testimonials'

function TestimonialsSection() {
    const testimonials = [
        {
            "src": "https://res.cloudinary.com/def0bw74n/image/upload/v1735735978/SmartScribe/WhatsApp_Image_2025-01-01_at_18.22.07_6443ab1a_l9vkjr.jpg",
            "name": "Manan Atal",
            "designation": "Home Chef",
            "quote": "Cookly has completely changed the way I cook! The personalized recipes are a lifesaver!"
        },
        {
            "src": "https://res.cloudinary.com/def0bw74n/image/upload/v1735735883/SmartScribe/WhatsApp_Image_2024-12-30_at_20.45.25_97dcd201_jy4kci.jpg",
            "name": "Rohan Jadoun",
            "designation": "Food Enthusiast",
            "quote": "From meal planning to quick recipes, Cookly makes everything so simple and enjoyable."
        },
        {
            "src": "https://res.cloudinary.com/dymfhvwou/image/upload/v1710008266/AITRCSI/IMG-20240224-WA0004_-_Nishchal_Vyas_z4yzof.jpg",
            "name": "Nishchal Vyas",
            "designation": "Busy Professional",
            "quote": "Cookly’s smart tools save me so much time in the kitchen. It’s a game-changer!"
        }
    ];
    
    return (
        <div id='testimonials' className='bg-gray-50 py-16'>
            <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
                What Our Users Say
            </h4>
            <AnimatedTestimonials testimonials={testimonials} autoplay />
        </div>
    )
}

export default TestimonialsSection


