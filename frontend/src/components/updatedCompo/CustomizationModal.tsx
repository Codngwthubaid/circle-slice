import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { MenuItem, CustomizedItem } from '@/types/menu';
import { availableIngredients } from '@/constant/index';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem;
  onConfirm: (customizedItem: CustomizedItem) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  isOpen,
  onClose,
  item,
  onConfirm
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(item.price);

  useEffect(() => {
    // Initialize with default ingredients
    const defaultIngredients = item.ingredients
      .filter(ing => ing.isDefault)
      .map(ing => ing.id);
    setSelectedIngredients(defaultIngredients);
  }, [item]);

  useEffect(() => {
    // Calculate total price based on selected ingredients
    const ingredientPrice = selectedIngredients.reduce((sum, ingredientId) => {
      const ingredient = [...Object.values(availableIngredients).flat()]
        .find(ing => ing.id === ingredientId);
      return sum + (ingredient?.price || 0);
    }, 0);
    setTotalPrice(item.price + ingredientPrice);
  }, [selectedIngredients, item.price]);

  const toggleIngredient = (ingredientId: string) => {
    setSelectedIngredients(prev => {
      if (prev.includes(ingredientId)) {
        return prev.filter(id => id !== ingredientId);
      } else {
        return [...prev, ingredientId];
      }
    });
  };

  const isIngredientSelected = (ingredientId: string) => {
    return selectedIngredients.includes(ingredientId);
  };

  const isIngredientDefault = (ingredientId: string) => {
    return item.ingredients.some(ing => ing.id === ingredientId && ing.isDefault);
  };

  const handleConfirm = () => {
    const customizedItem: CustomizedItem = {
      menuItem: item,
      selectedIngredients,
      totalPrice
    };
    onConfirm(customizedItem);
    onClose();
  };

  const categoryTitles = {
    sauce: 'Sauces',
    cheese: 'Cheeses',
    protein: 'Proteins',
    vegetable: 'Vegetables',
    spice: 'Herbs & Spices'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center justify-between">
            Customize {item.name}
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-lg px-3 py-1">
              ₹{totalPrice}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Preview */}
          <Card className="bg-gradient-to-r from-emerald-50 to-emerald-100">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-500">Base Price:</span>
                    <Badge variant="outline">₹{item.price}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredient Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(availableIngredients).map(([category, ingredients]) => (
              <Card key={category} className="border-2 hover:border-emerald-200 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                    {categoryTitles[category as keyof typeof categoryTitles]}
                    <Badge variant="secondary" className="text-xs">
                      {ingredients.filter(ing => isIngredientSelected(ing.id)).length} selected
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {ingredients.map((ingredient) => {
                    const isSelected = isIngredientSelected(ingredient.id);
                    const isDefault = isIngredientDefault(ingredient.id);
                    
                    return (
                      <div
                        key={ingredient.id}
                        className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-emerald-300 bg-emerald-50' 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        onClick={() => toggleIngredient(ingredient.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected 
                              ? 'border-emerald-500 bg-emerald-500' 
                              : 'border-gray-300'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <div>
                            <span className="font-medium text-gray-900 flex items-center gap-2">
                              {ingredient.name}
                              {isDefault && (
                                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                  Default
                                </Badge>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {ingredient.price > 0 && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              +₹{ingredient.price}
                            </Badge>
                          )}
                          {ingredient.price === 0 && (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                              Free
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Price Breakdown */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg">Price Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Base Price:</span>
                <span className="font-medium">₹{item.price}</span>
              </div>
              {selectedIngredients.map(ingredientId => {
                const ingredient = [...Object.values(availableIngredients).flat()]
                  .find(ing => ing.id === ingredientId);
                if (!ingredient || ingredient.price === 0) return null;
                
                return (
                  <div key={ingredientId} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">+ {ingredient.name}:</span>
                    <span className="text-green-600">+₹{ingredient.price}</span>
                  </div>
                );
              })}
              <div className="border-t pt-2 flex justify-between items-center font-bold text-lg">
                <span>Total:</span>
                <span className="text-emerald-600">₹{totalPrice}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex gap-3">
          <Button variant="destructive" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            className="bg-gradient-to-r from-emerald-500 to-emerald-500 hover:from-emerald-600 hover:to-emerald-600 text-white px-8"
          >
            Add to Cart - ₹{totalPrice}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};