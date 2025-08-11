import React from 'react';
import { ShoppingBag, X, ChefHat } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { CartItem } from '@/types/menu';
import { availableIngredients } from '@/constant/index';

interface CartSummaryProps {
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
}

const getIngredientById = (id: string) => {
  return [...Object.values(availableIngredients).flat()].find(ing => ing.id === id);
};

export const CartSummary: React.FC<CartSummaryProps> = ({
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout
}) => {
  const total = cartItems.reduce((sum, item) => sum + ((item.customizedPrice || item.price) * item.quantity), 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <Card className="sticky top-4 bg-transparent">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <ShoppingBag className="h-12 w-12 text-emerald-400" />
          </div>
          <CardTitle className="text-emerald-400">Your cart is empty</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="sticky top-4 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-emerald-400">
            <ShoppingBag className="h-5 w-5" />
            Your Order
          </span>
          <Badge variant="secondary" className="bg-pink-100 text-pink-800">
            {itemCount} items
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="max-h-80 overflow-y-auto space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm flex items-center gap-2">
                    {item.name}
                    {item.customizedIngredients && (
                      <Badge variant="outline" className="text-xs bg-amber-100 text-amber-700 border-amber-300">
                        <ChefHat className="h-3 w-3 mr-1" />
                        Customized
                      </Badge>
                    )}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600">
                      ₹{item.customizedPrice || item.price}
                    </span>
                    <span className="text-xs text-gray-500">× {item.quantity}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="h-6 w-6 p-0 rounded-full"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="text-sm font-medium min-w-[20px] text-center">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="h-6 w-6 p-0 rounded-full"
                  >
                    +
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Show customized ingredients */}
              {item.customizedIngredients && item.customizedIngredients.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <h5 className="text-xs font-medium text-gray-700 mb-1">Added Ingredients:</h5>
                  <div className="space-y-1">
                    {item.customizedIngredients.map((ingredientId) => {
                      const ingredient = getIngredientById(ingredientId);
                      if (!ingredient) return null;

                      return (
                        <div key={ingredientId} className="flex justify-between items-center text-xs">
                          <span className="text-gray-600">• {ingredient.name}</span>
                          <span className="text-green-600 font-medium">
                            {ingredient.price > 0 ? `+₹${ingredient.price}` : 'Free'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-emerald-400">Total:</span>
            <span className="text-2xl font-bold text-pink-600">₹{total}</span>
          </div>

          <Button
            onClick={onCheckout}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            Place Order - ₹{total}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};