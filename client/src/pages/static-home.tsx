import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, Clock, MapPin, Star, Heart, Brain, Users, Shield, Zap, Dog, Check, Calendar, PhoneCall } from "lucide-react";
import heroImage from "@assets/Screenshot 2025-06-07 123852_1749292807560.png";

// Static testimonials data
const staticTestimonials = [
  {
    id: 1,
    customerName: "Sarah Johnson",
    petName: "Max",
    rating: 5,
    comment: "Robbie is absolutely wonderful with Max! He comes back from walks so happy and tired. Highly recommend this service for any dog owner.",
    date: "March 15, 2024"
  },
  {
    id: 2,
    customerName: "Mike Thompson",
    petName: "Luna",
    rating: 5,
    comment: "Professional, reliable, and my dog Luna loves her walks with Robbie. Great communication and very trustworthy.",
    date: "February 28, 2024"
  },
  {
    id: 3,
    customerName: "Emma Wilson",
    petName: "Charlie",
    rating: 5,
    comment: "Charlie has been going on walks with Robbie for 3 months now. He's noticeably happier and more well-behaved. Excellent service!",
    date: "January 20, 2024"
  }
];

export default function StaticHome() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  // Booking form
  const bookingForm = useForm({
    defaultValues: {
      ownerName: "",
      phone: "",
      email: "",
      dogName: "",
      dogBreed: "",
      serviceType: "",
      preferredDate: "",
      instructions: "",
    },
  });

  const handleBookingSubmit = async (data: any) => {
    setIsSubmittingBooking(true);
    try {
      // EmailJS configuration - you'll need to set up your EmailJS account
      // For now, we'll use mailto as fallback
      const subject = `Dog Walking Booking Request - ${data.dogName}`;
      const body = `
        Booking Request Details:
        
        Owner Name: ${data.ownerName}
        Phone: ${data.phone}
        Email: ${data.email}
        Dog Name: ${data.dogName}
        Dog Breed: ${data.dogBreed}
        Service Type: ${data.serviceType}
        Preferred Date: ${data.preferredDate}
        Special Instructions: ${data.instructions}
      `;
      
      const mailtoLink = `mailto:robbiesdogswalking@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink, '_blank');

      toast({
        title: "Booking Request Prepared",
        description: "Your email client should open with the booking details. Please send the email to complete your request.",
      });
      bookingForm.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to prepare booking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // Contact form
  const contactForm = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const handleContactSubmit = async (data: any) => {
    setIsSubmittingContact(true);
    try {
      const subject = `Contact Message from ${data.name}`;
      const body = `
        Contact Message:
        
        Name: ${data.name}
        Phone: ${data.phone}
        Email: ${data.email}
        Message: ${data.message}
      `;
      
      const mailtoLink = `mailto:robbiesdogswalking@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink, '_blank');

      toast({
        title: "Message Prepared",
        description: "Your email client should open with your message. Please send the email to complete your inquiry.",
      });
      contactForm.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to prepare message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  // Simple star rating component for static testimonials
  const StaticStarRating = ({ rating }: { rating: number }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Dog className="text-2xl text-forest mr-2" />
              <span className="font-bold text-xl text-forest">Robbies Dog Walking</span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button 
                  onClick={() => scrollToSection("home")} 
                  className="text-forest hover:text-orange-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection("services")} 
                  className="text-gray-600 hover:text-orange-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection("benefits")} 
                  className="text-gray-600 hover:text-orange-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Benefits
                </button>
                <button 
                  onClick={() => scrollToSection("reviews")} 
                  className="text-gray-600 hover:text-orange-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Reviews
                </button>
                <button 
                  onClick={() => scrollToSection("booking")} 
                  className="bg-orange-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-forest hover:text-orange-accent"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button 
                onClick={() => scrollToSection("home")} 
                className="text-forest block px-3 py-2 text-base font-medium w-full text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("services")} 
                className="text-gray-600 block px-3 py-2 text-base font-medium w-full text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection("benefits")} 
                className="text-gray-600 block px-3 py-2 text-base font-medium w-full text-left"
              >
                Benefits
              </button>
              <button 
                onClick={() => scrollToSection("reviews")} 
                className="text-gray-600 block px-3 py-2 text-base font-medium w-full text-left"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection("booking")} 
                className="bg-orange-accent text-white block px-3 py-2 text-base font-medium rounded-lg mx-3"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Image Section */}
      <section id="home" className="relative">
        <img 
          src={heroImage} 
          alt="Robbie's Dog Walking Services"
          className="w-full h-screen object-cover"
        />
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              Professional Dog Walking Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-600">
              Keep your furry friend happy, healthy, and well-exercised with our caring and professional dog walking services in your neighborhood.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => scrollToSection("booking")} 
                className="bg-orange-accent hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold"
              >
                Book a Walk Today
              </Button>
              <Button 
                onClick={() => scrollToSection("services")} 
                variant="outline" 
                className="border-2 border-forest text-forest hover:bg-forest hover:text-white px-8 py-4 text-lg font-semibold"
              >
                View Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Walking Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our flexible service options designed to fit your dog's needs and your schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 30 Minute Walk */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-forest text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">30 Minutes</h3>
                <div className="text-4xl font-bold text-forest mb-2">R100</div>
                <p className="text-gray-600 mb-6">Perfect for quick exercise and bathroom breaks</p>
                <ul className="text-left text-gray-600 space-y-2 mb-6">
                  <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Fresh water provided</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Exercise & playtime</li>
                </ul>
                <Button 
                  onClick={() => scrollToSection("booking")} 
                  className="w-full bg-forest text-white hover:bg-green-800"
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>

            {/* 1 Hour Walk */}
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-xl transition-shadow relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <CardContent className="p-8 text-center">
                <div className="bg-orange-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">1 Hour</h3>
                <div className="text-4xl font-bold text-orange-accent mb-2">R180</div>
                <p className="text-gray-600 mb-6">Comprehensive exercise and socialization</p>
                <ul className="text-left text-gray-600 space-y-2 mb-6">
                  <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Extended exercise time</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Socialization opportunities</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Photo updates</li>
                </ul>
                <Button 
                  onClick={() => scrollToSection("booking")} 
                  className="w-full bg-orange-accent text-white hover:bg-orange-600"
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>

            {/* Monthly 30 Minutes */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Monthly 30 Min</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">R1,140</div>
                <p className="text-gray-600 mb-6">3 walks per week for the whole month</p>
                <ul className="text-left text-gray-600 space-y-2 mb-6">
                  <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />12 walks included</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Flexible scheduling</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />5% savings</li>
                </ul>
                <Button 
                  onClick={() => scrollToSection("booking")} 
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>

            {/* Monthly 1 Hour */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L3 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.734.99A.996.996 0 0118 6v2a1 1 0 11-2 0v-.277l-1.254.145a1 1 0 11-.992-1.736L14.984 6l-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.723V12a1 1 0 11-2 0v-1.277l-1.246-.855a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.277l1.246.855a1 1 0 11-.992 1.736l-1.75-1A.996.996 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a.996.996 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.277V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Monthly 1 Hour</h3>
                <div className="text-4xl font-bold text-purple-600 mb-2">R2,030</div>
                <p className="text-gray-600 mb-6">3 hour-long walks per week for the whole month</p>
                <ul className="text-left text-gray-600 space-y-2 mb-6">
                  <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />12 extended walks</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Priority scheduling</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />6% savings</li>
                </ul>
                <Button 
                  onClick={() => scrollToSection("booking")} 
                  className="w-full bg-purple-600 text-white hover:bg-purple-700"
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Benefits of Our Dog Walking Service
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive care that goes beyond just walking your dog. Here's how our service benefits your furry friend.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Fresh Water Provided</h3>
                <p className="text-gray-600">We ensure your dog stays hydrated during walks with fresh, clean water.</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Maintains Health & Fitness</h3>
                <p className="text-gray-600">Regular walks build muscle tone, keep fitness up, and support overall physical health.</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Mental Health Benefits</h3>
                <p className="text-gray-600">Keeps dogs mentally healthy and reduces anxiety through stimulating environments.</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Better Socialization</h3>
                <p className="text-gray-600">Helps with socialization with other animals and getting comfortable in different environments.</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Reduces Fear & Aggression</h3>
                <p className="text-gray-600">Regular exposure to new environments helps reduce fear and aggressive behavior.</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Promotes Longevity</h3>
                <p className="text-gray-600">Regular exercise increases chances of living longer and improves sleep quality.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section with Static Testimonials */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what dog owners in our community have to say about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {staticTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="font-semibold text-gray-900">{testimonial.customerName}</h5>
                      <p className="text-sm text-gray-600">Dog: {testimonial.petName}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <StaticStarRating rating={testimonial.rating} />
                        <span className="text-sm text-gray-600">{testimonial.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{testimonial.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-forest text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Book Your Dog's Walk Today
            </h2>
            <p className="text-xl">
              Fill out the form below to schedule a professional dog walking service for your furry friend.
            </p>
          </div>

          <Card className="bg-white text-gray-900">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={bookingForm.handleSubmit(handleBookingSubmit)} className="space-y-6">
                {/* Owner Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="ownerName">Your Name *</Label>
                    <Input 
                      id="ownerName"
                      placeholder="Enter your full name" 
                      {...bookingForm.register("ownerName", { required: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone"
                      type="tel" 
                      placeholder="Enter your phone number" 
                      {...bookingForm.register("phone", { required: true })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="Enter your email address" 
                    {...bookingForm.register("email", { required: true })}
                  />
                </div>

                {/* Dog Information */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Dog Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="dogName">Dog's Name *</Label>
                      <Input 
                        id="dogName"
                        placeholder="Enter your dog's name" 
                        {...bookingForm.register("dogName", { required: true })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dogBreed">Breed & Size</Label>
                      <Input 
                        id="dogBreed"
                        placeholder="e.g., Golden Retriever - Large" 
                        {...bookingForm.register("dogBreed")}
                      />
                    </div>
                  </div>
                </div>

                {/* Service Selection */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Selection</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="serviceType">Choose Service *</Label>
                      <select 
                        id="serviceType"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest"
                        {...bookingForm.register("serviceType", { required: true })}
                      >
                        <option value="">Select a service</option>
                        <option value="30min-single">30 Minutes - R100</option>
                        <option value="1hour-single">1 Hour - R180</option>
                        <option value="30min-monthly">Monthly 30 Minutes (12 walks) - R1,140</option>
                        <option value="1hour-monthly">Monthly 1 Hour (12 walks) - R2,030</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="preferredDate">Preferred Date</Label>
                      <Input 
                        id="preferredDate"
                        type="date" 
                        {...bookingForm.register("preferredDate")}
                      />
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <Label htmlFor="instructions">Special Instructions</Label>
                  <Textarea 
                    id="instructions"
                    rows={4} 
                    placeholder="Any special instructions or information about your dog (medical conditions, behavioral notes, etc.)" 
                    {...bookingForm.register("instructions")}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-forest text-white hover:bg-green-800 py-3 text-lg font-semibold"
                  disabled={isSubmittingBooking}
                >
                  {isSubmittingBooking ? "Preparing..." : "Submit Booking Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="bg-forest text-white w-12 h-12 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">0663093540</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-forest text-white w-12 h-12 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">robbiesdogswalking@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-white">
              <CardContent className="p-8">
                <form onSubmit={contactForm.handleSubmit(handleContactSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="contactName">Your Name *</Label>
                    <Input 
                      id="contactName"
                      placeholder="Enter your full name" 
                      {...contactForm.register("name", { required: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Phone Number</Label>
                    <Input 
                      id="contactPhone"
                      type="tel" 
                      placeholder="Enter your phone number" 
                      {...contactForm.register("phone")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Email Address *</Label>
                    <Input 
                      id="contactEmail"
                      type="email" 
                      placeholder="Enter your email address" 
                      {...contactForm.register("email", { required: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactMessage">Message *</Label>
                    <Textarea 
                      id="contactMessage"
                      rows={4} 
                      placeholder="Tell us about your inquiry or how we can help you" 
                      {...contactForm.register("message", { required: true })}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-forest text-white hover:bg-green-800"
                    disabled={isSubmittingContact}
                  >
                    {isSubmittingContact ? "Preparing..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Dog className="text-2xl text-orange-accent mr-2" />
              <span className="font-bold text-xl">Robbies Dog Walking</span>
            </div>
            <p className="text-gray-400 mb-6">
              Professional dog walking services keeping your furry friends happy, healthy, and well-exercised.
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-orange-accent" />
                <span>0663093540</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-orange-accent" />
                <span>robbiesdogswalking@gmail.com</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Thank you for visiting Robbies Dog Walking. We look forward to caring for your beloved pets!
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}