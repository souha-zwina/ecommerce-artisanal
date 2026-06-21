package com.ecommerce.artisanal_backend.service;

import com.ecommerce.artisanal_backend.model.Utilisateur;
import com.ecommerce.artisanal_backend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;
@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public Utilisateur inscrire(Utilisateur utilisateur) {
        if (utilisateurRepository.existsByEmail(utilisateur.getEmail())) {
            throw new RuntimeException("Email déjà utilisé !");
        }
        utilisateur.setRole("CLIENT");
        return utilisateurRepository.save(utilisateur);
    }

    public Optional<Utilisateur> trouverParEmail(String email) {
        return utilisateurRepository.findByEmail(email);
    }

    public Utilisateur modifierProfil(String id, Utilisateur utilisateur) {
        utilisateur.setId(id);
        return utilisateurRepository.save(utilisateur);
    }
    
    public List<Utilisateur> getTousLesUtilisateurs() {
        return utilisateurRepository.findAll();
    }
}
