package no.ntnu;

import no.ntnu.models.Product;
import no.ntnu.repositories.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

/**
 * A class which inserts some dummy data into the database, when Spring Boot app has started
 */
@Component
public class DummyDataInitializer implements ApplicationListener<ApplicationReadyEvent> {
    @Autowired
    private ProductRepository productRepository;

    private final Logger logger = LoggerFactory.getLogger("DummyInit");

    /**
     * This method is called when the application is ready (loaded)
     *
     * @param event Event which we don't use :)
     */
    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        Product existingJeansProduct = productRepository.findOneByNameIgnoreCase("jeans");
        if (existingJeansProduct == null) {
            logger.info("Importing test data...");
            Product jeans = new Product("Jeans", 123, "Classic blue jeans for every situation of life (perhaps except weddings). No money back guarantee.");
            Product sneakers = new Product("Sneakers", 226.99, "Regular sneakers. Comfortable, available in all sizes and colors. Wear them to office, as well as to a digital meeting in MS Teams. Not meant for sneaking.");
            Product shirt = new Product("T-shirt", 58.72, "A shirt that reminds everyone of 'green thinking'.");

            productRepository.save(jeans);
            productRepository.save(sneakers);
            productRepository.save(shirt);

            logger.info("DONE importing test data");
        } else {
            logger.info("Data already in the database, not importing anything");
        }
    }
}
