
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Calendar, Clock, User, Search, Filter, Check, X, AlertCircle } from 'lucide-react';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      customerName: 'Emily Johnson',
      customerEmail: 'emily@example.com',
      serviceName: 'Classic Haircut',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: 60,
      price: 45,
      status: 'confirmed',
      stylist: 'Emma Johnson',
      notes: 'Please use organic products',
      phone: '+1 (555) 123-4567',
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      customerName: 'Sarah Williams',
      customerEmail: 'sarah@example.com',
      serviceName: 'Hair Color & Highlights',
      date: '2024-01-15',
      time: '2:00 PM',
      duration: 180,
      price: 120,
      status: 'pending',
      stylist: 'Michael Brown',
      notes: 'First time client, needs consultation',
      phone: '+1 (555) 234-5678',
      createdAt: '2024-01-12'
    },
    {
      id: 3,
      customerName: 'Jessica Davis',
      customerEmail: 'jessica@example.com',
      serviceName: 'Deep Cleansing Facial',
      date: '2024-01-16',
      time: '11:00 AM',
      duration: 90,
      price: 65,
      status: 'confirmed',
      stylist: 'Sarah Williams',
      notes: 'Sensitive skin',
      phone: '+1 (555) 345-6789',
      createdAt: '2024-01-11'
    },
    {
      id: 4,
      customerName: 'Lisa Miller',
      customerEmail: 'lisa@example.com',
      serviceName: 'Spa Pedicure',
      date: '2024-01-14',
      time: '3:30 PM',
      duration: 75,
      price: 55,
      status: 'completed',
      stylist: 'Jessica Davis',
      notes: '',
      phone: '+1 (555) 456-7890',
      createdAt: '2024-01-09'
    },
    {
      id: 5,
      customerName: 'Amanda Chen',
      customerEmail: 'amanda@example.com',
      serviceName: 'Gel Manicure',
      date: '2024-01-17',
      time: '1:00 PM',
      duration: 45,
      price: 35,
      status: 'pending',
      stylist: 'Lisa Miller',
      notes: 'Prefers nude colors',
      phone: '+1 (555) 567-8901',
      createdAt: '2024-01-13'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const statuses = ['all', 'pending', 'confirmed', 'completed', 'canceled'];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesDate = !filterDate || appointment.date === filterDate;
    const matchesSearch = !searchTerm || 
      appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesDate && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'canceled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const updateAppointmentStatus = (appointmentId: number, newStatus: string) => {
    setAppointments(appointments.map(appointment =>
      appointment.id === appointmentId
        ? { ...appointment, status: newStatus }
        : appointment
    ));
    
    const statusMessages = {
      confirmed: 'Appointment confirmed!',
      completed: 'Appointment marked as completed!',
      canceled: 'Appointment canceled!'
    };
    
    toast.success(statusMessages[newStatus as keyof typeof statusMessages] || 'Status updated!');
  };

  const getStats = () => {
    const total = appointments.length;
    const pending = appointments.filter(a => a.status === 'pending').length;
    const confirmed = appointments.filter(a => a.status === 'confirmed').length;
    const completed = appointments.filter(a => a.status === 'completed').length;
    
    return { total, pending, confirmed, completed };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Manage <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">Appointments</span>
          </h1>
          <p className="text-lg text-gray-600">
            View and manage all salon appointments in one place.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-r from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.total}</div>
              <div className="text-blue-800 font-medium">Total</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-r from-yellow-50 to-yellow-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.pending}</div>
              <div className="text-yellow-800 font-medium">Pending</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-r from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.confirmed}</div>
              <div className="text-green-800 font-medium">Confirmed</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-r from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{stats.completed}</div>
              <div className="text-purple-800 font-medium">Completed</div>
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
                    placeholder="Search by customer or service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date</label>
                <Input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <div className="space-y-6">
          {filteredAppointments.length === 0 ? (
            <Card className="border-0 shadow-lg bg-white/80">
              <CardContent className="p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Appointments Found</h3>
                <p className="text-gray-500">
                  Try adjusting your filters to see more appointments.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-0 shadow-lg bg-white/80 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-4 gap-6">
                    {/* Customer & Service Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">
                            {appointment.customerName}
                          </h3>
                          <p className="text-gray-600 text-sm">{appointment.customerEmail}</p>
                          <p className="text-gray-600 text-sm">{appointment.phone}</p>
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
                          <User className="w-4 h-4" />
                          <span>with {appointment.stylist}</span>
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-yellow-800">Notes:</p>
                              <p className="text-sm text-yellow-700">{appointment.notes}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Service & Price */}
                    <div>
                      <div className="text-center lg:text-left mb-4">
                        <h4 className="font-semibold text-gray-800 mb-1">{appointment.serviceName}</h4>
                        <div className="text-2xl font-bold text-gray-800">${appointment.price}</div>
                        <p className="text-xs text-gray-500">
                          Booked on {new Date(appointment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2">
                      {appointment.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateAppointmentStatus(appointment.id, 'canceled')}
                            className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </>
                      )}
                      
                      {appointment.status === 'confirmed' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateAppointmentStatus(appointment.id, 'canceled')}
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
                          disabled
                          className="bg-gray-50"
                        >
                          Completed
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

export default ManageAppointments;
