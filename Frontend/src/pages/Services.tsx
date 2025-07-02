import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { fetchServices, type Service } from '@/lib/servicesApi';



const Services = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetchServices();
        setServices(response.data.data.filter((s: Service) => s.active));
      } catch (error) {
        toast.error('Failed to load services');
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of beauty and wellness services, delivered by certified professionals.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={selectedCategory === category 
                ? "bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700" 
                : "hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/70 group">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {service.popular && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white">
                    Popular
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                      {service.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {service.category}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{service.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-2xl font-bold text-gray-800">
                      ${service.price}
                    </div>
                    
                    {user ? (
                      <Button 
                        asChild
                        size="sm" 
                        className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700"
                      >
                        <Link to={`/book?service=${service.id}`}>
                          <Calendar className="w-4 h-4 mr-1" />
                          Book Now
                        </Link>
                      </Button>
                    ) : (
                      <Button 
                        asChild
                        size="sm" 
                        variant="outline"
                        className="hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
                      >
                        <Link to="/login">
                          Sign In to Book
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        {!user && (
          <div className="mt-16 text-center py-12 bg-gradient-to-r from-rose-500 to-purple-600 rounded-3xl">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Book Your Appointment?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Create an account to book appointments, track your visits, and receive exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-rose-600 hover:bg-gray-100">
                <Link to="/register">Create Account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-rose-600">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
