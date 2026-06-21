import { getProduitById } from "@/lib/api";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

// ===== MOCKS COMPLETS =====
const MOCK_PRODUCTS: Record<string, Product> = {
  "prod-1": {
    id: "prod-1",
    nom: "Tajine Marocain",
    description: "Tajine artisanal en terre cuite, décoré à la main",
    prix: 250,
    stock: 10,
    categorie: "Poterie",
    imageUrl: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=400"
  },
  "prod-2": {
    id: "prod-2",
    nom: "Tapis Berbère",
    description: "Tapis fait main par les femmes de l'Atlas",
    prix: 1200,
    stock: 5,
    categorie: "Tissage",
    imageUrl: "https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=400"
  },
  "prod-3": {
    id: "prod-3",
    nom: "Babouche Cuir",
    description: "Babouches traditionnelles en cuir véritable",
    prix: 180,
    stock: 20,
    categorie: "Maroquinerie",
    imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400"
  },
  "prod-4": {
    id: "prod-4",
    nom: "Boîte en Bois Sculpté",
    description: "Boîte décorative sculptée à la main",
    prix: 150,
    stock: 15,
    categorie: "Bois",
    imageUrl: "https://images.unsplash.com/photo-1603653856395-084009e58a42?w=400"
  },
  "prod-5": {
    id: "prod-5",
    nom: "Collier en Argent",
    description: "Bijou artisanal berbère avec pierres",
    prix: 450,
    stock: 8,
    categorie: "Bijoux",
    imageUrl: "https://images.unsplash.com/photo-1515562142117-1486f7c7dd25?w=400"
  },
  "prod-6": {
    id: "prod-6",
    nom: "Vase Coloré",
    description: "Vase en céramique peint à la main",
    prix: 320,
    stock: 12,
    categorie: "Poterie",
    imageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400"
  }
};

const USE_MOCK = true;

export function useProduct(id: string) {
  return useQuery<Product>({
    queryKey: ["produit", id],
    queryFn: async () => {
      if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const product = MOCK_PRODUCTS[id];
        if (!product) throw new Error(`Produit ${id} non trouvé`);
        return product;
      }
      const { data } = await getProduitById(id);
      return data;
    },
    enabled: !!id,
  });
}

export default useProduct;