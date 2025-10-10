'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface FlightPackage {
  id: string;
  airline: string;
  flight_number: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  class: string;
  available_seats: number;
  duration: string;
  baggage: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface FlightPackageForm {
  airline: string;
  flight_number: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  class: string;
  available_seats: number;
  duration: string;
  baggage: string;
  is_active: boolean;
}

export default function FlightPackagesPage() {
  const [flightPackages, setFlightPackages] = useState<FlightPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<FlightPackage | null>(null);
  const [formData, setFormData] = useState<FlightPackageForm>({
    airline: '',
    flight_number: '',
    origin: '',
    destination: '',
    departure_time: '',
    arrival_time: '',
    price: 0,
    class: 'economy',
    available_seats: 0,
    duration: '',
    baggage: '20kg',
    is_active: true,
  });

  useEffect(() => {
    fetchFlightPackages();
  }, []);

  const fetchFlightPackages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('flight_packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFlightPackages(data || []);
    } catch (error) {
      console.error('Error fetching flight packages:', error);
      toast.error('Gagal memuat data paket penerbangan');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPackage) {
        const { error } = await supabase
          .from('flight_packages')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingPackage.id);

        if (error) throw error;
        toast.success('Paket penerbangan berhasil diperbarui');
      } else {
        const { error } = await supabase
          .from('flight_packages')
          .insert([formData]);

        if (error) throw error;
        toast.success('Paket penerbangan berhasil ditambahkan');
      }

      setDialogOpen(false);
      resetForm();
      fetchFlightPackages();
    } catch (error) {
      console.error('Error saving flight package:', error);
      toast.error('Gagal menyimpan paket penerbangan');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus paket penerbangan ini?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('flight_packages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Paket penerbangan berhasil dihapus');
      fetchFlightPackages();
    } catch (error) {
      console.error('Error deleting flight package:', error);
      toast.error('Gagal menghapus paket penerbangan');
    }
  };

  const handleEdit = (pkg: FlightPackage) => {
    setEditingPackage(pkg);
    setFormData({
      airline: pkg.airline,
      flight_number: pkg.flight_number,
      origin: pkg.origin,
      destination: pkg.destination,
      departure_time: pkg.departure_time,
      arrival_time: pkg.arrival_time,
      price: pkg.price,
      class: pkg.class,
      available_seats: pkg.available_seats,
      duration: pkg.duration,
      baggage: pkg.baggage,
      is_active: pkg.is_active,
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingPackage(null);
    setFormData({
      airline: '',
      flight_number: '',
      origin: '',
      destination: '',
      departure_time: '',
      arrival_time: '',
      price: 0,
      class: 'economy',
      available_seats: 0,
      duration: '',
      baggage: '20kg',
      is_active: true,
    });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Plane className="h-8 w-8" />
            Kelola Paket Penerbangan
          </h1>
          <p className="text-muted-foreground mt-2">
            Tambah, edit, dan hapus paket penerbangan
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Paket Penerbangan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPackage ? 'Edit Paket Penerbangan' : 'Tambah Paket Penerbangan'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="airline">Maskapai</Label>
                  <Input
                    id="airline"
                    value={formData.airline}
                    onChange={(e) => setFormData({ ...formData, airline: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="flight_number">Nomor Penerbangan</Label>
                  <Input
                    id="flight_number"
                    value={formData.flight_number}
                    onChange={(e) => setFormData({ ...formData, flight_number: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Kota Asal</Label>
                  <Input
                    id="origin"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Kota Tujuan</Label>
                  <Input
                    id="destination"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departure_time">Waktu Keberangkatan</Label>
                  <Input
                    id="departure_time"
                    placeholder="HH:MM"
                    value={formData.departure_time}
                    onChange={(e) => setFormData({ ...formData, departure_time: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arrival_time">Waktu Kedatangan</Label>
                  <Input
                    id="arrival_time"
                    placeholder="HH:MM"
                    value={formData.arrival_time}
                    onChange={(e) => setFormData({ ...formData, arrival_time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Durasi</Label>
                  <Input
                    id="duration"
                    placeholder="2h 30m"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="baggage">Bagasi</Label>
                  <Input
                    id="baggage"
                    placeholder="20kg"
                    value={formData.baggage}
                    onChange={(e) => setFormData({ ...formData, baggage: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Kelas</Label>
                  <Select
                    value={formData.class}
                    onValueChange={(value) => setFormData({ ...formData, class: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="available_seats">Kursi Tersedia</Label>
                  <Input
                    id="available_seats"
                    type="number"
                    value={formData.available_seats}
                    onChange={(e) => setFormData({ ...formData, available_seats: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Harga (Rp)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="is_active">Aktif</Label>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Batal
                </Button>
                <Button type="submit">
                  {editingPackage ? 'Perbarui' : 'Tambah'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Paket Penerbangan</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : flightPackages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Belum ada paket penerbangan. Tambahkan paket penerbangan baru.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Maskapai</TableHead>
                    <TableHead>Nomor</TableHead>
                    <TableHead>Rute</TableHead>
                    <TableHead>Waktu</TableHead>
                    <TableHead>Durasi</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Kursi</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flightPackages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">{pkg.airline}</TableCell>
                      <TableCell>{pkg.flight_number}</TableCell>
                      <TableCell>{pkg.origin} → {pkg.destination}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{pkg.departure_time}</div>
                          <div className="text-muted-foreground">{pkg.arrival_time}</div>
                        </div>
                      </TableCell>
                      <TableCell>{pkg.duration}</TableCell>
                      <TableCell className="capitalize">{pkg.class}</TableCell>
                      <TableCell>{pkg.available_seats}</TableCell>
                      <TableCell>Rp {pkg.price.toLocaleString('id-ID')}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${pkg.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {pkg.is_active ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(pkg)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(pkg.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
