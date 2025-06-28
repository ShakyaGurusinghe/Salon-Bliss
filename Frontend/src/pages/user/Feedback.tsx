
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Star, Send, MessageSquare } from 'lucide-react';

const Feedback = () => {
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const completedAppointments = [
    {
      id: 1,
      serviceName: 'Classic Haircut',
      date: '2024-01-10',
      stylist: 'Emma Johnson'
    },
    {
      id: 2,
      serviceName: 'Deep Cleansing Facial',
      date: '2024-01-05',
      stylist: 'Sarah Williams'
    },
    {
      id: 3,
      serviceName: 'Gel Manicure',
      date: '2024-01-01',
      stylist: 'Jessica Davis'
    }
  ];

  const previousFeedback = [
    {
      id: 1,
      serviceName: 'Hair Color & Highlights',
      date: '2023-12-20',
      stylist: 'Michael Brown',
      rating: 5,
      feedback: 'Absolutely amazing service! Michael did an incredible job with my highlights. The color turned out exactly as I wanted and the salon environment was so relaxing. Will definitely be back!',
      response: 'Thank you so much for your wonderful feedback! We\'re thrilled you loved your new highlights. Michael will be so happy to hear this. We look forward to seeing you again soon!'
    },
    {
      id: 2,
      serviceName: 'Spa Pedicure',
      date: '2023-12-15',
      stylist: 'Lisa Miller',
      rating: 4,
      feedback: 'Great service overall. The pedicure was very relaxing and my feet feel amazing. The only small issue was the wait time, but the quality made up for it.',
      response: 'Thank you for your honest feedback! We\'re glad you enjoyed the pedicure service. We\'re working on improving our scheduling to reduce wait times. Appreciate your patience!'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAppointment || !rating || !feedback.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // Mock API call
      console.log('Submitting feedback:', {
        appointmentId: selectedAppointment,
        rating,
        feedback
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Thank you for your feedback! We appreciate your review.');
      
      // Reset form
      setSelectedAppointment('');
      setRating(0);
      setFeedback('');
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (currentRating: number, interactive: boolean = false) => {
    return [...Array(5)].map((_, index) => {
      const starIndex = index + 1;
      return (
        <Star
          key={index}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            starIndex <= (interactive ? (hoveredRating || rating) : currentRating)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          }`}
          onClick={interactive ? () => setRating(starIndex) : undefined}
          onMouseEnter={interactive ? () => setHoveredRating(starIndex) : undefined}
          onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
        />
      );
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Share Your <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">Feedback</span>
          </h1>
          <p className="text-lg text-gray-600">
            Help us improve by sharing your experience with our services.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <Card className="border-0 shadow-xl bg-white/80">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-rose-600" />
                <span>Leave a Review</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="appointment">Select Appointment</Label>
                  <Select value={selectedAppointment} onValueChange={setSelectedAppointment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an appointment to review" />
                    </SelectTrigger>
                    <SelectContent>
                      {completedAppointments.map((appointment) => (
                        <SelectItem key={appointment.id} value={appointment.id.toString()}>
                          <div className="text-left">
                            <div className="font-medium">{appointment.serviceName}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(appointment.date).toLocaleDateString()} with {appointment.stylist}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex items-center space-x-1">
                    {renderStars(rating, true)}
                    <span className="ml-3 text-sm text-gray-600">
                      {rating > 0 && (
                        <>
                          {rating === 1 && 'Poor'}
                          {rating === 2 && 'Fair'}
                          {rating === 3 && 'Good'}
                          {rating === 4 && 'Very Good'}
                          {rating === 5 && 'Excellent'}
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <textarea
                    id="feedback"
                    placeholder="Tell us about your experience..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none h-32 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700"
                >
                  {loading ? 'Submitting...' : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Previous Feedback */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Previous Reviews</h2>
            
            {previousFeedback.length === 0 ? (
              <Card className="border-0 shadow-lg bg-white/60">
                <CardContent className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No previous feedback yet.</p>
                </CardContent>
              </Card>
            ) : (
              previousFeedback.map((item) => (
                <Card key={item.id} className="border-0 shadow-lg bg-white/70">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">{item.serviceName}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(item.date).toLocaleDateString()} with {item.stylist}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {renderStars(item.rating)}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 italic">"{item.feedback}"</p>
                      </div>
                      
                      {item.response && (
                        <div className="bg-rose-50 p-4 rounded-lg border-l-4 border-rose-200">
                          <p className="text-sm font-medium text-rose-800 mb-1">Salon Response:</p>
                          <p className="text-rose-700">{item.response}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
