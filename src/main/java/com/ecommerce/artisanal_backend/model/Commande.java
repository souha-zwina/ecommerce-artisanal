package com.ecommerce.artisanal_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.util.List;
import java.time.LocalDateTime;

@Data
@Document(collection = "commandes")
public class Commande {

    @Id
    private String id;
    private String utilisateurId;
    private List<String> produitIds;
    private double total;
    private String statut;
    private LocalDateTime dateCommande;
}