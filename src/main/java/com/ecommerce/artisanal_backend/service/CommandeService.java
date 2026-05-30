package com.ecommerce.artisanal_backend.service;

import com.ecommerce.artisanal_backend.model.Commande;
import com.ecommerce.artisanal_backend.repository.CommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommandeService {

    @Autowired
    private CommandeRepository commandeRepository;

    public Commande creerCommande(Commande commande) {
        commande.setStatut("EN_ATTENTE");
        commande.setDateCommande(LocalDateTime.now());
        return commandeRepository.save(commande);
    }

    public List<Commande> getCommandesUtilisateur(String utilisateurId) {
        return commandeRepository.findByUtilisateurId(utilisateurId);
    }

    public Commande modifierStatut(String id, String statut) {
        Optional<Commande> optional = commandeRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RuntimeException("Commande introuvable !");
        }
        Commande commande = optional.get();
        commande.setStatut(statut);
        return commandeRepository.save(commande);
    }

    public List<Commande> getToutesCommandes() {
        return commandeRepository.findAll();
    }
}