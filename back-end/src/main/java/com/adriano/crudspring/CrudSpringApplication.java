package com.adriano.crudspring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.adriano.enums.Category;
import com.adriano.model.Course;
import com.adriano.model.Lesson;
import com.adriano.repository.CourseRepository;

@SpringBootApplication(scanBasePackages = "com.adriano")
@EnableJpaRepositories(basePackages = "com.adriano.repository")
@EntityScan(basePackages = "com.adriano.model")
public class CrudSpringApplication {
    public static void main(String[] args) {
        SpringApplication.run(CrudSpringApplication.class, args);
    }
    
    // Initialize the database with sample data
    @Bean
    CommandLineRunner initDatabase(CourseRepository courseRepository) {
        return args -> {
            courseRepository.deleteAll();
            
            Course c = new Course();
            c.setName("Angular com Spring");
            c.setCategory(Category.BACK_END);

            Lesson l = new Lesson();
            l.setName("Introdução ao Angular");
            l.setYoutubeUrl("01234567890");
            l.setCourse(c);
            c.getLessons().add(l);

            Lesson l1 = new Lesson();
            l1.setName("Angular");
            l1.setYoutubeUrl("01234567891");
            l1.setCourse(c);
            c.getLessons().add(l1);

            courseRepository.save(c);
        };
    }
}
