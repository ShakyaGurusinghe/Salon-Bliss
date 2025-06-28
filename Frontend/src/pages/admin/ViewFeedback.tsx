
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Star, MessageSquare, User, Calendar, Search, Filter, Send, TrendingUp } from 'lucide-react';

const ViewFeedback = () => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      customerName: 'Emily Johnson',
      customerEmail: 'emily@example.com',
      serviceName: 'Classic Haircut',
      stylist: 'Emma Johnson',
      rating: 5,
      feedback: 'Absolutely amazing service! Emma did an incredible job with my haircut. The salon environment was so relaxing and professional. Will definitely be back!',
      date: '2024-01-12',
      appointmentDate: '2024-01-10',
      responded: true,
      response: 'Thank you so much for your wonderful feedback, Emily! We\'re thrilled you loved your new haircut. Emma will be so happy to hear this. We look forward to seeing you again soon!',
      responseDate: '2024-01-13'
    },
    {
      id: 2,
      customerName: 'Sarah Williams',
      customerEmail: 'sarah@example.com',
      serviceName: 'Hair Color & Highlights',
      stylist: 'Michael Brown',
      rating: 4,
      feedback: 'Great color job! Michael really knew what he was doing. The only small issue was the wait time, but the final result was worth it. Very happy with the highlights.',
      date: '2024-01-11',
      appointmentDate: '2024-01-08',
      responded: false,
      response: null,
      responseDate: null
    },
    {
      id: 3,
      customerName: 'Jessica Davis',
      customerEmail: 'jessica@example.com',
      serviceName: 'Deep Cleansing Facial',
      stylist: 'Sarah Williams',
      rating: 5,
      feedback: 'The facial was incredible! My skin feels so refreshed and clean. Sarah was very knowledgeable about skincare and gave me great tips for home care.',
      date: '2024-01-09',
      appointmentDate: '2024-01-07',
      responded: true,
      response: 'We\'re so glad you enjoyed your facial, Jessica! Sarah loves sharing skincare tips with clients. Thank you for choosing our salon!',
      responseDate: '2024-01-10'
    },
    {
      id: 4,
      customerName: 'Lisa Miller',
      customerEmail: 'lisa@example.com',
      serviceName: 'Spa Pedicure',
      stylist: 'Jessica Davis',
      rating: 3,
      feedback: 'The pedicure was okay. The service was professional but I expected a bit more for the price. The massage part was too short.',
      date: '2024-01-08',
      appointmentDate: '2024-01-05',
      responded: false,
      response: null,
      responseDate: null
    },
    {
      id: 5,
      customerName: 'Amanda Chen',
      customerEmail: 'amanda@example.com',
      serviceName: 'Gel Manicure',
      stylist: 'Lisa Miller',
      rating: 5,
      feedback: 'Perfect manicure! The gel application was flawless and lasted exactly as promised. Lisa was friendly and professional throughout.',
      date: '2024-01-07',
      appointmentDate: '2024-01-04',
      responded: true,
      response: 'Thank you Amanda! We\'re delighted that your gel manicure exceeded expectations. Lisa will be thrilled to hear your feedback!',
      responseDate: '2024-01-08'
    }
  ]);

  const [filterRating, setFilterRating] = useState('all');
  const [filterResponded, setFilterResponded] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [responseText, setResponseText] = useState('');
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);

  const filteredFeedback = feedback.filter(item => {
    const matchesRating = filterRating === 'all' || item.rating.toString() === filterRating;
    const matchesResponded = filterResponded === 'all' || 
      (filterResponded === 'responded' && item.responded) ||
      (filterResponded === 'unresponded' && !item.responded);
    const matchesSearch = !searchTerm || 
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.feedback.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRating && matchesResponded && matchesSearch;
  });

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleRespond = (feedbackItem: any) => {
    setSelectedFeedback(feedbackItem);
    setResponseText('');
    setIsResponseDialogOpen(true);
  };

  const submitResponse = () => {
    if (!responseText.trim()) {
      toast.error('Please enter a response');
      return;
    }

    setFeedback(feedback.map(item =>
      item.id === selectedFeedback.id
        ? {
            ...item,
            responded: true,
            response: responseText,
            responseDate: new Date().toISOString().split('T')[0]
          }
        : item
    ));

    toast.success('Response sent successfully!');
    setIsResponseDialogOpen(false);
    setSelectedFeedback(null);
    setResponseText('');
  };

  const getStats = () => {
    const totalFeedback = feedback.length;
    const averageRating = feedback.reduce((sum, item) => sum + item.rating, 0) / totalFeedback;
    const responded = feedback.filter(item => item.responded).length;
    const unresponded = feedback.filter(item => !item.responded).length;
    const fiveStarCount = feedback.filter(item => item.rating === 5).length;
    
    return { totalFeedback, averageRating, responded, unresponded, fiveStarCount };
  };

  const stats = getStats();

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Customer <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">Feedback</span>
          </h1>
          <p className="text-lg text-gray-600">
            View and respond to customer reviews and feedback.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-r from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalFeedback}</div>
              <div className="text-blue-800 font-medium">Total Reviews</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-r from-yellow-50 to-yellow-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.averageRating.toFixed(1)}</div>
              <div className="text-yellow-800 font-medium">Avg Rating</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-r from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.fiveStarCount}</div>
              <div className="text-green-800 font-medium">5-Star Reviews</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-r from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{stats.responded}</div>
              <div className="text-purple-800 font-medium">Responded</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-r from-red-50 to-red-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{stats.unresponded}</div>
              <div className="text-red-800 font-medium">Pending</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg bg-white/80 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-rose-600" />
              <span>Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by customer, service, or feedback..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Rating</label>
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Response Status</label>
                <Select value={filterResponded} onValueChange={setFilterResponded}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Feedback</SelectItem>
                    <SelectItem value="responded">Responded</SelectItem>
                    <SelectItem value="unresponded">Pending Response</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback List */}
        <div className="space-y-6">
          {filteredFeedback.length === 0 ? (
            <Card className="border-0 shadow-lg bg-white/80">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Feedback Found</h3>
                <p className="text-gray-500">
                  Try adjusting your filters to see more feedback.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredFeedback.map((item) => (
              <Card key={item.id} className="border-0 shadow-lg bg-white/80 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{item.customerName}</h3>
                          <div className="flex items-center space-x-1">
                            {renderStars(item.rating)}
                            <span className={`ml-2 font-semibold ${getRatingColor(item.rating)}`}>
                              {item.rating}/5
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{item.serviceName} with {item.stylist}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Service on {new Date(item.appointmentDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={item.responded ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {item.responded ? 'Responded' : 'Pending'}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Feedback */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 italic">"{item.feedback}"</p>
                    </div>

                    {/* Response */}
                    {item.responded && item.response ? (
                      <div className="bg-rose-50 p-4 rounded-lg border-l-4 border-rose-200">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-medium text-rose-800">Our Response:</p>
                          <span className="text-xs text-rose-600">
                            {new Date(item.responseDate!).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-rose-700">{item.response}</p>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <Button
                          onClick={() => handleRespond(item)}
                          size="sm"
                          className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Respond
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Response Dialog */}
        <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Respond to {selectedFeedback?.customerName}'s Feedback</DialogTitle>
            </DialogHeader>
            
            {selectedFeedback && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    {renderStars(selectedFeedback.rating)}
                    <span className="font-semibold text-gray-700">
                      {selectedFeedback.rating}/5 for {selectedFeedback.serviceName}
                    </span>
                  </div>
                  <p className="text-gray-700 italic">"{selectedFeedback.feedback}"</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Your Response</label>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Write a thoughtful response to the customer's feedback..."
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none h-32 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={submitResponse}
                    className="flex-1 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Response
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsResponseDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ViewFeedback;
