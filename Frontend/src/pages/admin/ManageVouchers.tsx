
import React, { useState, useEffect } from 'react';
import { 
  getVouchers, 
  createVoucher, 
  updateVoucher, 
  deleteVoucher,
  getVoucherStats,
  Voucher
} from '@/lib/vouchersApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Edit, X, Gift, Calendar, Percent, DollarSign, Users, TrendingUp } from 'lucide-react';

const ManageVouchers = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [stats, setStats] = useState({
    totalVouchers: 0,
    activeVouchers: 0,
    totalUsage: 0,
    expiredVouchers: 0
  });


useEffect(() => {
  const loadData = async () => {
    try {
      const [vouchersData, statsData] = await Promise.all([
        getVouchers(),
        getVoucherStats()
      ]);

      console.log("Fetched Vouchers:", vouchersData);

      const safeVouchers = Array.isArray(vouchersData)
        ? vouchersData
        : Array.isArray(vouchersData?.vouchers)
          ? vouchersData.vouchers
          : [];

      setVouchers(safeVouchers);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load vouchers');
      setVouchers([]);
    }
  };
  loadData();
}, []);




  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<any>(null);
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    description: '',
    discount: '',
    type: 'percentage',
    validFrom: '',
    validUntil: '',
    minSpend: '',
    maxDiscount: '',
    usageLimit: '',
    category: 'general',
    active: true
  });

  const categories = ['general', 'first-time', 'premium', 'loyalty', 'special'];
  const discountTypes = ['percentage', 'fixed'];

  const resetForm = () => {
    setFormData({
      code: '',
      title: '',
      description: '',
      discount: '',
      type: 'percentage',
      validFrom: '',
      validUntil: '',
      minSpend: '',
      maxDiscount: '',
      usageLimit: '',
      category: 'general',
      active: true
    });
    setEditingVoucher(null);
  };

  const handleOpenDialog = (voucher?: any) => {
    if (voucher) {
      setEditingVoucher(voucher);
      setFormData({
        code: voucher.code,
        title: voucher.title,
        description: voucher.description,
        discount: voucher.discount.toString(),
        type: voucher.type,
        validFrom: voucher.validFrom,
        validUntil: voucher.validUntil,
        minSpend: voucher.minSpend.toString(),
        maxDiscount: voucher.maxDiscount?.toString() || '',
        usageLimit: voucher.usageLimit.toString(),
        category: voucher.category,
        active: voucher.active
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

  const generateVoucherCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({...formData, code: result});
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const voucherData = {
      ...formData,
      discount: parseFloat(formData.discount),
      minSpend: parseFloat(formData.minSpend) || 0,
      maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : null,
      usageLimit: parseInt(formData.usageLimit),
      usedCount: editingVoucher?.usedCount || 0
    };

    if (editingVoucher) {
      const updatedVoucher = await updateVoucher(editingVoucher._id, voucherData);
      setVouchers(vouchers.map(v => 
        v._id === updatedVoucher._id ? updatedVoucher : v
      ));
      toast.success('Voucher updated successfully!');
    } else {
      const newVoucher = await createVoucher(voucherData);
      setVouchers(prev => [...prev, newVoucher]);
      toast.success('Voucher created successfully!');
    }
    
    handleCloseDialog();
  } catch (error: any) {
    toast.error(error.message || 'Failed to save voucher');
  }
};

    const voucherData = {
      ...formData,
      discount: parseFloat(formData.discount),
      minSpend: parseFloat(formData.minSpend) || 0,
      maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : null,
      usageLimit: parseInt(formData.usageLimit),
      usedCount: editingVoucher?.usedCount || 0
    };


  const toggleVoucherStatus = async (voucherId: string) => {
    try {
      const voucher = vouchers.find(v => v._id === voucherId);
      if (!voucher) return;
      
      const updatedVoucher = await updateVoucher(voucherId, {
        active: !voucher.active
      });
      
      setVouchers(vouchers.map(v => 
        v._id === voucherId ? updatedVoucher : v
      ));
      toast.success('Voucher status updated!');
    } catch (error) {
      toast.error(error.message || 'Failed to update voucher status');
    }
  };

  const deleteVoucherHandler = async (voucherId: string) => {
    try {
      await deleteVoucher(voucherId);
      setVouchers(vouchers.filter(v => v._id !== voucherId));
      toast.success('Voucher deleted successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to delete voucher');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'first-time':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'premium':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'loyalty':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'special':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isExpired = (date: string) => {
    return new Date(date) < new Date();
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100);
  };

 const getStats = () => {
    const totalVouchers = vouchers.length;
    const activeVouchers = vouchers.filter(v => v.active && !isExpired(v.validUntil)).length;
    const totalUsage = vouchers.reduce((sum, v) => sum + v.usedCount, 0);
    const expiredVouchers = vouchers.filter(v => isExpired(v.validUntil)).length;
    
    return { totalVouchers, activeVouchers, totalUsage, expiredVouchers };
  };




 

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Manage <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">Vouchers</span>
            </h1>
            <p className="text-lg text-gray-600">
              Create and manage discount vouchers for your customers.
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => handleOpenDialog()}
                className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Voucher
              </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingVoucher ? 'Edit Voucher' : 'Create New Voucher'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Voucher Code</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="code"
                        value={formData.code}
                        onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                        placeholder="VOUCHER123"
                        className="flex-1"
                        required
                      />
                      <Button
                        type="button"
                        onClick={generateVoucherCode}
                        variant="outline"
                        size="sm"
                      >
                        Generate
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category.replace('-', ' ').toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Welcome Discount"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Description of the voucher..."
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none h-20 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Discount Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage (%)</SelectItem>
                        <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discount">
                      Discount {formData.type === 'percentage' ? '(%)' : '($)'}
                    </Label>
                    <Input
                      id="discount"
                      type="number"
                      step={formData.type === 'percentage' ? '1' : '0.01'}
                      value={formData.discount}
                      onChange={(e) => setFormData({...formData, discount: e.target.value})}
                      placeholder={formData.type === 'percentage' ? '10' : '20.00'}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="validFrom">Valid From</Label>
                    <Input
                      id="validFrom"
                      type="date"
                      value={formData.validFrom}
                      onChange={(e) => setFormData({...formData, validFrom: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="validUntil">Valid Until</Label>
                    <Input
                      id="validUntil"
                      type="date"
                      value={formData.validUntil}
                      onChange={(e) => setFormData({...formData, validUntil: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minSpend">Min Spend ($)</Label>
                    <Input
                      id="minSpend"
                      type="number"
                      step="0.01"
                      value={formData.minSpend}
                      onChange={(e) => setFormData({...formData, minSpend: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>

                  {formData.type === 'percentage' && (
                    <div className="space-y-2">
                      <Label htmlFor="maxDiscount">Max Discount ($)</Label>
                      <Input
                        id="maxDiscount"
                        type="number"
                        step="0.01"
                        value={formData.maxDiscount}
                        onChange={(e) => setFormData({...formData, maxDiscount: e.target.value})}
                        placeholder="Optional"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="usageLimit">Usage Limit</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({...formData, usageLimit: e.target.value})}
                    placeholder="100"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({...formData, active: e.target.checked})}
                    className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                  />
                  <Label htmlFor="active">Active Voucher</Label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700"
                  >
                    {editingVoucher ? 'Update Voucher' : 'Create Voucher'}
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

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-r from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalVouchers}</div>
              <div className="text-blue-800 font-medium">Total Vouchers</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-r from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.activeVouchers}</div>
              <div className="text-green-800 font-medium">Active</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-r from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{stats.totalUsage}</div>
              <div className="text-purple-800 font-medium">Total Uses</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-r from-red-50 to-red-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{stats.expiredVouchers}</div>
              <div className="text-red-800 font-medium">Expired</div>
            </CardContent>
          </Card>
        </div>

        {/* Vouchers Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {vouchers.map((voucher) => (
            <Card 
              key={voucher._id} 
              className={`border-0 shadow-lg transition-all ${
                voucher.active && !isExpired(voucher.validUntil) ? 'bg-white/80' : 'bg-gray-100/80'
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge className={getCategoryColor(voucher.category)} variant="outline">
                      {voucher.category.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <Badge className={
                      voucher.active && !isExpired(voucher.validUntil) 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }>
                      {voucher.active && !isExpired(voucher.validUntil) ? 'Active' : (isExpired(voucher.validUntil) ? 'Expired' : 'Inactive')}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-rose-600">
                      {voucher.type === 'percentage' ? `${voucher.discount}%` : `$${voucher.discount}`} OFF
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg">{voucher.title}</CardTitle>
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">
                  {voucher.code}
                </code>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{voucher.description}</p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Valid until {new Date(voucher.validUntil).toLocaleDateString()}</span>
                    </div>
                    {isExpired(voucher.validUntil) && (
                      <Badge variant="outline" className="text-red-600 border-red-300">
                        Expired
                      </Badge>
                    )}
                  </div>
                  
                  {voucher.minSpend > 0 && (
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4" />
                      <span>Minimum spend: ${voucher.minSpend}</span>
                    </div>
                  )}
                  
                  {voucher.maxDiscount && (
                    <div className="flex items-center space-x-2">
                      <Percent className="w-4 h-4" />
                      <span>Max discount: ${voucher.maxDiscount}</span>
                    </div>
                  )}
                </div>

                {/* Usage Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Usage</span>
                    </div>
                    <span>{voucher.usedCount} / {voucher.usageLimit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-rose-500 to-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${getUsagePercentage(voucher.usedCount, voucher.usageLimit)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4 border-t border-gray-100">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenDialog(voucher)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleVoucherStatus(voucher._id)}
                    className={voucher.active ? 'hover:bg-red-50 hover:text-red-600' : 'hover:bg-green-50 hover:text-green-600'}
                  >
                    {voucher.active ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteVoucher(voucher._id)}
                    className="hover:bg-red-50 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {vouchers.length === 0 && (
          <Card className="border-0 shadow-lg bg-white/80">
            <CardContent className="p-12 text-center">
              <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Vouchers Created</h3>
              <p className="text-gray-500 mb-6">
                Create your first discount voucher to attract customers.
              </p>
              <Button 
                onClick={() => handleOpenDialog()}
                className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Voucher
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ManageVouchers;
