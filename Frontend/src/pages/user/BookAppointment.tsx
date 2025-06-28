
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, Clock, DollarSign, Tag } from 'lucide-react';

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preSelectedServiceId = searchParams.get('service');
  
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const services = [
    { id: '1', name: 'Classic Haircut', price: 45, duration: 60 },
    { id: '2', name: 'Hair Color & Highlights', price: 120, duration: 180 },
    { id: '3', name: 'Deep Cleansing Facial', price: 65, duration: 90 },
    { id: '4', name: 'Anti-Aging Facial', price: 95, duration: 120 },
    { id: '5', name: 'Gel Manicure', price: 35, duration: 45 },
    { id: '6', name: 'Spa Pedicure', price: 55, duration: 75 },
    { id: '7', name: 'Eyebrow Shaping', price: 25, duration: 30 },
    { id: '8', name: 'Full Body Massage', price: 85, duration: 90 }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  const vouchers = [
    { code: 'WELCOME10', discount: 10, type: 'percentage' },
    { code: 'SAVE20', discount: 20, type: 'fixed' },
    { code: 'NEWCLIENT', discount: 15, type: 'percentage' }
  ];

  useEffect(() => {
    if (preSelectedServiceId) {
      setSelectedService(preSelectedServiceId);
    }
  }, [preSelectedServiceId]);

  const selectedServiceData = services.find(s => s.id === selectedService);
  
  const calculateTotal = () => {
    if (!selectedServiceData) return 0;
    
    let total = selectedServiceData.price;
    if (appliedVoucher) {
      if (appliedVoucher.type === 'percentage') {
        total = total - (total * appliedVoucher.discount / 100);
      } else {
        total = Math.max(0, total - appliedVoucher.discount);
      }
    }
    return total;
  };

  const handleApplyVoucher = () => {
    const voucher = vouchers.find(v => v.code.toLowerCase() === voucherCode.toLowerCase());
    if (voucher) {
      setAppliedVoucher(voucher);
      toast.success(`Voucher applied! ${voucher.type === 'percentage' ? voucher.discount + '% off' : '$' + voucher.discount + ' off'}`);
    } else {
      toast.error('Invalid voucher code');
    }
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherCode('');
    toast.success('Voucher removed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !selectedDate || !selectedTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Mock API call
      console.log('Booking appointment:', {
        serviceId: selectedService,
        date: selectedDate,
        time: selectedTime,
        voucherCode: appliedVoucher?.code,
        notes,
        total: calculateTotal()
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Appointment booked successfully!');
      navigate('/appointments');
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Book Your <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">Appointment</span>
          </h1>
          <p className="text-lg text-gray-600">
            Select your preferred service, date, and time to schedule your visit.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Service Selection & Details */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/80">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full text-white text-xs flex items-center justify-center">1</div>
                    <span>Select Service</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          <div className="flex justify-between items-center w-full">
                            <span>{service.name}</span>
                            <span className="text-rose-600 font-semibold ml-4">${service.price}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedServiceData && (
                    <div className="mt-4 p-4 bg-rose-50 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{selectedServiceData.duration} min</span>
                          </div>
                          <div className="flex items-center space-x-1 text-rose-600">
                            <DollarSign className="w-4 h-4" />
                            <span>${selectedServiceData.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full text-white text-xs flex items-center justify-center">2</div>
                    <span>Select Date</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Time & Voucher */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/80">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full text-white text-xs flex items-center justify-center">3</div>
                    <span>Select Time</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className={selectedTime === time 
                          ? "bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700" 
                          : "hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
                        }
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Tag className="w-5 h-5 text-rose-600" />
                    <span>Apply Voucher</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!appliedVoucher ? (
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter voucher code"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={handleApplyVoucher}
                        variant="outline"
                      >
                        Apply
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-500">
                          {appliedVoucher.code}
                        </Badge>
                        <span className="text-sm text-green-700">
                          {appliedVoucher.type === 'percentage' 
                            ? `${appliedVoucher.discount}% off` 
                            : `$${appliedVoucher.discount} off`
                          }
                        </span>
                      </div>
                      <Button
                        type="button"
                        onClick={handleRemoveVoucher}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500">
                    Available codes: WELCOME10, SAVE20, NEWCLIENT
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80">
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    placeholder="Any special requests or notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none h-24 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Summary & Submit */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-rose-50 to-purple-50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-semibold text-gray-800">Booking Summary</h3>
                  {selectedServiceData && (
                    <div className="text-sm text-gray-600 mt-2">
                      <p>{selectedServiceData.name}</p>
                      {selectedDate && selectedTime && (
                        <p>{selectedDate.toDateString()} at {selectedTime}</p>
                      )}
                      {appliedVoucher && (
                        <p className="text-green-600">Voucher: {appliedVoucher.code} applied</p>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="text-center md:text-right">
                  <div className="text-2xl font-bold text-gray-800">
                    Total: ${calculateTotal().toFixed(2)}
                  </div>
                  {appliedVoucher && selectedServiceData && (
                    <div className="text-sm text-gray-500 line-through">
                      Original: ${selectedServiceData.price}
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={loading || !selectedService || !selectedDate || !selectedTime}
                    size="lg"
                    className="mt-4 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 px-8"
                  >
                    {loading ? 'Booking...' : 'Confirm Booking'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
