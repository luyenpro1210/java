package com.duonghongluyen.exercise03.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.duonghongluyen.exercise03.entity.Category;
import com.duonghongluyen.exercise03.entity.Gallery;
import com.duonghongluyen.exercise03.entity.Tag;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private UUID id;
    private String productName;
    private BigDecimal regularPrice;
    private BigDecimal discountPrice;
    private String productDescription;
    private Set<Category> categories = new HashSet<>();
    private Set<Tag> tags = new HashSet<>();
    private Set<Gallery> galleries  = new HashSet<>();
}
