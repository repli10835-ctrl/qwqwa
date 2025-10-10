"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, X } from "lucide-react";
import Image from "next/image";

interface City {
  id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
}

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
  });

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      const { data, error } = await supabase
        .from("cities")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCities(data || []);
    } catch (error) {
      console.error("Error loading cities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCity) {
        const { error } = await supabase
          .from("cities")
          .update(formData)
          .eq("id", editingCity.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("cities").insert(formData);

        if (error) throw error;
      }

      resetForm();
      loadCities();
    } catch (error) {
      console.error("Error saving city:", error);
      alert("Failed to save city");
    }
  };

  const handleEdit = (city: City) => {
    setEditingCity(city);
    setFormData({
      name: city.name,
      description: city.description,
      image_url: city.image_url,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this city?")) return;

    try {
      const { error } = await supabase.from("cities").delete().eq("id", id);

      if (error) throw error;
      loadCities();
    } catch (error) {
      console.error("Error deleting city:", error);
      alert("Failed to delete city");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", image_url: "" });
    setEditingCity(null);
    setShowForm(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Cities</h1>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add City
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{editingCity ? "Edit City" : "Add New City"}</CardTitle>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">City Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Jakarta"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="City description"
                  rows={3}
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

              <div className="flex gap-2">
                <Button type="submit">
                  {editingCity ? "Update City" : "Add City"}
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
        {cities.map((city) => (
          <Card key={city.id}>
            <CardContent className="p-4">
              {city.image_url && (
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    src={city.image_url}
                    alt={city.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="mb-2 text-xl font-bold">{city.name}</h3>
              <p className="mb-4 text-sm text-gray-600">{city.description}</p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(city)}
                  className="gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(city.id)}
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

      {cities.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600">No cities found. Add your first city to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
