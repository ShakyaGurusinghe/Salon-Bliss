
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, Calendar } from 'lucide-react';

const Services = () => {
  const { user } = useAuth();

  const services = [
    {
      id: 1,
      name: 'Classic Haircut',
      description: 'Professional haircut with wash and basic styling',
      price: 45,
      duration: 60,
      category: 'Hair',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
      rating: 4.8,
      popular: true
    },
    {
      id: 2,
      name: 'Hair Color & Highlights',
      description: 'Full color service with highlights and treatment',
      price: 120,
      duration: 180,
      category: 'Hair',
      image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400',
      rating: 4.9,
      popular: true
    },
    {
      id: 3,
      name: 'Deep Cleansing Facial',
      description: 'Rejuvenating facial with deep pore cleansing',
      price: 65,
      duration: 90,
      category: 'Skincare',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
      rating: 4.7,
      popular: false
    },
    {
      id: 4,
      name: 'Anti-Aging Facial',
      description: 'Premium anti-aging treatment with collagen mask',
      price: 95,
      duration: 120,
      category: 'Skincare',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400',
      rating: 4.8,
      popular: true
    },
    {
      id: 5,
      name: 'Gel Manicure',
      description: 'Long-lasting gel manicure with nail art options',
      price: 35,
      duration: 45,
      category: 'Nails',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
      rating: 4.6,
      popular: false
    },
    {
      id: 6,
      name: 'Spa Pedicure',
      description: 'Relaxing pedicure with foot massage and treatment',
      price: 55,
      duration: 75,
      category: 'Nails',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400',
      rating: 4.7,
      popular: false
    },
    {
      id: 7,
      name: 'Eyebrow Shaping',
      description: 'Professional eyebrow shaping and tinting',
      price: 25,
      duration: 30,
      category: 'Beauty',
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400',
      rating: 4.5,
      popular: false
    },
    {
      id: 8,
      name: 'Full Body Massage',
      description: 'Relaxing full body massage with aromatherapy',
      price: 85,
      duration: 90,
      category: 'Wellness',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
      rating: 4.9,
      popular: true
    }
  ];

  const categories = ['All', 'Hair', 'Skincare', 'Nails', 'Beauty', 'Wellness'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

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
