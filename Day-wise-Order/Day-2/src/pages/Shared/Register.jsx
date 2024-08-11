import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const checkIfUserExists = async (email) => {
    try {
      const response = await axios.get('https://in-telli-ventory.onrender.com/users/email', { params: { email } });
      return response.status === 200; // User exists
    } catch (error) {
      if (error.response?.status === 404) {
        return false; // User does not exist
      }
      throw new Error('Error checking user existence');
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError('');

    try {
      const userExists = await checkIfUserExists(email);
      if (userExists) {
        setError('User already exists');
        setLoading(false);
        return;
      }

      const response = await axios.post('https://in-telli-ventory.onrender.com/users', { firstname, lastname, email, password });
      console.log('Registration successful:', response.data);
      // Redirect to login page or handle successful registration
    } catch (error) {
      console.error('Registration failed:', error.message || 'An error occurred');
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-28">
      <Card className="w-1/4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Enter your details below to create your account</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstname">First Name</Label>
            <Input id="firstname" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastname">Last Name</Label>
            <Input id="lastname" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="user@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <div className="text-red-500">{error}</div>}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleRegister} disabled={loading}>
            {loading ? 'Registering...' : 'Create account'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
