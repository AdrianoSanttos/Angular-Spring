package com.adriano.dto.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.adriano.dto.CourseDTO;
import com.adriano.dto.LessonDTO;
import com.adriano.enums.Category;
import com.adriano.model.Course;
import com.adriano.model.Lesson;

@Component
public class CourseMapper {
    // Map Course to CourseDTO
    public CourseDTO toDTO(Course course) {
        if (course == null) {
            return null;
        }
        List<LessonDTO> lessons = course.getLessons()
            .stream()
            .map(lesson -> new LessonDTO(
                lesson.getId(),
                lesson.getName(),
                lesson.getYoutubeUrl()))
            .collect(Collectors.toList());
            
        return new CourseDTO(
            course.getId(),
            course.getName(),
            course.getCategory().getValue(),
            lessons
        );
    }

    // Map CourseDTO to Course
    public Course toEntity(CourseDTO courseDTO) {
        if (courseDTO == null) {
            return null;
        }

        Course course = new Course();
        if (courseDTO.id() != null) {
            course.setId(courseDTO.id());
        }
        course.setName(courseDTO.name());
        course.setCategory(convertCategoryValue(courseDTO.category()));

        List<Lesson> lessons = courseDTO.lessons().stream().map(lessonDTO -> {
            var lesson = new Lesson();
            lesson.setId(lessonDTO.id());
            lesson.setName(lessonDTO.name());
            lesson.setYoutubeUrl(lessonDTO.youtubeUrl());
            lesson.setCourse(course);
            return lesson;
        }).collect(Collectors.toList());
        course.setLessons(lessons);

        return course;
    }

    // Convert category value from String to Category enum  
    public Category convertCategoryValue(String value) {
        if (value == null) {
            return null;
        }
        return switch (value) {
            case "Front-end" -> Category.FRONT_END;
            case "Back-end" -> Category.BACK_END;
            default -> throw new IllegalArgumentException("Categoria inválida: " + value);
        };
    }

}
