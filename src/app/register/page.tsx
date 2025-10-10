import HeaderNavigation from "@/components/sections/header-navigation";
import Footer from "@/components/sections/footer";
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderNavigation />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <RegisterForm />
      </main>

      <Footer />
    </div>
  );
}