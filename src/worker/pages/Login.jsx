import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { Leaf, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    let role = null;
    if (email.includes('worker')) role = 'worker';
    else if (email.includes('employer')) role = 'employer';
    else if (email.includes('admin')) role = 'admin';

    if (role && login(role)) {
      navigate('/worker/dashboard');
    } else {
      setError('Invalid credentials. Use worker@kaarya.demo, employer@kaarya.demo, or admin@kaarya.demo');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center mb-8">
        <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-xl text-primary-700 dark:text-primary-500 mb-4">
          <Leaf className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Log in to your Kaarya account</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              placeholder="worker@kaarya.demo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              required
            />
            
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            <Button type="submit" fullWidth className="mt-6">
              Log In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/worker/register" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
              Register now
            </Link>
          </div>
          
          <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-500 dark:text-slate-400">
            <p className="font-medium mb-1">Demo Accounts:</p>
            <ul className="space-y-1">
              <li>Worker: worker@kaarya.demo</li>
              <li>Employer: employer@kaarya.demo</li>
              <li>Admin: admin@kaarya.demo</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
