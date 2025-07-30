"use client";

import React, { useState, useEffect } from 'react';
import type { DoctorData } from '../../../src/types/doctor';

interface ProfileData {
  doctorName?: string;
  specialty?: string;
  patients?: string;
  experience?: string;
  rating?: string;
  imageSrc?: string;
}

interface WidgetProfileProps {
  doctorName?: string;
  specialty?: string;
  patients?: string;
  experience?: string;
  rating?: string;
  imageSrc?: string;
  onBookAppointment?: () => void;
  className?: string;
}

// Default fallback data
const defaultData = {
  doctorName: "Dr. Bellamy Nicholas",
  specialty: "MD, Family Medicine",
  patients: "1000+",
  experience: "10 Yrs",
  rating: "4.5",
  imageSrc: "/Storefront/Doctor Widget/DoctorImage.png"
};

export const WidgetProfile: React.FC<WidgetProfileProps> = ({
  doctorName,
  specialty,
  patients,
  experience,
  rating,
  imageSrc,
  onBookAppointment,
  className = ""
}) => {
  const [savedDoctorData, setSavedDoctorData] = useState<DoctorData | null>(null);

  useEffect(() => {
    const loadData = () => {
      try {
        // Use 'doctorData' instead of 'profileData'
        const saved = localStorage.getItem('doctorData');
        console.log('WidgetProfile - Raw localStorage data:', saved);
        if (saved) {
          const parsedData = JSON.parse(saved);
          console.log('WidgetProfile - Parsed doctor data:', parsedData);
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

  // Map DoctorData fields to Profile fields
  const finalData = {
    doctorName: savedDoctorData?.name || doctorName || defaultData.doctorName,
    specialty: savedDoctorData?.specialty || specialty || defaultData.specialty,
    patients: savedDoctorData?.patients || patients || defaultData.patients,
    experience: savedDoctorData?.experience || experience || defaultData.experience,
    rating: savedDoctorData?.rating || rating || defaultData.rating,
    imageSrc: savedDoctorData?.photoUrl || imageSrc || defaultData.imageSrc
  };

  console.log('WidgetProfile - Final data being used:', finalData);

  return (
    <div className={`w-[400px] bg-[#02816C] rounded-2xl p-8 text-center ${className}`}>
      {/* Profile Picture Section */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div 
            className="w-24 h-24 rounded-full overflow-hidden border-2"
            style={{ borderColor: '#69B4A8' }}
          >
            <img 
              src={finalData.imageSrc}
              alt={finalData.doctorName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Name and Title Section */}
      <div className="mb-8">
        <h3 className="text-white font-sans text-2xl font-bold mb-2">
          {finalData.doctorName}
        </h3>
        <p className="text-gray-300 font-sans text-lg">
          {finalData.specialty}
        </p>
      </div>

      {/* Statistics Section */}
      <div className="relative mb-8">
        <div className="grid grid-cols-3 gap-4">
          {/* Patients */}
          <div className="text-center">
            <div className="text-white font-sans text-2xl font-bold mb-1">
              {finalData.patients}
            </div>
            <div className="text-gray-300 font-sans text-sm">
              Patients
            </div>
          </div>

          {/* Experience */}
          <div className="text-center">
            <div className="text-white font-sans text-2xl font-bold mb-1">
              {finalData.experience}
            </div>
            <div className="text-gray-300 font-sans text-sm">
              Experience
            </div>
          </div>

          {/* Rating */}
          <div className="text-center">
            <div className="text-white font-sans text-2xl font-bold mb-1">
              {finalData.rating}
            </div>
            <div className="text-gray-300 font-sans text-sm">
              Ratings
            </div>
          </div>
        </div>

        {/* Fading separator lines */}
        <div className="absolute left-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent transform -translate-x-1/2"></div>
        <div className="absolute right-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent transform translate-x-1/2"></div>
      </div>

      {/* Book Appointment Button */}
      <div className="w-full">
        <button
          onClick={onBookAppointment}
          className="w-full bg-white text-teal-800 font-sans font-semibold py-3 px-6 rounded-2xl hover:bg-gray-100 transition-colors duration-200"
        >
          Book Appointment
        </button>
      </div>

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-2 bg-white/10 rounded text-xs text-white">
          <p>Data source: {savedDoctorData ? 'localStorage' : 'defaults'}</p>
          <p>Doctor name: "{finalData.doctorName}"</p>
          <p>Specialty: "{finalData.specialty}"</p>
        </div>
      )}
    </div>
  );
}; 

export default WidgetProfile;