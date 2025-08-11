import React, { useState, useMemo } from 'react';
import { Pizza, UtensilsCrossed, Cookie, Soup } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MenuCard } from './MenuCard';
import { CartSummary } from './CartSummary';
import { CustomizationModal } from './CustomizationModal';
import { menuItems } from '@/constant/index';
import type { MenuItem, CartItem, CustomizedItem } from '@/types/menu';
import { loadStripe } from "@stripe/stripe-js";
import { axiosInstance } from '@/lib/axiosInstance';

export const RestaurantMenu: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('pizza');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [customizationModal, setCustomizationModal] = useState<{
    isOpen: boolean;
    item: MenuItem | null;
  }>({ isOpen: false, item: null });

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

  const tabConfig = [
    { value: 'pizza', label: 'Pizza', icon: Pizza },
    { value: 'pasta', label: 'Pasta', icon: UtensilsCrossed },
    { value: 'appetizers', label: 'Appetizers', icon: Soup },
    { value: 'desserts', label: 'Desserts', icon: Cookie },
  ];

  const categorizedItems = useMemo(() => {
    return menuItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, MenuItem[]>);
  }, []);

  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: quantity
    }));

    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => {
        const existingItem = prev.find(item => item.id === id);
        if (existingItem) {
          return prev.map(item =>
            item.id === id ? { ...item, quantity } : item
          );
        }
        return prev;
      });
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    const currentQuantity = quantities[item.id] || 0;
    const newQuantity = currentQuantity + 1;

    setQuantities(prev => ({
      ...prev,
      [item.id]: newQuantity
    }));

    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: newQuantity }];
      }
    });
  };

  const handleCustomize = (item: MenuItem) => {
    setCustomizationModal({ isOpen: true, item });
  };

  const handleCustomizationConfirm = (customizedItem: CustomizedItem) => {
    const cartItem: CartItem = {
      ...customizedItem.menuItem,
      quantity: 1,
      customizedIngredients: customizedItem.selectedIngredients,
      customizedPrice: customizedItem.totalPrice
    };

    // Generate unique ID for customized item
    const customizedId = `${customizedItem.menuItem.id}-${Date.now()}`;
    cartItem.id = customizedId;

    setCartItems(prev => [...prev, cartItem]);
    setQuantities(prev => ({
      ...prev,
      [customizedId]: 1
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    setQuantities(prev => ({
      ...prev,
      [id]: 0
    }));
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
    } else {
      handleQuantityChange(id, quantity);
    }
  };

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      // Axios call to backend
      const { data } = await axiosInstance.post(
        "/payment/create-checkout-session",
        { cartItems }
      );

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      if (error) {
        console.error(error);
        alert("Payment failed.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong with payment.");
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Menu Section */}
        <div className="w-full md:w-[70vw]">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-transparent shadow-sm h-14">
              {tabConfig.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center gap-2 text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-400 data-[state=active]:to-emerald-400 text-white border border-gray-200"
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {tabConfig.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categorizedItems[tab.value as keyof typeof categorizedItems]?.map((item) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      quantity={quantities[item.id] || 0}
                      onQuantityChange={handleQuantityChange}
                      onAddToCart={handleAddToCart}
                      onCustomize={handleCustomize}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Cart Section */}
        <div className="w-full md:w-[30vw]">
          <CartSummary
            cartItems={cartItems}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateCartQuantity}
            onCheckout={handleCheckout}
          />
        </div>
      </div>

      {/* Customization Modal */}
      {customizationModal.item && (
        <CustomizationModal
          isOpen={customizationModal.isOpen}
          onClose={() => setCustomizationModal({ isOpen: false, item: null })}
          item={customizationModal.item}
          onConfirm={handleCustomizationConfirm}
        />
      )}
    </div>
  );
};