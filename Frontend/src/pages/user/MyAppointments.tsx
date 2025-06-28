
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Calendar, Clock, MapPin, X, Star } from 'lucide-react';

const MyAppointments = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  
  const appointments = [
    {
      id: 1,
      serviceName: 'Classic Haircut',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: 60,
      price: 45,
      status: 'upcoming',
      stylist: 'Emma Johnson',
      location: 'Downtown Location',
      voucherUsed: null
    },
    {
      id: 2,
      serviceName: 'Deep Cleansing Facial',
      date: '2024-01-10',
      time: '2:00 PM',
      duration: 90,
      price: 58.50,
      status: 'completed',
      stylist: 'Sarah Williams',
      location: 'Uptown Branch',
      voucherUsed: 'WELCOME10'
    },
    {
      id: 3,
      serviceName: 'Hair Color & Highlights',
      date: '2024-01-20',
      time: '11:00 AM',
      duration: 180,
      price: 120,
      status: 'upcoming',
      stylist: 'Michael Brown',
      location: 'Downtown Location',
      voucherUsed: null
    },
    {
      id: 4,
      serviceName: 'Gel Manicure',
      date: '2024-01-05',
      time: '3:30 PM',
      duration: 45,
      price: 35,
      status: 'completed',
      stylist: 'Jessica Davis',
      location: 'Mall Branch',
      voucherUsed: null
    },
    {
      id: 5,
      serviceName: 'Spa Pedicure',
      date: '2024-01-08',
      time: '1:00 PM',
      duration: 75,
      price: 55,
      status: 'canceled',
      stylist: 'Lisa Miller',
      location: 'Uptown Branch',
      voucherUsed: null
    }
  ];

  const filteredAppointments = filterStatus === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'canceled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCancelAppointment = (appointmentId: number) => {
    console.log('Canceling appointment:', appointmentId);
    toast.success('Appointment canceled successfully');
  };

  const handleRescheduleAppointment = (appointmentId: number) => {
    console.log('Rescheduling appointment:', appointmentId);
    toast.success('Reschedule request sent');
  };

  const upcomingCount = appointments.filter(apt => apt.status === 'upcoming').length;
  const completedCount = appointments.filter(apt => apt.status === 'completed').length;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            My <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">Appointments</span>
          </h1>
          <p className="text-lg text-gray-600">
            Manage and track all your salon appointments in one place.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-r from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{upcomingCount}</div>
              <div className="text-blue-800 font-medium">Upcoming</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-r from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{completedCount}</div>
              <div className="text-green-800 font-medium">Completed</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-r from-rose-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">{appointments.length}</div>
              <div className="text-rose-800 font-medium">Total Visits</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Appointment History</h2>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Appointments</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Appointments List */}
        <div className="space-y-6">
          {filteredAppointments.length === 0 ? (
            <Card className="border-0 shadow-lg bg-white/80">
              <CardContent className="p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Appointments Found</h3>
                <p className="text-gray-500 mb-6">
                  {filterStatus === 'all' 
                    ? "You haven't booked any appointments yet." 
                    : `No ${filterStatus} appointments found.`
                  }
                </p>
                <Button className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700">
                  Book Your First Appointment
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-0 shadow-lg bg-white/80 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-4 gap-6 items-center">
                    {/* Service Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">
                            {appointment.serviceName}
                          </h3>
                          <p className="text-gray-600">with {appointment.stylist}</p>
                        </div>
                        <Badge className={`${getStatusColor(appointment.status)} capitalize`}>
                          {appointment.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(appointment.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time} ({appointment.duration} minutes)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Voucher */}
                    <div className="text-center lg:text-left">
                      <div className="text-2xl font-bold text-gray-800 mb-2">
                        ${appointment.price.toFixed(2)}
                      </div>
                      {appointment.voucherUsed && (
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          {appointment.voucherUsed} applied
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2">
                      {appointment.status === 'upcoming' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRescheduleAppointment(appointment.id)}
                            className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                          >
                            Reschedule
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </>
                      )}
                      {appointment.status === 'completed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-300"
                        >
                          <Star className="w-4 h-4 mr-1" />
                          Rate Service
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
