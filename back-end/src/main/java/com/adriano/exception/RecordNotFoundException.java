package com.adriano.exception;

public class RecordNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    // Constructor
    public RecordNotFoundException(Long id) {
        super("Registro não encontrado com id: " + id);
    }
}
