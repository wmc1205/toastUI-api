package com.thymeleaf.tutorial.dto;

import groovyjarjarantlr4.v4.runtime.misc.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PaginationRequestDto {
    @NotNull
    private Integer page  = 1;
    @NotNull
    private Integer perPage = 10;
    private String sortColumn;
    private boolean sortAscending = true;
    private String keyword;

    @Builder
    public PaginationRequestDto(Integer page, Integer perPage,String sortColumn, boolean sortAscending, String keyword) {
        this.page = page;
        this.perPage = perPage;
        this.sortColumn = sortColumn;
        this.sortAscending = sortAscending;
        this.keyword = keyword;
    }

}
