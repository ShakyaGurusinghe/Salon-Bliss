
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Star,
  Settings,
  Gift,
  MessageSquare
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = {
    totalRevenue: 12450,
    monthlyRevenue: 3200,
    totalAppointments: 89,
    pendingAppointments: 12,
    totalCustomers: 156,
    newCustomers: 8,
    averageRating: 4.7,
    totalReviews: 234
  };

  const recentAppointments = [
    {
      id: 1,
      customerName: 'Emily Johnson',
      serviceName: 'Classic Haircut',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'confirmed',
      stylist: 'Emma Johnson',
      price: 45
    },
    {
      id: 2,
      customerName: 'Sarah Williams',
      serviceName: 'Hair Color & Highlights',
      date: '2024-01-15',
      time: '2:00 PM',
      status: 'pending',
      stylist: 'Michael Brown',
      price: 120
    },
    {
      id: 3,
      customerName: 'Jessica Davis',
      serviceName: 'Deep Cleansing Facial',
      date: '2024-01-16',
      time: '11:00 AM',
      status: 'confirmed',
      stylist: 'Sarah Williams',
      price: 65
    },
    {
      id: 4,
      customerName: 'Lisa Miller',
      serviceName: 'Spa Pedicure',
      date: '2024-01-16',
      time: '3:30 PM',
      status: 'completed',
      stylist: 'Jessica Davis',
      price: 55
    }
  ];

  const topServices = [
    { name: 'Classic Haircut', bookings: 45, revenue: 2025 },
    { name: 'Hair Color & Highlights', bookings: 23, revenue: 2760 },
    { name: 'Deep Cleansing Facial', bookings: 18, revenue: 1170 },
    { name: 'Gel Manicure', bookings: 15, revenue: 525 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Admin <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="text-lg text-gray-600">
            Welcome back! Here's what's happening at your salon today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-r from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-800">${stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">This month: ${stats.monthlyRevenue}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Appointments</p>
                  <p className="text-2xl font-bold text-blue-800">{stats.totalAppointments}</p>
                  <p className="text-xs text-blue-600">Pending: {stats.pendingAppointments}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Customers</p>
                  <p className="text-2xl font-bold text-purple-800">{stats.totalCustomers}</p>
                  <p className="text-xs text-purple-600">New: {stats.newCustomers}</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-yellow-50 to-yellow-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-yellow-800">{stats.averageRating}</p>
                  <p className="text-xs text-yellow-600">{stats.totalReviews} reviews</p>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Appointments */}
          <Card className="border-0 shadow-xl bg-white/80">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-rose-600" />
                <span>Recent Appointments</span>
              </CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link to="/admin/appointments">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{appointment.customerName}</h4>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{appointment.serviceName}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time} with {appointment.stylist}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold text-gray-800">${appointment.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Services */}
          <Card className="border-0 shadow-xl bg-white/80">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-rose-600" />
                <span>Top Services</span>
              </CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link to="/admin/services">Manage</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{service.name}</h4>
                      <p className="text-sm text-gray-600">{service.bookings} bookings</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">${service.revenue.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-rose-50 to-purple-50">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild className="h-20 flex-col space-y-2 bg-white hover:bg-gray-50 text-gray-700 border">
                <Link to="/admin/services">
                  <Settings className="w-6 h-6" />
                  <span>Manage Services</span>
                </Link>
              </Button>
              <Button asChild className="h-20 flex-col space-y-2 bg-white hover:bg-gray-50 text-gray-700 border">
                <Link to="/admin/appointments">
                  <Calendar className="w-6 h-6" />
                  <span>View Appointments</span>
                </Link>
              </Button>
              <Button asChild className="h-20 flex-col space-y-2 bg-white hover:bg-gray-50 text-gray-700 border">
                <Link to="/admin/vouchers">
                  <Gift className="w-6 h-6" />
                  <span>Create Vouchers</span>
                </Link>
              </Button>
              <Button asChild className="h-20 flex-col space-y-2 bg-white hover:bg-gray-50 text-gray-700 border">
                <Link to="/admin/feedback">
                  <MessageSquare className="w-6 h-6" />
                  <span>View Feedback</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
