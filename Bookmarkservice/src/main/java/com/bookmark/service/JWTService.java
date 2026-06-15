package com.bookmark.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {

    String key = "newshub_secret_key_2026_vnvongfygjtvnrkjnvkjtrnkjrhf";

    public String generateJWT(Map<String, String> u1, String role) {
        SecretKey skey = Keys.hmacShaKeyFor(key.getBytes());

        Map<String, String> claim = new HashMap<>();
        claim.put("un", u1.get("username"));  // username = email
        claim.put("role", role);

        return Jwts.builder()
            .claims(claim)
            .issuedAt(new Date())
            .setExpiration(new Date(new Date().getTime() + 86400000))
            .signWith(skey)
            .compact();
    }

    public Map<String, String> validateJWT(String Token) throws Exception {
        SecretKey skey = Keys.hmacShaKeyFor(key.getBytes());

        Claims claim = Jwts.parser()
            .verifyWith(skey)
            .build()
            .parseSignedClaims(Token)
            .getPayload();

        if (claim == null || claim.getExpiration().before(new Date())) {
            throw new Exception("Token invalid");
        }

        Map<String, String> parsedJWT = new HashMap<>();
        parsedJWT.put("username", claim.get("un").toString());  // email
        parsedJWT.put("role", claim.get("role").toString());

        return parsedJWT;
    }
}