import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button } from '@shadcn/ui';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
        />
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Button type="submit">Login</Button>
      </form>
    </Card>
  );
};

export default Login;
