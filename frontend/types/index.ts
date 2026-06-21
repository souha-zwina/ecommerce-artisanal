// ============================================
// TYPES BACKEND SPRING BOOT (Membre 1)
// ============================================

export interface User {
  id: string;
  nom: string;
  email: string;
  role: "CLIENT" | "ADMIN";
}

export interface Product {
  id: string;
  nom: string;
  description: string;
  prix: number;
  stock: number;
  categorie: string;
  imageUrl: string;
}

export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface Order {
  id: string;
  utilisateurId: string;
  produitIds: string[];
  total: number;
  statut: OrderStatus;
  dateCommande: string;
}

// ============================================
// TYPES PANIER (Personne B)
// ============================================

export interface CartItem {
  productId: string;
  nom: string;
  imageUrl: string;
  prix: number;
  quantity: number;
}

// Pour le checkout
export interface CheckoutForm {
  address: string;
  city: string;
  phone: string;
}

// Notification
export interface AppNotification {
  id: number;
  title: string;
  body: string;
  type: 'ORDER' | 'PROMO' | 'SYSTEM';
  isRead: boolean;
  orderId?: string;
  createdAt: string;
}