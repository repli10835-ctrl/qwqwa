"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, X } from "lucide-react";
import Image from "next/image";

interface City {
  id: string;
  name: string;
}

interface Package {
  id: string;
  city_id: string;
  name: string;
  description: string;
  price: number;
  duration_days: number;
  image_url: string;
  features: string[];
  cities?: { name: string };
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState({
    city_id: "",
    name: "",
    description: "",
    price: 0,
    duration_days: 1,
    image_url: "",
    features: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [packagesResult, citiesResult] = await Promise.all([
        supabase.from("packages").select("*, cities(name)").order("created_at", { ascending: false }),
        supabase.from("cities").select("id, name").order("name"),
      ]);

      if (packagesResult.error) throw packagesResult.error;
      if (citiesResult.error) throw citiesResult.error;

      setPackages(packagesResult.data || []);
      setCities(citiesResult.data || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const features = formData.features.split(",").map((f) => f.trim()).filter(Boolean);
    const packageData = {
      city_id: formData.city_id,
      name: formData.name,
      description: formData.description,
      price: formData.price,
      duration_days: formData.duration_days,
      image_url: formData.image_url,
      features,
    };

    try {
      if (editingPackage) {
        const { error } = await supabase
          .from("packages")
          .update(packageData)
          .eq("id", editingPackage.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("packages").insert(packageData);

        if (error) throw error;
      }

      resetForm();
      loadData();
    } catch (error) {
      console.error("Error saving package:", error);
      alert("Failed to save package");
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      city_id: pkg.city_id,
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      duration_days: pkg.duration_days,
      image_url: pkg.image_url,
      features: pkg.features.join(", "),
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;

    try {
      const { error } = await supabase.from("packages").delete().eq("id", id);

      if (error) throw error;
      loadData();
    } catch (error) {
      console.error("Error deleting package:", error);
      alert("Failed to delete package");
    }
  };

  const resetForm = () => {
    setFormData({
      city_id: "",
      name: "",
      description: "",
      price: 0,
      duration_days: 1,
      image_url: "",
      features: "",
    });
    setEditingPackage(null);
    setShowForm(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Packages</h1>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Package
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{editingPackage ? "Edit Package" : "Add New Package"}</CardTitle>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">City</label>
                <Select value={formData.city_id} onValueChange={(value) => setFormData({ ...formData, city_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Package Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Paket Basic"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Package description"
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Price (IDR)</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="1500000"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Duration (Days)</label>
                  <Input
                    type="number"
                    value={formData.duration_days}
                    onChange={(e) => setFormData({ ...formData, duration_days: Number(e.target.value) })}
                    placeholder="3"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Image URL</label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://images.pexels.com/..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Features (comma separated)</label>
                <Textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Hotel Bintang 3, Sarapan Pagi, Tour Guide"
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingPackage ? "Update Package" : "Add Package"}
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
        {packages.map((pkg) => (
          <Card key={pkg.id}>
            <CardContent className="p-4">
              {pkg.image_url && (
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    src={pkg.image_url}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="mb-2 text-sm text-gray-500">{pkg.cities?.name}</div>
              <h3 className="mb-2 text-xl font-bold">{pkg.name}</h3>
              <p className="mb-2 text-sm text-gray-600">{pkg.description}</p>
              <div className="mb-4 flex items-center gap-4 text-sm">
                <span className="font-bold text-[#dcac56]">
                  IDR {pkg.price.toLocaleString()}
                </span>
                <span className="text-gray-500">{pkg.duration_days} days</span>
              </div>

              <div className="mb-4">
                <div className="text-xs font-semibold uppercase text-gray-500">Features:</div>
                <ul className="mt-1 space-y-1 text-sm">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-600">• {feature}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(pkg)}
                  className="gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(pkg.id)}
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

      {packages.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600">No packages found. Add your first package to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
