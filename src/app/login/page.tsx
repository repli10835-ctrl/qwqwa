import HeaderNavigation from "@/components/sections/header-navigation";
import Footer from "@/components/sections/footer";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderNavigation />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <LoginForm />
      </main>

      <Footer />
    </div>
  );
}