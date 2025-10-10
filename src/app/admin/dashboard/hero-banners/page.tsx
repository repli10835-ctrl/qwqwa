"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, X } from "lucide-react";
import Image from "next/image";

interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  background_image: string;
  cta_text: string;
  cta_link: string;
  is_active: boolean;
  order: number;
}

export default function HeroBannersPage() {
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState<HeroBanner | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    background_image: "",
    cta_text: "Learn More",
    cta_link: "/",
    is_active: true,
    order: 0,
  });

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const { data, error } = await supabase
        .from("hero_banners")
        .select("*")
        .order("order", { ascending: true });

      if (error) throw error;
      setBanners(data || []);
    } catch (error) {
      console.error("Error loading banners:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingBanner) {
        const { error } = await supabase
          .from("hero_banners")
          .update(formData)
          .eq("id", editingBanner.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("hero_banners").insert(formData);

        if (error) throw error;
      }

      resetForm();
      loadBanners();
    } catch (error) {
      console.error("Error saving banner:", error);
      alert("Failed to save banner");
    }
  };

  const handleEdit = (banner: HeroBanner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      description: banner.description,
      background_image: banner.background_image,
      cta_text: banner.cta_text,
      cta_link: banner.cta_link,
      is_active: banner.is_active,
      order: banner.order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;

    try {
      const { error } = await supabase.from("hero_banners").delete().eq("id", id);

      if (error) throw error;
      loadBanners();
    } catch (error) {
      console.error("Error deleting banner:", error);
      alert("Failed to delete banner");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      background_image: "",
      cta_text: "Learn More",
      cta_link: "/",
      is_active: true,
      order: 0,
    });
    setEditingBanner(null);
    setShowForm(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Hero Banners</h1>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Banner
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{editingBanner ? "Edit Hero Banner" : "Add New Hero Banner"}</CardTitle>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Helping Others"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Subtitle</label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g., Live & Travel"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Banner description"
                  rows={3}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Background Image URL</label>
                <Input
                  value={formData.background_image}
                  onChange={(e) => setFormData({ ...formData, background_image: e.target.value })}
                  placeholder="https://images.pexels.com/..."
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">CTA Text</label>
                  <Input
                    value={formData.cta_text}
                    onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                    placeholder="Book Now"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">CTA Link</label>
                  <Input
                    value={formData.cta_link}
                    onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                    placeholder="/packages"
                  />
                </div>
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
                  <label className="text-sm font-medium">Active</label>
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingBanner ? "Update Banner" : "Add Banner"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {banners.map((banner) => (
          <Card key={banner.id}>
            <CardContent className="p-4">
              <div className="grid gap-4 md:grid-cols-[200px_1fr]">
                {banner.background_image && (
                  <div className="relative h-32 w-full overflow-hidden rounded-lg">
                    <Image
                      src={banner.background_image}
                      alt={banner.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div>
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{banner.title}</h3>
                      {banner.subtitle && (
                        <p className="text-sm text-gray-500">{banner.subtitle}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-1 text-xs ${banner.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {banner.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                        Order: {banner.order}
                      </span>
                    </div>
                  </div>
                  <p className="mb-2 text-sm text-gray-600">{banner.description}</p>
                  <div className="mb-4 text-sm text-gray-500">
                    CTA: {banner.cta_text} → {banner.cta_link}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(banner)}
                      className="gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(banner.id)}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {banners.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600">No hero banners found. Add your first banner to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
