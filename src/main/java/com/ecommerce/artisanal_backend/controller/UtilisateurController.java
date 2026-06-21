package com.ecommerce.artisanal_backend.controller;

import com.ecommerce.artisanal_backend.model.Utilisateur;
import com.ecommerce.artisanal_backend.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin(origins = "*")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping("/inscrire")
    public Utilisateur inscrire(@RequestBody Utilisateur utilisateur) {
        return utilisateurService.inscrire(utilisateur);
    }

    @GetMapping("/email/{email}")
    public Utilisateur getParEmail(@PathVariable String email) {
        return utilisateurService.trouverParEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable !"));
    }

    @PutMapping("/{id}")
    public Utilisateur modifierProfil(@PathVariable String id,
                                      @RequestBody Utilisateur utilisateur) {
        return utilisateurService.modifierProfil(id, utilisateur);
    }

    @GetMapping
    public List<Utilisateur> getTousLesUtilisateurs() {
        return utilisateurService.getTousLesUtilisateurs();
    }
}
