package com.ecommerce.artisanal_backend;

import com.ecommerce.artisanal_backend.model.Produit;
import com.ecommerce.artisanal_backend.repository.ProduitRepository;
import com.ecommerce.artisanal_backend.service.ProduitService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.List;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class ProduitServiceTest {

    @Mock
    private ProduitRepository produitRepository;

    @InjectMocks
    private ProduitService produitService;

    @Test
    public void testGetTousProduits() {
        Produit p = new Produit();
        p.setNom("Tapis");
        p.setPrix(100.0);
        when(produitRepository.findAll()).thenReturn(List.of(p));
        List<Produit> produits = produitService.getTousProduits();
        assertEquals(1, produits.size());
        assertEquals("Tapis", produits.get(0).getNom());
    }

    @Test
    public void testAjouterProduit() {
        Produit p = new Produit();
        p.setNom("Poterie");
        p.setPrix(200.0);
        when(produitRepository.save(p)).thenReturn(p);
        Produit result = produitService.ajouterProduit(p);
        assertNotNull(result);
        assertEquals("Poterie", result.getNom());
    }
}
