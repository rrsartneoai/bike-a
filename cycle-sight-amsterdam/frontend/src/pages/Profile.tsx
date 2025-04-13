import { useState, useEffect, startTransition } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from 'utils/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Profile() {
  const { user, loading, updateProfile } = useAuthStore();
  
  const [username, setUsername] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  
  // If no user is logged in, redirect to login page
  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }
  
  // Get initials for avatar fallback
  const getInitials = () => {
    if (!user?.email) return '??';
    const parts = user.email.split('@');
    if (parts.length > 0) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return 'U';
  };
  
  // Get username from user metadata
  useEffect(() => {
    if (user) {
      // TypeScript cast to access user metadata
      const userMeta = user.user_metadata as { username?: string };
      setUsername(userMeta?.username || '');
    }
  }, [user]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    startTransition(() => {
      setIsUpdating(true);
    
      updateProfile({ username })
        .then(({ error }) => {
          if (error) {
            toast.error('Update failed', {
              description: error.message,
            });
          } else {
            toast.success('Profile updated', {
              description: 'Your profile has been updated successfully.',
            });
          }
        })
        .catch(error => {
          toast.error('An unexpected error occurred');
        })
        .finally(() => {
          setIsUpdating(false);
        });
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 pt-20">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          {/* Profile Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src="" alt={user?.email || 'User'} />
                <AvatarFallback className="text-3xl">{getInitials()}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{username || 'User'}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </CardContent>
          </Card>
          
          {/* Edit Profile Form */}
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your username"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-muted/50"
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  disabled={isUpdating}
                  className="w-full md:w-auto"
                >
                  {isUpdating ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                      Updating...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        
        {/* Amsterdam-inspired curved decorative element */}
        <div className="mt-10 relative">
          <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-70 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
