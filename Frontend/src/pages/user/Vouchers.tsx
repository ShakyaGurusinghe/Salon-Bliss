
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Gift, Copy, Calendar, DollarSign, Percent, Tag } from 'lucide-react';

const Vouchers = () => {
  const [newVoucherCode, setNewVoucherCode] = useState('');
  
  const availableVouchers = [
    {
      id: 1,
      code: 'WELCOME10',
      title: 'Welcome Discount',
      description: 'Get 10% off your first appointment',
      discount: 10,
      type: 'percentage',
      validUntil: '2024-12-31',
      minSpend: 0,
      maxDiscount: null,
      used: false,
      category: 'first-time'
    },
    {
      id: 2,
      code: 'SAVE20',
      title: '$20 Off Premium Services',
      description: 'Save $20 on services over $80',
      discount: 20,
      type: 'fixed',
      validUntil: '2024-06-30',
      minSpend: 80,
      maxDiscount: null,
      used: false,
      category: 'premium'
    },
    {
      id: 3,
      code: 'LOYALTY15',
      title: 'Loyalty Reward',
      description: '15% off for returning customers',
      discount: 15,
      type: 'percentage',
      validUntil: '2024-08-15',
      minSpend: 50,
      maxDiscount: 30,
      used: true,
      category: 'loyalty'
    },
    {
      id: 4,
      code: 'WEEKEND25',
      title: 'Weekend Special',
      description: '$25 off weekend appointments',
      discount: 25,
      type: 'fixed',
      validUntil: '2024-07-31',
      minSpend: 100,
      maxDiscount: null,
      used: false,
      category: 'special'
    }
  ];

  const usedVouchers = [
    {
      id: 5,
      code: 'NEWCLIENT',
      title: 'New Client Bonus',
      discount: 15,
      type: 'percentage',
      usedDate: '2024-01-10',
      serviceName: 'Deep Cleansing Facial',
      savedAmount: 9.75
    }
  ];

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Voucher code copied to clipboard!');
  };

  const addVoucher = () => {
    if (!newVoucherCode.trim()) {
      toast.error('Please enter a voucher code');
      return;
    }
    
    // Mock adding voucher
    console.log('Adding voucher:', newVoucherCode);
    toast.success('Voucher added successfully!');
    setNewVoucherCode('');
  };

  const getDiscountDisplay = (voucher: any) => {
    if (voucher.type === 'percentage') {
      return `${voucher.discount}% OFF`;
    } else {
      return `$${voucher.discount} OFF`;
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

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            My <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">Vouchers</span>
          </h1>
          <p className="text-lg text-gray-600">
            Save money on your favorite salon services with exclusive vouchers.
          </p>
        </div>

        {/* Add Voucher Section */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-rose-50 to-purple-50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Tag className="w-5 h-5 text-rose-600" />
              <span>Have a Voucher Code?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="Enter your voucher code"
                value={newVoucherCode}
                onChange={(e) => setNewVoucherCode(e.target.value.toUpperCase())}
                className="flex-1"
              />
              <Button
                onClick={addVoucher}
                className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700"
              >
                Add Voucher
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-r from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {availableVouchers.filter(v => !v.used && !isExpired(v.validUntil)).length}
              </div>
              <div className="text-green-800 font-medium">Available</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-r from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {usedVouchers.length}
              </div>
              <div className="text-blue-800 font-medium">Used</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-r from-purple-50 to-rose-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                ${usedVouchers.reduce((sum, v) => sum + v.savedAmount, 0).toFixed(0)}
              </div>
              <div className="text-purple-800 font-medium">Total Saved</div>
            </CardContent>
          </Card>
        </div>

        {/* Available Vouchers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <Gift className="w-6 h-6 text-rose-600" />
            <span>Available Vouchers</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableVouchers.filter(voucher => !voucher.used).map((voucher) => (
              <Card 
                key={voucher.id} 
                className={`border-0 shadow-lg bg-white/80 hover:shadow-xl transition-all ${
                  isExpired(voucher.validUntil) ? 'opacity-60' : ''
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getCategoryColor(voucher.category)} variant="outline">
                      {voucher.category.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-rose-600">
                        {getDiscountDisplay(voucher)}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{voucher.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{voucher.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Valid until {new Date(voucher.validUntil).toLocaleDateString()}</span>
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
                  
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">
                        {voucher.code}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(voucher.code)}
                        disabled={isExpired(voucher.validUntil)}
                        className="flex items-center space-x-1"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Used Vouchers */}
        {usedVouchers.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recently Used</h2>
            
            <div className="space-y-4">
              {usedVouchers.map((voucher) => (
                <Card key={voucher.id} className="border-0 shadow-lg bg-white/60">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{voucher.title}</h3>
                        <p className="text-sm text-gray-600">
                          Used on {new Date(voucher.usedDate).toLocaleDateString()} for {voucher.serviceName}
                        </p>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                          {voucher.code}
                        </code>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600 mb-1">
                          -${voucher.savedAmount.toFixed(2)}
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {voucher.type === 'percentage' ? `${voucher.discount}% OFF` : `$${voucher.discount} OFF`}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vouchers;
