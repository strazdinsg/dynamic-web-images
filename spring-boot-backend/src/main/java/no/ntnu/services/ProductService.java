package no.ntnu.services;

import no.ntnu.models.Product;
import no.ntnu.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

/**
 * Business logic for products
 */
@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAll() {
        List<Product> products = new LinkedList<>();
        productRepository.findAll().forEach(products::add);
        return products;
    }

    /**
     * Get one product by it's ID
     *
     * @param id Unique ID
     * @return The product or null if none found by that ID
     */
    public Product getById(Integer id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);
    }

    /**
     * Update a product in the database
     *
     * @param id      The ID of the product to update
     * @param product the new data for the product
     * @return null on success, error message on error
     */
    public String update(int id, Product product) {
        Optional<Product> existingProduct = productRepository.findById(id);
        String errorMessage = null;
        if (existingProduct.isPresent()) {
            product.setId(id);
            try {
                productRepository.save(product);
            } catch (Exception e) {
                errorMessage = "Error while saving the product to DB: " + e.getMessage();
            }
        } else {
            errorMessage = "Product with given ID not found";
        }
        return errorMessage;
    }

    /**
     * Delete a product from the database
     * @param id ID of the product to delete
     * @return null on success, error message on error
     */
    public String delete(Integer id) {
        String errorMessage = null;
        try {
            productRepository.deleteById(id);
        } catch (Exception e) {
            errorMessage = "Error while deleting a product from DB: " + e.getMessage();
        }
        return errorMessage;
    }

    /**
     * Add a new product to the database
     * @param product
     * @return null on success, error message on error
     */
    public String add(Product product) {
        String errorMessage = null;
        if (product.getId() > 0) {
            Optional<Product> existingProduct = productRepository.findById(product.getId());
            if (existingProduct.isPresent()) {
                errorMessage = "Product with that ID already exists";
            }
        }
        if (errorMessage == null) {
            try {
                Product savedProduct = productRepository.save(product);
                product.setId(savedProduct.getId());
            } catch (Exception e) {
                errorMessage = "Error while adding the product to DB: " + e.getMessage();
            }
        }
        return errorMessage;
    }
}
