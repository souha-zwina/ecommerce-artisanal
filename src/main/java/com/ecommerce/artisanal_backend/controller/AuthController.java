package com.ecommerce.artisanal_backend.controller;

import com.ecommerce.artisanal_backend.model.Utilisateur;
import com.ecommerce.artisanal_backend.repository.UtilisateurRepository;
import com.ecommerce.artisanal_backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Utilisateur utilisateur) {
        if (utilisateurRepository.existsByEmail(utilisateur.getEmail())) {
            return ResponseEntity.badRequest().body("Email déjà utilisé !");
        }
        utilisateur.setRole("CLIENT");
        utilisateurRepository.save(utilisateur);
        return ResponseEntity.ok("Inscription réussie !");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("motDePasse");
        Optional<Utilisateur> user = utilisateurRepository.findByEmail(email);
        if (user.isPresent() && user.get().getMotDePasse().equals(password)) {
            String token = jwtUtil.generateToken(email);
            return ResponseEntity.ok(Map.of("token", token));
        }
        return ResponseEntity.status(401).body("Identifiants incorrects !");
    }

}
