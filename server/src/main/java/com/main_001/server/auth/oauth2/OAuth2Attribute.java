package com.main_001.server.auth.oauth2;

import com.google.api.services.people.v1.model.Birthday;
import com.main_001.server.exception.BusinessLogicException;
import com.main_001.server.exception.ExceptionCode;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.Map;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@ToString
public class OAuth2Attribute {
    private Map<String, Object> attributes;

    private String nameAttributeKey;

    private String name;

    private String email;

    private String picture;

    private String provider;

    private String gender;

    private String birth;

    public static OAuth2Attribute of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        switch (registrationId) {
            case "google" :
                return ofGoogle(userNameAttributeName, attributes);
            case "kakao" :
                return ofKakao(userNameAttributeName, attributes);
            default :
                throw new BusinessLogicException(ExceptionCode.OAUTH2_NOT_FOUND);
        }
    }

    private static OAuth2Attribute ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuth2Attribute.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
//                .gender((String) attributes.get("gender"))
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
                .gender((String) kakaoAccount.get("gender"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .provider("kakao")
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
