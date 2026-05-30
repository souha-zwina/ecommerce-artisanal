package com.ecommerce.artisanal_backend.service;

import com.ecommerce.artisanal_backend.model.Produit;
import com.ecommerce.artisanal_backend.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    public List<Produit> getTousProduits() {
        return produitRepository.findAll();
    }

    public Optional<Produit> getProduitById(String id) {
        return produitRepository.findById(id);
    }

    public List<Produit> getProduitsByCategorie(String categorie) {
        return produitRepository.findByCategorie(categorie);
    }

    public Produit ajouterProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    public Produit modifierProduit(String id, Produit produit) {
        produit.setId(id);
        return produitRepository.save(produit);
    }

    public void supprimerProduit(String id) {
        produitRepository.deleteById(id);
    }
}
