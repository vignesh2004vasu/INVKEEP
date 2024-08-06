package com.backend.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.inventory.dto.ReviewDTO;
import com.backend.inventory.model.Review;
import com.backend.inventory.model.Product;
import com.backend.inventory.model.User;
import com.backend.inventory.service.ReviewService;
import com.backend.inventory.service.ProductService;
import com.backend.inventory.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin("*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @PostMapping
    public ResponseEntity<Review> addReview(@RequestBody ReviewDTO reviewDTO) {
        try {
            Product product = productService.getProduct(reviewDTO.getProductId());
            if (product == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            User user = userService.getUser(reviewDTO.getUserId());
            if (user == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Review review = new Review();
            review.setReviewId(reviewDTO.getReviewId());
            review.setProduct(product);
            review.setUser(user);
            review.setReviewText(reviewDTO.getReviewText());
            review.setReviewDate(reviewDTO.getReviewDate());
            review.setSentimentScore(reviewDTO.getSentimentScore());

            Review createdReview = reviewService.addReview(review);
            return new ResponseEntity<>(createdReview, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
