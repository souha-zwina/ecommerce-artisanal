package com.ecommerce.artisanal_backend.controller;

import com.ecommerce.artisanal_backend.model.Produit;
import com.ecommerce.artisanal_backend.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin(origins = "*")
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @GetMapping
    public List<Produit> getTousProduits() {
        return produitService.getTousProduits();
    }

    @GetMapping("/{id}")
    public Produit getProduitById(@PathVariable String id) {
        return produitService.getProduitById(id)
                .orElseThrow(() -> new RuntimeException("Produit introuvable !"));
    }

    @GetMapping("/categorie/{categorie}")
    public List<Produit> getParCategorie(@PathVariable String categorie) {
        return produitService.getProduitsByCategorie(categorie);
    }

    @PostMapping
    public Produit ajouterProduit(@RequestBody Produit produit) {
        return produitService.ajouterProduit(produit);
    }

    @PutMapping("/{id}")
    public Produit modifierProduit(@PathVariable String id,
                                   @RequestBody Produit produit) {
        return produitService.modifierProduit(id, produit);
    }

    @DeleteMapping("/{id}")
    public String supprimerProduit(@PathVariable String id) {
        produitService.supprimerProduit(id);
        return "Produit supprimé !";
    }
}