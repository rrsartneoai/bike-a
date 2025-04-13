import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from 'utils/authStore';
import { supabase } from 'utils/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // If already logged in, redirect to profile
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  // Check if we have a hash from the reset link
  const hasResetToken = location.hash && location.hash.length > 1;

  const validateForm = () => {
    if (!password) {
      setError('Password is required');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Use updateUser method to set new password
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        setError(error.message);
        toast.error('Password reset failed', {
          description: error.message,
        });
      } else {
        setSuccess(true);
        toast.success('Password updated successfully', {
          description: 'You can now login with your new password.',
        });
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg
              viewBox="0 0 24 24"
              className="h-10 w-10 text-primary"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="1 3"
              />
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Reset your password</h2>
          <p className="text-muted-foreground mt-2">
            {success 
              ? 'Your password has been reset successfully.' 
              : 'Create a new password for your account'}
          </p>
        </div>
        
        {!hasResetToken && !success ? (
          <div className="mt-8 p-4 bg-destructive/10 rounded-md text-center">
            <p>Invalid or expired reset link. Please request a new password reset.</p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => navigate('/forgot-password')}
            >
              Request new reset link
            </Button>
          </div>
        ) : !success ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  New Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={error ? 'border-destructive' : ''}
                  placeholder="••••••••"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium">
                  Confirm New Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={error ? 'border-destructive' : ''}
                  placeholder="••••••••"
                />
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                    Updating password...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="p-4 bg-primary/10 rounded-md text-center">
              <p>Your password has been reset successfully.</p>
              <p className="mt-2 text-sm text-muted-foreground">You'll be redirected to the login page shortly.</p>
            </div>
            <Button 
              variant="default" 
              className="w-full" 
              onClick={() => navigate('/login')}
            >
              Go to Login
            </Button>
          </div>
        )}
      </div>
      
      {/* Amsterdam-inspired curved decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-70"></div>
    </div>
  );
}
