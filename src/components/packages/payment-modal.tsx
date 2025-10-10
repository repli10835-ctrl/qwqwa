'use client';

import { useState } from 'react';
import { Package, City, supabase } from '@/lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Check, CreditCard, Building2 } from 'lucide-react';
import { toast } from 'sonner';

interface PackageWithCity extends Package {
  cities: City;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: PackageWithCity;
}

export default function PaymentModal({ isOpen, onClose, package: pkg }: PaymentModalProps) {
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const bankAccounts = [
    { bank: 'BCA', accountNumber: '1234567890', accountName: 'Travel Indonesia' },
    { bank: 'Mandiri', accountNumber: '0987654321', accountName: 'Travel Indonesia' },
    { bank: 'BNI', accountNumber: '5555666677', accountName: 'Travel Indonesia' },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success('Berhasil disalin!');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error('Mohon lengkapi semua data');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('payments').insert({
        package_id: pkg.id,
        user_name: formData.name,
        user_email: formData.email,
        amount: pkg.price,
        status: 'pending',
      });

      if (error) throw error;

      toast.success('Data berhasil disimpan!');
      setStep('payment');
    } catch (error) {
      console.error('Error creating payment:', error);
      toast.error('Gagal menyimpan data');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('form');
    setFormData({ name: '', email: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {step === 'form' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Informasi Pembeli</DialogTitle>
              <DialogDescription>
                Lengkapi data diri Anda untuk melanjutkan pemesanan
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Detail Paket</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        <span className="font-medium">Paket:</span> {pkg.cities.name} -{' '}
                        {pkg.name}
                      </p>
                      <p>
                        <span className="font-medium">Durasi:</span> {pkg.duration_days} Hari
                      </p>
                      <p className="text-primary font-bold text-lg pt-2">
                        Total: {formatPrice(pkg.price)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Batal
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Memproses...' : 'Lanjut ke Pembayaran'}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <CreditCard className="w-6 h-6" />
                Informasi Pembayaran
              </DialogTitle>
              <DialogDescription>
                Transfer ke salah satu rekening di bawah ini dengan nominal yang sesuai
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <Card className="bg-primary/5">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">Total Pembayaran</p>
                    <p className="text-4xl font-bold text-primary">{formatPrice(pkg.price)}</p>
                    <p className="text-sm text-muted-foreground">
                      untuk {pkg.cities.name} - {pkg.name}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Building2 className="w-4 h-4" />
                  <span>Pilih Rekening Tujuan:</span>
                </div>

                {bankAccounts.map((account, index) => (
                  <Card key={index} className="border-2 hover:border-primary transition-colors">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">{account.bank}</span>
                          <span className="text-sm text-muted-foreground">
                            {account.accountName}
                          </span>
                        </div>

                        <div className="flex items-center justify-between bg-muted p-3 rounded-lg">
                          <span className="font-mono font-semibold text-lg">
                            {account.accountNumber}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              handleCopy(account.accountNumber, `${account.bank}-number`)
                            }
                          >
                            {copiedField === `${account.bank}-number` ? (
                              <Check className="w-4 h-4" style={{ color: '#dcac56' }} />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="pt-6">
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold">Catatan Penting:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Transfer sesuai dengan nominal yang tertera</li>
                      <li>Simpan bukti transfer untuk konfirmasi</li>
                      <li>Pembayaran akan diverifikasi dalam 1x24 jam</li>
                      <li>Hubungi CS kami jika ada kendala</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-primary/30">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <p className="font-semibold text-lg">Konfirmasi Pembayaran</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        Setelah melakukan transfer, silakan hubungi CS kami melalui WhatsApp untuk konfirmasi:
                      </p>
                      <a
                        href="https://wa.me/6281234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline font-semibold"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <span>+62 812-3456-7890</span>
                      </a>
                      <p className="text-xs text-muted-foreground">
                        Kirimkan bukti transfer dan data pemesanan Anda untuk proses verifikasi
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <DialogFooter>
              <Button onClick={handleClose} className="w-full">
                Saya Sudah Transfer
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
