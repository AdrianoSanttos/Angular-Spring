package com.adriano.enums.converters;

import java.util.stream.Stream;

import com.adriano.enums.Status;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply=true)
public class StatusConverter implements AttributeConverter<Status, String> {
    // Convert Status enum to String for database storage
    @Override
    public String convertToDatabaseColumn(Status status) {
        if (status == null) {
            return null;
        }
        return status.getValue();
    }

    // Convert String value from database to Status enum
    @Override
    public Status convertToEntityAttribute(String value) {
        if (value == null) {
            return null;
        }
        return Stream.of(Status.values())
                .filter(c -> c.getValue().equals(value))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
    
}
