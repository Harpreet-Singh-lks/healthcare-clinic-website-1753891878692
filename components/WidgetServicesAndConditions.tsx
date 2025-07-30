"use client";

import React, { useState, useEffect } from 'react';
import type { DoctorData } from '../../../src/types/doctor';

interface ServiceItem {
  name: string;
  icon: string;
}

interface ServicesConditionsData {
  specializedServices?: ServiceItem[];
  conditions?: string[];
}

interface WidgetServicesAndConditionsProps {
  specializedServices?: ServiceItem[];
  conditions?: string[];
  onAskCondition?: () => void;
  className?: string;
}

// Default fallback data
const defaultData = {
  specializedServices: [
    { name: "Cardiovascular Care", icon: "/Storefront/Doctor Widget/Services And Conditions/HeartMonitor.svg" },
    { name: "Preventive Medicine", icon: "/Storefront/Doctor Widget/Services And Conditions/MedBag.svg" },
    { name: "General Consultation", icon: "/Storefront/Doctor Widget/Services And Conditions/HealthPlus.svg" }
  ],
  conditions: [
    "Diabetes Management",
    "Hypertension",
    "High Cholesterol",
    "Preventive Care",
    "Cardiovascular Health",
    "Weight Management"
  ]
};

export const WidgetServicesAndConditions: React.FC<WidgetServicesAndConditionsProps> = ({
  specializedServices,
  conditions,
  onAskCondition,
  className = ""
}) => {
  const [savedDoctorData, setSavedDoctorData] = useState<DoctorData | null>(null);

  useEffect(() => {
    const loadData = () => {
      try {
        // Use 'doctorData' instead of 'servicesConditionsData'
        const saved = localStorage.getItem('doctorData');
        console.log('WidgetServicesAndConditions - Raw localStorage data:', saved);
        if (saved) {
          const parsedData = JSON.parse(saved);
          console.log('WidgetServicesAndConditions - Parsed doctor data:', parsedData);
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

  // Map DoctorData fields to Services and Conditions
  const finalData = {
    specializedServices: savedDoctorData?.services || specializedServices || defaultData.specializedServices,
    conditions: savedDoctorData?.conditions || conditions || defaultData.conditions
  };

  console.log('WidgetServicesAndConditions - Final data being used:', finalData);

  return (
    <div className={`w-[360px] bg-white rounded-2xl p-8 relative ${className}`} 
         style={{
           border: '2px solid #029A80'
         }}>
      
      {/* Header */}
      <div className="flex items-center mb-6">
        <img 
          src="/Storefront/Doctor Widget/Services And Conditions/BulletedList.svg" 
          alt="Services" 
          className="w-5 h-5 mr-2"
        />
        <h3 className="text-black font-sans text-xl font-bold">
          Services and Conditions
        </h3>
      </div>

      {/* Specialized Services */}
      {finalData.specializedServices && finalData.specializedServices.length > 0 && (
        <div className="mb-6">
          <h4 className="text-black font-sans text-lg font-semibold mb-4">
            Specialized Services
          </h4>
          <div className="space-y-3">
            {finalData.specializedServices.map((service, index) => (
              <div key={index} className="flex items-center p-3 rounded-lg" style={{ backgroundColor: '#E0F8F2' }}>
                <img 
                  src={service.icon}
                  alt={service.name} 
                  className="w-5 h-5 mr-3"
                  style={{ filter: 'brightness(0)' }}
                />
                <span className="text-gray-800 font-sans text-sm font-medium">
                  {service.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fading Horizontal Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-6"></div>

      {/* Conditions I Treat */}
      {finalData.conditions && finalData.conditions.length > 0 && (
        <div className="mb-6">
          <h4 className="text-black font-sans text-lg font-semibold mb-4">
            Conditions I Treat
          </h4>
          <div className="space-y-2">
            {finalData.conditions.map((condition, index) => (
              <div key={index} className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 font-sans text-sm">
                  {condition}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Don't See Your Condition Listed */}
      <div className="p-4 rounded-lg" 
           style={{
             background: 'linear-gradient(135deg, #01715E 0%, #029F85 100%)'
           }}>
        <h4 className="text-white font-sans text-base font-bold mb-2">
          Don't See Your Condition Listed?
        </h4>
        <p className="text-white/80 font-sans text-sm mb-4">
          Contact us to ask about your specific condition and treatment options.
        </p>
        <button
          onClick={onAskCondition}
          className="w-full inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm transform-gpu bg-transparent text-white border border-white hover:bg-white hover:text-teal-600"
        >
          Ask About My Condition
        </button>
      </div>

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
          <p>Data source: {savedDoctorData ? 'localStorage' : 'defaults'}</p>
          <p>Services: {finalData.specializedServices?.length || 0} items</p>
          <p>Conditions: {finalData.conditions?.length || 0} items</p>
          {savedDoctorData && (
            <div className="mt-2">
              <p>Services from form: {savedDoctorData.services?.length || 0}</p>
              <p>Conditions from form: {savedDoctorData.conditions?.length || 0}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};  

export default WidgetServicesAndConditions;