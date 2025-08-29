package com.adriano.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.adriano.dto.CourseDTO;
import com.adriano.dto.CoursePageDTO;
import com.adriano.dto.mapper.CourseMapper;
import com.adriano.exception.RecordNotFoundException;
import com.adriano.model.Course;
import com.adriano.repository.CourseRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CourseService {
    
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    public CourseService(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    //List all courses with pagination
    public CoursePageDTO list(int page, @Positive @Max(100) int pageSize) {
        Page<Course> pageCourse = courseRepository.findAll(PageRequest.of(page, pageSize));
        List<CourseDTO> courses = pageCourse.get().map(courseMapper::toDTO).collect(Collectors.toList());
        return new CoursePageDTO(courses, pageCourse.getTotalElements(), pageCourse.getTotalPages());
    }

    //List all courses
    // public List<CourseDTO> list() {
    //     return courseRepository.findAll()
    //             .stream()
    //             .map(courseMapper::toDTO)
    //             .toList(); // Using toList() to collect the stream into a List
    // }

    // Find a course by ID
    public CourseDTO findById(@NotNull @Positive Long id) {
        return courseRepository.findById(id)
        .map(courseMapper::toDTO)
            .orElseThrow(() -> new RecordNotFoundException(id));
    }

    // Create some courses
    public CourseDTO create(@Valid @NotNull CourseDTO course) {
        return courseMapper.toDTO(courseRepository.save(courseMapper.toEntity(course)));
    }

    // Update a course
    public CourseDTO update(@NotNull @Positive Long id, @Valid @NotNull CourseDTO courseDTO) {
        return courseRepository.findById(id)
        .map(recordFound -> {
            Course course = courseMapper.toEntity(courseDTO);
            recordFound.setName(courseDTO.name());
            recordFound.setCategory(courseMapper.convertCategoryValue(courseDTO.category()));
            recordFound.getLessons().clear();
            course.getLessons().forEach(recordFound.getLessons()::add);
            return courseMapper.toDTO(courseRepository.save(recordFound));
        }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    // Delete a course
    public void delete(@NotNull @Positive Long id) {
        courseRepository.delete(courseRepository.findById(id)
                        .orElseThrow(() -> new RecordNotFoundException(id)));
    }

}
