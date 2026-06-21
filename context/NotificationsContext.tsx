import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const NOTIFICATIONS_KEY = '@artisan_notifications';

export type NotificationType = 'order' | 'promo' | 'system';

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  read: boolean;
  data?: any;
  createdAt: string;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notif: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
        if (stored) setNotifications(JSON.parse(stored));
      } catch (e) {
        console.error('Erreur chargement notifications:', e);
      } finally {
        setLoaded(true);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications)).catch(console.error);
    }
  }, [notifications, loaded]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = (notif: Omit<Notification, 'id' | 'read' | 'createdAt'>) => {
    const newNotif: Notification = {
      ...notif,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => setNotifications([]);

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, addNotification, markAsRead, markAllAsRead, deleteNotification, clearAll }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) throw new Error('useNotifications doit être utilisé dans NotificationsProvider');
  return context;
}