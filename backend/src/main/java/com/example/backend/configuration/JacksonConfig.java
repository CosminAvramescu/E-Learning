package com.example.backend.configuration;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import java.util.TimeZone;

@Configuration
//aceasta clasa a fost configurata pentru a repara data inregistrata: la quiz, se inregistra cu -1 la ziua introdusa (din cauza timpului local)
public class JacksonConfig {

    @Bean
    @Primary
    public Jackson2ObjectMapperBuilder jackson2ObjectMapperBuilder() {
        final Jackson2ObjectMapperBuilder jackson2ObjectMapperBuilder = new Jackson2ObjectMapperBuilder();
        jackson2ObjectMapperBuilder.timeZone(TimeZone.getDefault());
        jackson2ObjectMapperBuilder.serializationInclusion(JsonInclude.Include.NON_EMPTY);
        jackson2ObjectMapperBuilder.featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return jackson2ObjectMapperBuilder;
    }

}
