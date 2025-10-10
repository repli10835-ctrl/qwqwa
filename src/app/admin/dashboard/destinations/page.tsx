"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, X } from "lucide-react";
import Image from "next/image";

interface City {
  id: string;
  name: string;
}

interface Destination {
  id: string;
  city_id: string;
  type: string;
  title: string;
  subtitle: string;
  price_from: number;
  image_url: string;
  is_featured: boolean;
  order: number;
  cities?: { name: string };
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [formData, setFormData] = useState({
    city_id: "",
    type: "flight",
    title: "",
    subtitle: "",
    price_from: 0,
    image_url: "",
    is_featured: false,
    order: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [destinationsResult, citiesResult] = await Promise.all([
        supabase.from("popular_destinations").select("*, cities(name)").order("order", { ascending: true }),
        supabase.from("cities").select("id, name").order("name"),
      ]);

      if (destinationsResult.error) throw destinationsResult.error;
      if (citiesResult.error) throw citiesResult.error;

      setDestinations(destinationsResult.data || []);
      setCities(citiesResult.data || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingDestination) {
        const { error } = await supabase
          .from("popular_destinations")
          .update(formData)
          .eq("id", editingDestination.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("popular_destinations").insert(formData);

        if (error) throw error;
      }

      resetForm();
      loadData();
    } catch (error) {
      console.error("Error saving destination:", error);
      alert("Failed to save destination");
    }
  };

  const handleEdit = (destination: Destination) => {
    setEditingDestination(destination);
    setFormData({
      city_id: destination.city_id || "",
      type: destination.type,
      title: destination.title,
      subtitle: destination.subtitle,
      price_from: destination.price_from,
      image_url: destination.image_url,
      is_featured: destination.is_featured,
      order: destination.order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;

    try {
      const { error } = await supabase.from("popular_destinations").delete().eq("id", id);

      if (error) throw error;
      loadData();
    } catch (error) {
      console.error("Error deleting destination:", error);
      alert("Failed to delete destination");
    }
  };

  const resetForm = () => {
    setFormData({
      city_id: "",
      type: "flight",
      title: "",
      subtitle: "",
      price_from: 0,
      image_url: "",
      is_featured: false,
      order: 0,
    });
    setEditingDestination(null);
    setShowForm(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Popular Destinations</h1>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Destination
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{editingDestination ? "Edit Destination" : "Add New Destination"}</CardTitle>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">City (Optional)</label>
                <Select value={formData.city_id} onValueChange={(value) => setFormData({ ...formData, city_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a city (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No city</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Type</label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flight">Flight</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Jakarta - Bali"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Subtitle</label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g., Round trip flights"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Price From (IDR)</label>
                <Input
                  type="number"
                  value={formData.price_from}
                  onChange={(e) => setFormData({ ...formData, price_from: Number(e.target.value) })}
                  placeholder="850000"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Image URL</label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://images.pexels.com/..."
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Display Order</label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Featured</label>
                  <Switch
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingDestination ? "Update Destination" : "Add Destination"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <Card key={destination.id}>
            <CardContent className="p-4">
              {destination.image_url && (
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    src={destination.image_url}
                    alt={destination.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="mb-2 flex items-center gap-2">
                <span className={`rounded-full px-2 py-1 text-xs ${destination.type === 'flight' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                  {destination.type}
                </span>
                {destination.is_featured && (
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                    Featured
                  </span>
                )}
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">
                  Order: {destination.order}
                </span>
              </div>

              {destination.cities && (
                <div className="mb-2 text-sm text-gray-500">{destination.cities.name}</div>
              )}

              <h3 className="mb-2 text-xl font-bold">{destination.title}</h3>
              <p className="mb-2 text-sm text-gray-600">{destination.subtitle}</p>
              <div className="mb-4 font-bold text-[#dcac56]">
                From IDR {destination.price_from.toLocaleString()}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(destination)}
                  className="gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(destination.id)}
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

      {destinations.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600">No popular destinations found. Add your first destination to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
