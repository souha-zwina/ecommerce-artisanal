package com.ecommerce.artisanal_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "produits")
public class Produit {

    @Id
    private String id;
    private String nom;
    private String description;
    private double prix;
    private int stock;
    private String categorie;
    private String imageUrl;
}
