package com.ecommerce.artisanal_backend.controller;

import com.ecommerce.artisanal_backend.model.Commande;
import com.ecommerce.artisanal_backend.service.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/commandes")
@CrossOrigin(origins = "*")
public class CommandeController {

    @Autowired
    private CommandeService commandeService;

    @PostMapping
    public Commande creerCommande(@RequestBody Commande commande) {
        return commandeService.creerCommande(commande);
    }

    @GetMapping("/utilisateur/{utilisateurId}")
    public List<Commande> getCommandesUtilisateur(
            @PathVariable String utilisateurId) {
        return commandeService.getCommandesUtilisateur(utilisateurId);
    }

    @PutMapping("/{id}/statut")
    public Commande modifierStatut(@PathVariable String id,
                                   @RequestParam String statut) {
        return commandeService.modifierStatut(id, statut);
    }

    @GetMapping
    public List<Commande> getToutesCommandes() {
        return commandeService.getToutesCommandes();
    }
}