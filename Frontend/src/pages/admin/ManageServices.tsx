import React, { useState, useEffect } from "react";
import {
  fetchServices,
  createService,
  fetchOneService,
  updateService,
  deleteService,
  toggleServiceStatus,
  type Service,
} from "@/lib/servicesApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, X, Clock, DollarSign, Star } from "lucide-react";

const ManageServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    active: true,
  });

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetchServices();
        setServices(response.data.data);
      } catch (error) {
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingService) {
        const response = await updateService(editingService._id, {
          ...formData,
          price: parseFloat(formData.price),
          duration: parseInt(formData.duration),
        });
        setServices(
          services.map((s) =>
            s._id === editingService._id ? response.data.data : s
          )
        );
        toast.success("Service updated!");
      } else {
        const response = await createService({
          ...formData,
          price: parseFloat(formData.price),
          duration: parseInt(formData.duration),
        });
        setServices([...services, response.data.data]);
        toast.success("Service created!");
      }
      handleCloseDialog();
    } catch (error) {
      toast.error(error.message || "Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this service?")) {
      try {
        await deleteService(id);
        setServices(services.filter((s) => s._id !== id));
        toast.success("Service deleted!");
      } catch (error) {
        toast.error("Failed to delete service");
      }
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await toggleServiceStatus(id, !currentStatus);
      setServices(
        services.map((s) =>
          s._id === id ? { ...s, active: !currentStatus } : s
        )
      );
      toast.success("Status updated!");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const categories = ["Hair", "Skincare", "Nails", "Beauty", "Wellness"];

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
      category: "",
      active: true,
    });
    setEditingService(null);
  };

  const handleOpenDialog = (service?: any) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        description: service.description,
        price: service.price.toString(),
        duration: service.duration.toString(),
        category: service.category,
        active: service.active,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };


  // const toggleServiceStatus = (serviceId: number) => {
  //   setServices(
  //     services.map((service) =>
  //       service.id === serviceId
  //         ? { ...service, active: !service.active }
  //         : service
  //     )
  //   );
  //   toast.success("Service status updated!");
  // };

  // const deleteService = (serviceId: number) => {
  //   setServices(services.filter((service) => service.id !== serviceId));
  //   toast.success("Service deleted successfully!");
  // };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Manage{" "}
              <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              Add, edit, and manage your salon services.
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleOpenDialog()}
                className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingService ? "Edit Service" : "Add New Service"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter service name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter service description"
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none h-20 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (min)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      placeholder="60"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) =>
                      setFormData({ ...formData, active: e.target.checked })
                    }
                    className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                  />
                  <Label htmlFor="active">Active Service</Label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700"
                  >
                    {editingService ? "Update Service" : "Add Service"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseDialog}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card
              key={service._id}
              className={`border-0 shadow-lg transition-all ${
                service.active ? "bg-white/80" : "bg-gray-100/80"
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {service.category}
                      </Badge>
                      <Badge
                        className={
                          service.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {service.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>${service.price}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{service.rating}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <span className="font-medium">{service.bookings}</span>{" "}
                  bookings this month
                </div>

                <div className="flex space-x-2 pt-4 border-t border-gray-100">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenDialog(service)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleServiceStatus(service._id,service.active)}
                    className={
                      service.active
                        ? "hover:bg-red-50 hover:text-red-600"
                        : "hover:bg-green-50 hover:text-green-600"
                    }
                  >
                    {service.active ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteService(service._id)}
                    className="hover:bg-red-50 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {services.length === 0 && (
          <Card className="border-0 shadow-lg bg-white/80">
            <CardContent className="p-12 text-center">
              <Plus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Services Added
              </h3>
              <p className="text-gray-500 mb-6">
                Add your first service to get started with bookings.
              </p>
              <Button
                onClick={() => handleOpenDialog()}
                className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Service
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ManageServices;
