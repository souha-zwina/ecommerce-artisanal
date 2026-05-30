package com.ecommerce.artisanal_backend.repository;

import com.ecommerce.artisanal_backend.model.Commande;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CommandeRepository extends MongoRepository<Commande, String> {
    List<Commande> findByUtilisateurId(String utilisateurId);
    List<Commande> findByStatut(String statut);
}
