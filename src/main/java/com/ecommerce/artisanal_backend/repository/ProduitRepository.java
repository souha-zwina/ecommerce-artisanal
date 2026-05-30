package com.ecommerce.artisanal_backend.repository;

import com.ecommerce.artisanal_backend.model.Produit;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ProduitRepository extends MongoRepository<Produit, String> {
    List<Produit> findByCategorie(String categorie);
    List<Produit> findByNomContaining(String nom);
}