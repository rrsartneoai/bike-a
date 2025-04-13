import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from 'utils/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const { resetPassword, loading } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    const { error } = await resetPassword(email);
    
    if (error) {
      toast.error('Password reset failed', {
        description: error.message,
      });
    } else {
      setIsSubmitted(true);
      toast.success('Password reset email sent', {
        description: 'Check your email for instructions to reset your password.',
      });
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
            {isSubmitted 
              ? 'Check your email for reset instructions' 
              : 'Enter your email to receive password reset instructions'}
          </p>
        </div>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={error ? 'border-destructive' : ''}
                  placeholder="youremail@example.com"
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
                    Sending reset email...
                  </div>
                ) : (
                  'Send reset instructions'
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="p-4 bg-primary/10 rounded-md text-center">
              <p>We've sent reset instructions to <strong>{email}</strong></p>
              <p className="mt-2 text-sm text-muted-foreground">If you don't see the email, check your spam folder.</p>
            </div>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setIsSubmitted(false)}
            >
              Try a different email
            </Button>
          </div>
        )}
        
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Remember your password?{' '}
            <Link to="/login" className="text-primary hover:text-primary/90 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
      {/* Amsterdam-inspired curved decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-70"></div>
    </div>
  );
}
