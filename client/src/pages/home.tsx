import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { insertBookingSchema, insertReviewSchema, insertContactSchema, type Review } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { StarRating } from "@/components/ui/star-rating";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, Clock, MapPin, Star, Heart, Brain, Users, Shield, Zap, Dog, Check, Calendar, PhoneCall } from "lucide-react";
import { format } from "date-fns";

export default function Home() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch reviews
  const { data: reviews = [], isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  // Booking form
  const bookingForm = useForm({
    resolver: zodResolver(insertBookingSchema),
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

  const bookingMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Request Submitted",
        description: "Thank you! We will contact you shortly to confirm your appointment.",
      });
      bookingForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit booking request. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Review form
  const [reviewRating, setReviewRating] = useState(0);
  const reviewForm = useForm({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: {
      customerName: "",
      petName: "",
      rating: 0,
      comment: "",
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/reviews", { ...data, rating: reviewRating });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Review Submitted",
        description: "Thank you for your review! It will be displayed shortly.",
      });
      reviewForm.reset();
      setReviewRating(0);
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Contact form
  const contactForm = useForm({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message! We will get back to you soon.",
      });
      contactForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

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

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-forest to-green-700 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Dog Walking Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
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
                className="border-2 border-white text-white hover:bg-white hover:text-forest px-8 py-4 text-lg font-semibold"
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
                <div className="text-4xl font-bold text-orange-accent mb-2">R100</div>
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
                <div className="text-4xl font-bold text-purple-600 mb-2">R1,800</div>
                <p className="text-gray-600 mb-6">3 hour-long walks per week for the whole month</p>
                <ul className="text-left text-gray-600 space-y-2 mb-6">
                  <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />12 extended walks</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Priority scheduling</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Comprehensive care</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />40% savings</li>
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
              Benefits of Professional Dog Walking
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our professional dog walking services provide comprehensive health and wellness benefits for your beloved pet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Physical Health Benefits */}
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Physical Health</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Maintains fitness levels</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Builds muscle tone</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Improves cardiovascular health</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Healthy digestion support</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Better sleep quality</li>
                </ul>
              </CardContent>
            </Card>

            {/* Mental Health Benefits */}
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Mental Wellness</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Keeps dogs mentally healthy</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Reduces anxiety levels</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Energy outlet and release</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Prevents destructive behavior</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Mental stimulation</li>
                </ul>
              </CardContent>
            </Card>

            {/* Social Benefits */}
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Socialization</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Better with other animals</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Comfortable in new environments</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Reduces fear and aggression</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Behavior improvement</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Confidence building</li>
                </ul>
              </CardContent>
            </Card>

            {/* Longevity Benefits */}
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Longevity</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Increased life expectancy</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Disease prevention</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Weight management</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Joint health maintenance</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Overall vitality boost</li>
                </ul>
              </CardContent>
            </Card>

            {/* Care Benefits */}
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Professional Care</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Fresh water provided</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Health monitoring</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Safety supervision</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Consistent routine</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Peace of mind</li>
                </ul>
              </CardContent>
            </Card>

            {/* Convenience Benefits */}
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Owner Benefits</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />More time for you</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Flexible scheduling</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Professional reliability</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Regular updates</li>
                  <li className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-3 mt-1" />Happy, tired dog at home</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Customer Reviews
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our happy customers and their dogs have to say about our services.
            </p>
          </div>

          {/* Review Submission Form */}
          <div className="max-w-2xl mx-auto mb-16">
            <Card className="bg-gray-50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  Share Your Experience
                </h3>
                <Form {...reviewForm}>
                  <form onSubmit={reviewForm.handleSubmit((data) => reviewMutation.mutate(data))} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={reviewForm.control}
                        name="customerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={reviewForm.control}
                        name="petName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dog's Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your dog's name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Rating</Label>
                      <StarRating rating={reviewRating} onRatingChange={setReviewRating} />
                    </div>
                    <FormField
                      control={reviewForm.control}
                      name="comment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Review</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={4} 
                              placeholder="Tell us about your experience with Robbies Dog Walking..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-forest hover:bg-green-800 text-white"
                      disabled={reviewMutation.isPending}
                    >
                      {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Reviews Display */}
          <div className="space-y-6">
            {reviewsLoading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading reviews...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center">
                <Card className="bg-gray-100">
                  <CardContent className="p-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reviews Yet</h3>
                    <p className="text-gray-500">Be the first to share your experience with Robbies Dog Walking!</p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              reviews.map((review) => (
                <Card key={review.id} className="bg-gray-50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h5 className="font-semibold text-gray-900">{review.customerName}</h5>
                        <p className="text-sm text-gray-600">Dog: {review.petName}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <StarRating rating={review.rating} onRatingChange={() => {}} interactive={false} size="sm" />
                          <span className="text-sm text-gray-600">
                            {format(new Date(review.createdAt), "MMM d, yyyy")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))
            )}
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
              <Form {...bookingForm}>
                <form onSubmit={bookingForm.handleSubmit((data) => bookingMutation.mutate(data))} className="space-y-6">
                  {/* Owner Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={bookingForm.control}
                      name="ownerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={bookingForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={bookingForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Dog Information */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Dog Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={bookingForm.control}
                        name="dogName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dog's Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your dog's name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={bookingForm.control}
                        name="dogBreed"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Breed & Size</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Golden Retriever - Large" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Selection</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={bookingForm.control}
                        name="serviceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Choose Service *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="30min-single">30 Minutes - R50</SelectItem>
                                <SelectItem value="1hour-single">1 Hour - R100</SelectItem>
                                <SelectItem value="30min-monthly">Monthly 30 Minutes - R1,200</SelectItem>
                                <SelectItem value="1hour-monthly">Monthly 1 Hour - R1,800</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={bookingForm.control}
                        name="preferredDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <FormField
                    control={bookingForm.control}
                    name="instructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Instructions</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4} 
                            placeholder="Any special instructions or information about your dog (medical conditions, behavioral notes, etc.)" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-forest hover:bg-green-800 text-white py-4 text-lg font-semibold"
                    disabled={bookingMutation.isPending}
                  >
                    {bookingMutation.isPending ? "Submitting..." : "Submit Booking Request"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our services? Need to make changes to your booking? We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-forest text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                  <p className="text-gray-600">Call us for immediate assistance</p>
                  <a href="tel:0663093540" className="text-forest font-semibold hover:text-green-800 text-xl">
                    066 309 3540
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-forest text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">Send us a message anytime</p>
                  <a href="mailto:robbiesdogswalking@gmail.com" className="text-forest font-semibold hover:text-green-800 break-all">
                    robbiesdogswalking@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-forest text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Monday - Friday: 7:00 AM - 7:00 PM</p>
                    <p>Saturday: 8:00 AM - 6:00 PM</p>
                    <p>Sunday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Quick Message</h3>
                <Form {...contactForm}>
                  <form onSubmit={contactForm.handleSubmit((data) => contactMutation.mutate(data))} className="space-y-6">
                    <FormField
                      control={contactForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea rows={4} placeholder="How can we help you?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-forest hover:bg-green-800 text-white"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Dog className="h-8 w-8 mr-3" />
              <span className="font-bold text-2xl">Robbies Dog Walking</span>
            </div>
            <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
              Thank you for visiting Robbies Dog Walking. We're committed to keeping your furry friends happy, healthy, and well-exercised with our professional and caring dog walking services.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
              <a href="tel:0663093540" className="flex items-center text-green-100 hover:text-white transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                066 309 3540
              </a>
              <a href="mailto:robbiesdogswalking@gmail.com" className="flex items-center text-green-100 hover:text-white transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                robbiesdogswalking@gmail.com
              </a>
            </div>

            <div className="border-t border-green-600 pt-8">
              <p className="text-green-200">
                &copy; 2024 Robbies Dog Walking. All rights reserved. | Professional dog walking services with care and dedication.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
