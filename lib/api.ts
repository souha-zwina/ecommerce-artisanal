import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// ⚠️ Changer l'IP selon votre réseau local
// Trouver votre IP: ip addr show | grep "inet "
export const API_URL = "http://192.168.1.103/:8081";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Injecter l'userId dans les headers pour simuler l'auth
api.interceptors.request.use(async (config) => {
  const userJson = await AsyncStorage.getItem("@user");
  if (userJson) {
    const user = JSON.parse(userJson);
    if (user?.id) config.headers["X-User-Id"] = user.id;
  }
  return config;
});

// ===== PRODUITS =====
export const getProduits = () =>
  api.get<import("../types").Product[]>("/api/produits");

export const getProduitById = (id: string) =>
  api.get<import("../types").Product>(`/api/produits/${id}`);

export const getProduitsByCategorie = (cat: string) =>
  api.get<import("../types").Product[]>(`/api/produits/categorie/${cat}`);

// ===== UTILISATEURS =====
export const inscrireUtilisateur = (data: {
  nom: string; email: string; motDePasse: string; role?: string;
}) => api.post<import("../types").User>("/api/utilisateurs/inscrire", data);

export const getUtilisateurParEmail = (email: string) =>
  api.get<import("../types").User>(`/api/utilisateurs/email/${email}`);

export const modifierProfil = (id: string, data: Partial<import("../types").User>) =>
  api.put<import("../types").User>(`/api/utilisateurs/${id}`, data);

// ===== COMMANDES =====
export const getCommandesUtilisateur = (utilisateurId: string) =>
  api.get<import("../types").Order[]>(`/api/commandes/utilisateur/${utilisateurId}`);

export const creerCommande = (data: {
  utilisateurId: string; produitIds: string[]; total: number; statut?: string;
}) => api.post<import("../types").Order>("/api/commandes", data);

export default api;

import { AppNotification, Order } from '../types';

// Commandes
export const orderService = {
  getMyOrders: (utilisateurId: string) =>
    api.get<Order[]>(`/api/commandes/utilisateur/${utilisateurId}`),
  
  getById: (id: string) =>
    api.get<Order>(`/api/commandes/${id}`),
};

// Notifications (mock pour l'instant, adapter quand le backend les aura)
export const notificationService = {
  registerToken: (token: string) =>
    api.post('/api/notifications/token', { token }),
  
  getMyNotifications: () =>
    api.get<AppNotification[]>('/api/notifications/my'),
  
  markAsRead: (id: number) =>
    api.put(`/api/notifications/${id}/lu`),
};