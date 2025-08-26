package com.adriano.enums;

// Enum representing the status of a course
public enum Status {
    ACTIVE("Active"),
    DELETED("Deleted");

    private final String value;

    private Status(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }
}
