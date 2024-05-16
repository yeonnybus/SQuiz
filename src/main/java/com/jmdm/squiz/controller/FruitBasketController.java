package com.jmdm.squiz.controller;

import com.jmdm.squiz.dto.CustomUserDetails;
import com.jmdm.squiz.dto.FruitBasketsLoadResponse;
import com.jmdm.squiz.dto.PdfUploadResponse;
import com.jmdm.squiz.exception.SuccessCode;
import com.jmdm.squiz.service.FruitBasketService;
import com.jmdm.squiz.utils.ApiResponseEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/fruit-basket")
@Tag(name = "과일바구니 API", description = "과일바구니를 불러오고 각 바구니의 문제를 제공하는 API입니다.")
public class FruitBasketController {
    private final FruitBasketService fruitBasketService;

    @GetMapping(name = "/load-fruit-baskets")
    @Operation(summary = "과일 바구니 목록을 불러오는 API",
            description = "사용자의 모든 과일바구니를 제공하는 API입니다.")
    @SecurityRequirement(name = "bearerAuth")
    @ApiResponse(responseCode = "200", description = "사용자의 과일 바구니 로드 성공", content = @Content(schema = @Schema(implementation = FruitBasketsLoadResponse.class)))
    public ResponseEntity<ApiResponseEntity<FruitBasketsLoadResponse>> loadFruitBaskets(@AuthenticationPrincipal CustomUserDetails userDetails) {
        String memberId = userDetails.getUsername();
        FruitBasketsLoadResponse response = fruitBasketService.loadFruitBasket(memberId);
        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS, response, "과일 바구니 목록입니다."));
    }

//    @GetMapping(name = "/problems")
//    @Operation(summary = "특정 과일 바구니의 문제들을 불러오는 API",
//            description = "사용자의 특정 과일 바구니 id를 받아 문제들을 불러오는 API입니다.")
//    public ResponseEntity<ApiResponseEntity<ProblemsLoadResponse>> loadFruitBaskets(@AuthenticationPrincipal CustomUserDetails userDetails,
//                                                                                    @RequestParam Long fruitBasketId) {
//        ProblemsLoadResponse response = fruitBasketService.loadProblems(fruitBasketId);
//        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS, response, "해당 과일 바구니의 문제들입니다."));
//    }
}
