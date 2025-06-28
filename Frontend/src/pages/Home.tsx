
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Users, Award, Clock } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Book your appointments online 24/7 with just a few clicks'
    },
    {
      icon: Users,
      title: 'Expert Stylists',
      description: 'Our certified professionals provide exceptional beauty services'
    },
    {
      icon: Award,
      title: 'Premium Services',
      description: 'From haircuts to spa treatments, we offer comprehensive beauty solutions'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Open 7 days a week to accommodate your busy schedule'
    }
  ];

  const services = [
    {
      name: 'Hair Styling',
      description: 'Professional cuts, colors, and treatments',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
      price: 'From $45'
    },
    {
      name: 'Facial Treatments',
      description: 'Rejuvenating skincare and facial services',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
      price: 'From $65'
    },
    {
      name: 'Nail Care',
      description: 'Manicure, pedicure, and nail art services',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
      price: 'From $35'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                    Beauty
                  </span>{' '}
                  <span className="text-gray-800">
                    That Inspires
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Transform your look with our premium salon services. Book online and experience luxury beauty treatments from certified professionals.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Button asChild size="lg" className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-lg px-8 py-6">
                    <Link to="/book">Book Appointment</Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild size="lg" className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-lg px-8 py-6">
                      <Link to="/register">Get Started</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-2">
                      <Link to="/services">View Services</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-rose-100 to-purple-100 p-8">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600"
                  alt="Salon Interior"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">5-Star Rated</p>
                    <p className="text-sm text-gray-600">1000+ Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Salon Bliss?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional beauty services in a relaxing, luxurious environment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 border-0 bg-white/70">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-rose-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto">
                      <Icon className="w-8 h-8 text-rose-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Popular Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our range of professional beauty treatments designed to make you look and feel your best.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/70">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                    <span className="text-rose-600 font-semibold">{service.price}</span>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Look?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your appointment today and experience the difference our expert stylists can make.
          </p>
          {user ? (
            <Button asChild size="lg" className="bg-white text-rose-600 hover:bg-gray-100 text-lg px-8 py-6">
              <Link to="/book">Book Now</Link>
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-rose-600 hover:bg-gray-100 text-lg px-8 py-6">
                <Link to="/register">Create Account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-rose-600 text-lg px-8 py-6">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
