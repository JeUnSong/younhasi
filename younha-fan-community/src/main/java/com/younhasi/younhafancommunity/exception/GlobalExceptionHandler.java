package com.younhasi.younhafancommunity.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ✅ 404 Not Found (리소스 없음)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleNotFoundException(IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    // ✅ 403 Forbidden (권한 없음)
    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<String> handleForbiddenException(SecurityException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }

    // ✅ 500 Internal Server Error (예상치 못한 에러)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGlobalException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생: " + e.getMessage());
    }
}