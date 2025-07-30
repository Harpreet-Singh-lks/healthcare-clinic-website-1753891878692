"use client";

import React, { useState, useEffect } from 'react';
import type { DoctorData } from '../../../src/types/doctor';

interface EducationItem {
  college: string;
  activity: string;
}

interface WidgetAboutDoctorProps {
  doctor?: DoctorData;
  aboutText?: string;
  education?: EducationItem[];
  hospitals?: string[];
  certificates?: string[];
  languages?: string[];
  className?: string;
}

// Default fallback data (only used if no other data exists)
const defaultData = {
  aboutText: "Dr. Bellamy Nicholas is a board-certified family medicine physician with over 10 years of experience in primary care. He specializes in preventive medicine, chronic disease management, and patient education.",
  education: [
    { college: "Harvard Medical School", activity: "Medical Degree" },
    { college: "Johns Hopkins University", activity: "Residency in Family Medicine" },
    { college: "Stanford University", activity: "Fellowship in Preventive Medicine" }
  ],
  hospitals: [
    "Massachusetts General Hospital",
    "Johns Hopkins Hospital",
    "Stanford Medical Center"
  ],
  certificates: [
    "American Board of Family Medicine",
    "Board Certified in Preventive Medicine",
    "Advanced Cardiac Life Support"
  ],
  languages: ["English", "Spanish", "French"]
};

export const WidgetAboutDoctor: React.FC<WidgetAboutDoctorProps> = ({
  doctor,
  aboutText,
  education,
  hospitals,
  certificates,
  languages,
  className = ""
}) => {
  const [savedDoctorData, setSavedDoctorData] = useState<DoctorData | null>(null);

  // Load doctor data from localStorage on component mount
  useEffect(() => {
    const loadDoctorData = () => {
      try {
        const saved = localStorage.getItem('doctorData');
        console.log('Raw localStorage data:', saved);
        if (saved) {
          const parsedData = JSON.parse(saved);
          console.log('Parsed doctor data:', parsedData);
          setSavedDoctorData(parsedData);
        }
      } catch (error) {
        console.error('Error loading doctor data from localStorage:', error);
      }
    };

    loadDoctorData();

    // Listen for localStorage changes
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
    const interval = setInterval(loadDoctorData, 1000);

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Use saved data if it exists, otherwise use props, otherwise use defaults
  const finalData = {
    aboutText: savedDoctorData?.aboutText || aboutText || doctor?.aboutText || defaultData.aboutText,
    education: savedDoctorData?.education || education || doctor?.education || defaultData.education,
    hospitals: savedDoctorData?.hospitals || hospitals || doctor?.hospitals || defaultData.hospitals,
    certificates: savedDoctorData?.certificates || certificates || doctor?.certificates || defaultData.certificates,
    languages: savedDoctorData?.languages || languages || doctor?.languages || defaultData.languages
  };

  console.log('Final data being used:', finalData); // Debug log

  return (
    <div className={`w-[360px] bg-white rounded-2xl p-8 relative ${className}`} 
         style={{
           background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 75%, #03B894 100%)',
           border: '2px solid #029A80'
         }}>
      
      {/* About Doctor Section */}
      {finalData.aboutText && (
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <img 
              src="/Storefront/Doctor Widget/About Doctor/Stethoscope.svg"
              alt="About Doctor"
              className="w-6 h-6 mr-3"
            />
            <h3 className="text-black font-sans text-xl font-bold">
              About Doctor
            </h3>
          </div>
          <p className="text-gray-600 font-sans text-sm leading-relaxed">
            {finalData.aboutText}
          </p>
        </div>
      )}

      {/* Faded Horizontal Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-8"></div>

      {/* Education Section */}
      {finalData.education && finalData.education.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <img 
              src="/Storefront/Doctor Widget/About Doctor/GradCap.svg"
              alt="Education"
              className="w-6 h-6 mr-3"
            />
            <h3 className="text-black font-sans text-xl font-bold">
              Education
            </h3>
          </div>
          <div className="space-y-3">
            {finalData.education.map((item: EducationItem, index: number) => (
              <div key={index} className="mb-3">
                <p className="text-gray-700 font-sans text-sm font-medium">
                  {item.college}
                </p>
                <p className="text-gray-500 font-sans text-xs">
                  {item.activity}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hospital Affiliation Section */}
      {finalData.hospitals && finalData.hospitals.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <img 
              src="/Storefront/Doctor Widget/About Doctor/Hospital.svg"
              alt="Hospital Affiliation"
              className="w-6 h-6 mr-3"
            />
            <h3 className="text-black font-sans text-xl font-bold">
              Hospital Affiliation
            </h3>
          </div>
          <div className="space-y-2">
            {finalData.hospitals.map((hospital: string, index: number) => (
              <p key={index} className="text-gray-700 font-sans text-sm">
                {hospital}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Board Certificates Section */}
      {finalData.certificates && finalData.certificates.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <img 
              src="/Storefront/Doctor Widget/About Doctor/Certificate.svg"
              alt="Board Certificates"
              className="w-6 h-6 mr-3"
            />
            <h3 className="text-black font-sans text-xl font-bold">
              Board Certificates
            </h3>
          </div>
          <div className="space-y-2">
            {finalData.certificates.map((certificate: string, index: number) => (
              <p key={index} className="text-gray-700 font-sans text-sm">
                {certificate}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Languages Section */}
      {finalData.languages && finalData.languages.length > 0 && (
        <div>
          <div className="flex items-center mb-4">
            <img 
              src="/Storefront/Doctor Widget/About Doctor/Language.svg"
              alt="Languages"
              className="w-6 h-6 mr-3"
            />
            <h3 className="text-black font-sans text-xl font-bold">
              Languages
            </h3>
          </div>
          <p className="text-gray-700 font-sans text-sm">
            {finalData.languages.join(', ')}
          </p>
        </div>
      )}

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
          <p>Data source: {savedDoctorData ? 'localStorage' : 'defaults'}</p>
          <p>localStorage exists: {savedDoctorData ? 'Yes' : 'No'}</p>
          {savedDoctorData && (
            <div className="mt-2">
              <p>About: "{savedDoctorData.aboutText}"</p>
              <p>Education: {savedDoctorData.education?.length || 0} items</p>
              <p>Hospitals: {savedDoctorData.hospitals?.length || 0} items</p>
              <p>Certificates: {savedDoctorData.certificates?.length || 0} items</p>
              <p>Languages: {savedDoctorData.languages?.length || 0} items</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WidgetAboutDoctor;