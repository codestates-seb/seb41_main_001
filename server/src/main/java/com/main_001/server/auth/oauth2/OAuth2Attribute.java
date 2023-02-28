package com.main_001.server.auth.oauth2;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.util.Map;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class OAuth2Attribute {
    private Map<String, Object> attributes;

    private String nameAttributeKey;

    private String name;

    private String email;

    private String picture;

    private String provider;

    private String gender;

    @Builder
    public OAuth2Attribute(Map<String, Object> attributes, String nameAttributeKey, String name, String email, String picture, String provider, String gender) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.provider = provider;
        this.gender = gender;
    }

    public static OAuth2Attribute of(String registrationId, String userNameAttributeName, Map<String, Object> attributes){
        if("google".equals(registrationId)){
            return ofGoogle(userNameAttributeName, attributes);
        }

        return ofKakao("id", attributes);
    }

    private static OAuth2Attribute ofGoogle(String userNameAttributeName, Map<String, Object> attributes){
        return OAuth2Attribute.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .provider("google")
                .build();
    }

    private static OAuth2Attribute ofKakao(String userNameAttributeName, Map<String,Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");

        return OAuth2Attribute.builder()
                .name((String) kakaoProfile.get("nickname"))
                .email((String) kakaoAccount.get("email"))
                .picture((String) kakaoProfile.get("profile_image_url"))
                .nameAttributeKey(userNameAttributeName)
                .attributes(attributes)
                .provider("kakao")
                .gender((String) kakaoAccount.get("gender"))
                .build();
    }



//    private static OAuth2Attributes ofNaver(String userNameAtrributeName, Map<String, Object> attributes){
//        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
//
//        return OAuth2Attributes.builder()
//                .name((String) response.get("name"))
//                .email((String) response.get("email"))
//                .profile((String) response.get("profile_image"))
//                .attributes(response)
//                .nameAttributeKey(userNameAtrributeName)
//                .build();
//    }
}
