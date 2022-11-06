package com.example.backend.service;

import com.example.backend.model.Category;
import com.example.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<Category> getCategoryListByName(String categoryName) {
        return categoryRepository.findAllByName(categoryName);
    }

    public Category getCategoryByName(String categoryName){
        return categoryRepository.getCategoryByName(categoryName);
    }
}
