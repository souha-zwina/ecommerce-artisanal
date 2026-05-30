package com.ecommerce.artisanal_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.util.List;

@Data
@Document(collection = "utilisateurs")
public class Utilisateur {

    @Id
    private String id;
    private String nom;
    private String email;
    private String motDePasse;
    private String role; // "CLIENT" ou "ADMIN"
}
