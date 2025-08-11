export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  ingredients: Ingredient[];
  image?: string;
  category: 'pizza' | 'pasta' | 'appetizers' | 'desserts';
}

export interface Ingredient {
  id: string;
  name: string;
  price: number;
  isDefault: boolean;
  category: 'base' | 'protein' | 'vegetable' | 'cheese' | 'sauce' | 'spice';
}

export interface CustomizedItem {
  menuItem: MenuItem;
  selectedIngredients: string[];
  totalPrice: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  customizedIngredients?: string[];
  customizedPrice?: number;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  handler: (response: any) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}