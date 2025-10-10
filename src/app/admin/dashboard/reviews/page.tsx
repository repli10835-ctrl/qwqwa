"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, X, Star } from "lucide-react";
import Image from "next/image";

interface Review {
  id: string;
  customer_name: string;
  customer_image: string;
  location: string;
  rating: number;
  review_text: string;
  is_featured: boolean;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_image: "",
    location: "",
    rating: 5,
    review_text: "",
    is_featured: false,
  });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("customer_reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingReview) {
        const { error } = await supabase
          .from("customer_reviews")
          .update(formData)
          .eq("id", editingReview.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("customer_reviews").insert(formData);

        if (error) throw error;
      }

      resetForm();
      loadReviews();
    } catch (error) {
      console.error("Error saving review:", error);
      alert("Failed to save review");
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      customer_name: review.customer_name,
      customer_image: review.customer_image,
      location: review.location,
      rating: review.rating,
      review_text: review.review_text,
      is_featured: review.is_featured,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const { error } = await supabase.from("customer_reviews").delete().eq("id", id);

      if (error) throw error;
      loadReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review");
    }
  };

  const resetForm = () => {
    setFormData({
      customer_name: "",
      customer_image: "",
      location: "",
      rating: 5,
      review_text: "",
      is_featured: false,
    });
    setEditingReview(null);
    setShowForm(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Customer Reviews</h1>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Review
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{editingReview ? "Edit Review" : "Add New Review"}</CardTitle>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Customer Name</label>
                <Input
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  placeholder="e.g., Budi Santoso"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Customer Image URL</label>
                <Input
                  value={formData.customer_image}
                  onChange={(e) => setFormData({ ...formData, customer_image: e.target.value })}
                  placeholder="https://images.pexels.com/..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Jakarta, Indonesia"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Rating (1-5)</label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Review Text</label>
                <Textarea
                  value={formData.review_text}
                  onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
                  placeholder="Customer review..."
                  rows={4}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Featured Review</label>
                <Switch
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingReview ? "Update Review" : "Add Review"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="mb-4 flex items-start gap-4">
                {review.customer_image && (
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={review.customer_image}
                      alt={review.customer_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-bold">{review.customer_name}</h3>
                    {review.is_featured && (
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{review.location}</p>
                  <div className="mt-1 flex gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`h-4 w-4 ${
                          idx < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="mb-4 text-sm text-gray-700">{review.review_text}</p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(review)}
                  className="gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(review.id)}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600">No reviews found. Add your first review to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
