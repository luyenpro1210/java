package com.duonghongluyen.exercise03.service;

import java.util.List;
import java.util.UUID;

import com.duonghongluyen.exercise03.entity.Attribute;

public interface AttributeService {
    Attribute addAttribute(Attribute attribute);

    Attribute getAttributeById(UUID attributeId);

    List<Attribute> getAllAttributes();

    Attribute updateAttribute(UUID attributeId, Attribute updatedAttribute);

    void deleteAttribute(UUID attributeId);
}
