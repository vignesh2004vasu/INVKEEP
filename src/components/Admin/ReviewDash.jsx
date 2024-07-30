import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ReviewDash = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "https://in-telli-ventory.onrender.com/api/reviews"
        );
        setReviews(response.data);
      } catch (error) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Table className="mt-16 text-xl">
      <TableCaption>Review List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Review</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.map((review) => (
          <TableRow key={review.reviewId}>
            <TableCell className="font-medium">{review.reviewId}</TableCell>
            <TableCell>{review.product.productName}</TableCell>
            <TableCell>{review.user.firstname}</TableCell>
            <TableCell>{review.reviewText}</TableCell>
            <TableCell>{new Date(review.reviewDate).toLocaleDateString()}</TableCell>
            <TableCell>{review.sentimentScore}</TableCell> 
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReviewDash;
