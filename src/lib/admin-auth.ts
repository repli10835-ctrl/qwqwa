import { supabase } from './supabase';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; error?: string; user?: AdminUser }> {
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An error occurred during login' };
  }
}

export async function registerAdmin(email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/admin/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'An error occurred during registration' };
  }
}

export async function logoutAdmin(): Promise<void> {
  await supabase.auth.signOut();
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return null;
    }

    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id, email, name, role')
      .eq('email', session.user.email)
      .maybeSingle();

    return adminUser;
  } catch (error) {
    console.error('Get current admin error:', error);
    return null;
  }
}
