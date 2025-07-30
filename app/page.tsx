"use client";

import React from 'react';
import { WidgetAboutDoctor } from '../components/WidgetAboutDoctor'
import { WidgetProfile } from '../components/WidgetProfile'
import { WidgetTestimonialCarousel } from '../components/WidgetTestimonialCarousel'
import { WidgetTestimonialCard } from '../components/WidgetTestimonialCard'
import { WidgetServicesAndConditions } from '../components/WidgetServicesAndConditions'

export default function Home() {
  return (
    <main className="min-h-screen">
      <WidgetAboutDoctor
        aboutText="love guru"
        education={[
        {
                "college": "iit",
                "activity": "love god"
        },
        {
                "college": "st",
                "activity": "Fellowship in Preventive Medicine"
        }
]}
        hospitals={[
        "hp"
]}
        certificates={[
        "test"
]}
        languages={[
        "Hindi"
]}
        className=""
      />
      <WidgetProfile
        doctorName="test"
        specialty="love guru"
        patients="1"
        experience="1000+"
        rating="100000000"
        imageSrc="/Storefront/Doctor Widget/DoctorImage.png"
        className=""
      />
      <WidgetTestimonialCarousel
        testimonials={[
        {
                "quote": "fuck you",
                "author": "Sarah Johnson",
                "age": 45,
                "condition": "love problem",
                "rating": 5
        }
]}
        overallRating={1}
        totalReviews={1}
        recommendedRate={19}
        className=""
      />
      <WidgetTestimonialCard
        quote="fuck you"
        author="Sarah Johnson"
        age={45}
        condition="love problem"
        rating={5}
        className=""
      />
      <WidgetServicesAndConditions
        specializedServices={[
        {
                "name": "ok",
                "icon": "/Storefront/Doctor Widget/Services And Conditions/HealthPlus.svg"
        }
]}
        conditions={[
        "Diabetes Management",
        "Hypertension",
        "High Cholesterol",
        "Preventive Care",
        "Cardiovascular Health",
        "Weight Management"
]}
        className=""
      />
    </main>
  );
}