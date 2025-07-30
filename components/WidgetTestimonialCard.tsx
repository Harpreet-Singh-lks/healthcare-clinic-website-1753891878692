"use client";

import React, { useState, useEffect } from 'react';
import type { DoctorData } from '../../../src/types/doctor';

interface TestimonialCardData {
  quote?: string;
  author?: string;
  age?: number;
  condition?: string;
  rating?: number;
}

interface WidgetTestimonialCardProps {
  quote?: string;
  author?: string;
  age?: number;
  condition?: string;
  rating?: number;
  testimonialIndex?: number; // Which testimonial to show (0, 1, 2, etc.)
  className?: string;
}

// Default fallback data
const defaultData = {
  quote: "Dr. Bellamy was incredibly thorough and caring. He took the time to explain everything clearly and made me feel comfortable throughout the entire process.",
  author: "Sarah Johnson",
  age: 45,
  condition: "Diabetes Management",
  rating: 5
};

export const WidgetTestimonialCard: React.FC<WidgetTestimonialCardProps> = ({
  quote,
  author,
  age,
  condition,
  rating,
  testimonialIndex = 0, // Default to first testimonial
  className = ""
}) => {
  const [savedDoctorData, setSavedDoctorData] = useState<DoctorData | null>(null);

  useEffect(() => {
    const loadData = () => {
      try {
        // Use 'doctorData' instead of 'testimonialCardData'
        const saved = localStorage.getItem('doctorData');
        console.log('WidgetTestimonialCard - Raw localStorage data:', saved);
        if (saved) {
          const parsedData = JSON.parse(saved);
          console.log('WidgetTestimonialCard - Parsed doctor data:', parsedData);
          setSavedDoctorData(parsedData);
        }
      } catch (error) {
        console.error('Error loading doctor data:', error);
      }
    };

    loadData();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'doctorData' && e.newValue) {
        try {
          setSavedDoctorData(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Error parsing updated doctor data:', error);
        }
      }
    };

    // Also poll for changes (in case form is in same tab)
    const interval = setInterval(loadData, 1000);

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Get testimonial from saved data or use props/defaults
  const getTestimonialData = () => {
    // If we have saved testimonials and the requested index exists
    if (savedDoctorData?.testimonials && savedDoctorData.testimonials[testimonialIndex]) {
      const testimonial = savedDoctorData.testimonials[testimonialIndex];
      return {
        quote: testimonial.quote,
        author: testimonial.author,
        age: testimonial.age,
        condition: testimonial.condition,
        rating: testimonial.rating
      };
    }
    
    // Otherwise use props or default data
    return {
      quote: quote || defaultData.quote,
      author: author || defaultData.author,
      age: age || defaultData.age,
      condition: condition || defaultData.condition,
      rating: rating || defaultData.rating
    };
  };

  const finalData = getTestimonialData();

  console.log('WidgetTestimonialCard - Final data being used:', finalData);
  console.log('WidgetTestimonialCard - Testimonial index:', testimonialIndex);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className={`bg-[#E0F3F0] rounded-2xl p-6 ${className}`}>
      {/* Quote Section */}
      <div className="mb-6" style={{ maxHeight: '115px', overflow: 'hidden' }}>
        <p className="text-gray-800 font-sans text-sm leading-relaxed"
           style={{
             fontWeight: '500',
             fontSize: 'clamp(10px, 2vw, 16px)',
             lineHeight: '120%',
             letterSpacing: '0px',
             wordWrap: 'break-word',
             overflowWrap: 'break-word'
           }}>
          "{finalData.quote}"
        </p>
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column - Author Info */}
        <div className="flex flex-col">
          <span className="text-gray-900 font-sans text-sm font-semibold">
            {finalData.author}
          </span>
          <span className="text-gray-600 font-sans text-xs">
            {finalData.age} • {finalData.condition}
          </span>
        </div>

        {/* Right Column - Star Rating */}
        <div className="flex justify-end items-start">
          <div className="flex items-center">
            <span className="text-black font-sans text-sm font-semibold">
              {finalData.rating.toFixed(1)}
            </span>
            <img 
              src="/Storefront/Doctor Widget/Testimonials/Star2.svg" 
              alt="Star" 
              className="w-3 h-3 ml-1"
            />
          </div>
        </div>
      </div>

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-2 bg-white/50 rounded text-xs">
          <p>Data source: {savedDoctorData?.testimonials ? 'localStorage' : 'defaults'}</p>
          <p>Testimonial index: {testimonialIndex}</p>
          <p>Total testimonials: {savedDoctorData?.testimonials?.length || 0}</p>
          <p>Author: "{finalData.author}"</p>
        </div>
      )}
    </div>
  );
}; 

export default WidgetTestimonialCard;