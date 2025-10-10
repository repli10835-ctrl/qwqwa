"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Package, MapPin, Star, DollarSign } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalCities: 0,
    totalPackages: 0,
    totalReviews: 0,
    totalPayments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [citiesResult, packagesResult, reviewsResult, paymentsResult] = await Promise.all([
        supabase.from("cities").select("id", { count: "exact", head: true }),
        supabase.from("packages").select("id", { count: "exact", head: true }),
        supabase.from("customer_reviews").select("id", { count: "exact", head: true }),
        supabase.from("payments").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        totalCities: citiesResult.count || 0,
        totalPackages: packagesResult.count || 0,
        totalReviews: reviewsResult.count || 0,
        totalPayments: paymentsResult.count || 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Cities",
      value: stats.totalCities,
      icon: MapPin,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Packages",
      value: stats.totalPackages,
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Reviews",
      value: stats.totalReviews,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Total Payments",
      value: stats.totalPayments,
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Dashboard Overview</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-full p-2 ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Welcome to Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Use the sidebar navigation to manage cities, packages, hero banners, reviews, and popular destinations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
