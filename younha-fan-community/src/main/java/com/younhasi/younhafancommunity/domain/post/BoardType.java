package com.younhasi.younhafancommunity.domain.post;

public enum BoardType {
    NOTICE, FREE, SAY_TO_YOUNHA, WANT_TO_HEAR, PHOTO;

    public static BoardType from(String value) {
        try {
            return BoardType.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("잘못된 게시판 타입입니다: " + value);
        }
    }
}
