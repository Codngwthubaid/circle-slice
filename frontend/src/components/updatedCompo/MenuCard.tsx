import React from 'react';
import { Plus, Minus, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { MenuItem } from '@/types/menu';

interface MenuCardProps {
    item: MenuItem;
    quantity: number;
    onQuantityChange: (id: string, quantity: number) => void;
    onAddToCart: (item: MenuItem) => void;
    onCustomize: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
    item,
    quantity,
    onQuantityChange,
    onAddToCart,
    onCustomize
}) => {
    const handleQuantityChange = (delta: number) => {
        const newQuantity = Math.max(0, quantity + delta);
        onQuantityChange(item.id, newQuantity);
    };

    return (
        <Card className="bg-transparent group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden pb-6 pt-0">
            <div className="aspect-video overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold text-pink-600 transition-colors">
                        {item.name}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-pink-100 text-pink-800 font-semibold">
                        £{item.price}
                    </Badge>
                </div>
                <CardDescription className="text-white leading-relaxed">
                    {item.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="pb-4">
                <div className="space-y-3">
                    <div>
                        <h4 className="text-sm font-semibold text-pink-400 mb-2">Ingredients:</h4>
                        <div className="flex flex-wrap gap-1">
                            {item.ingredients.slice(0, 4).map((ingredient, index) => (
                                <Badge
                                key={index}
                                variant="outline"
                                className="text-xs bg-gray-50 text-gray-700 border-gray-200"
                              >
                                    {ingredient.name}
                                </Badge>
                            ))}
                        </div>
                        {item.ingredients.length > 4 && (
                            <Badge variant="outline" className="text-xs bg-gray-100 text-gray-500">
                                +{item.ingredients.length - 4} more
                            </Badge>
                        )}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-0 flex justify-between items-center gap-2">
                <div className="flex items-center space-x-3">
                    {quantity > 0 && (
                        <>
                            <Button
                                variant="outline"
                                size="icon"
                               className="h-8 w-8 rounded-full border-pink-300 hover:bg-pink-50"
                                onClick={() => handleQuantityChange(-1)}
                            >
                                <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-semibold text-white min-w-[20px] text-center">
                                {quantity}
                            </span>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full border-pink-300 hover:bg-pink-50"
                                onClick={() => handleQuantityChange(1)}
                            >
                                <Plus className="h-3 w-3" />
                            </Button>
                        </>
                    )}
                </div>

                <div className="flex gap-2">
                    {(item.category === 'pizza' || item.category === 'pasta' || item.category === 'appetizers') && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onCustomize(item)}
                            className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                        >
                            <Settings className="h-4 w-4" />
                        </Button>
                    )}
                    <Button
                        onClick={() => {
                            if (quantity === 0) {
                                onQuantityChange(item.id, 1);
                            }
                            onAddToCart(item);
                        }}
                        className="bg-gradient-to-r from-emerald-400 to-emerald-400 hover:from-emerald-600 hover:to-emerald-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        {quantity > 0 ? 'Add More' : 'Add to Cart'}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};