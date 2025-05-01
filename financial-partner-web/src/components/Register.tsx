import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiMutation } from '../hooks/use-mutation';
import { apiClient } from '../lib/api-client';
import * as Form from '@radix-ui/react-form';
import { Label } from '@radix-ui/react-label';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface RegisterResponse {
  message: string;
  id: string;
  name: string;
  email: string;
  phone: string;
}

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const mutation = useApiMutation<RegisterResponse, RegisterFormData>({
    mutationFn: (data) => apiClient.post('/users/register', data).then(res => res.data),
    onSuccess: (data) => {
      toast.success(data.message || 'Cadastro realizado com sucesso!');
      navigate('/login');
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao cadastrar.');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      toast.error('Preencha todos os campos.');
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-800">
      <Toaster position="top-center" richColors />
      <div className="w-[350px] bg-[#555] rounded-lg p-6 flex flex-col items-center shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-white text-xl font-mono tracking-widest" style={{ fontFamily: 'cursive, monospace' }}>
            FINANCIAL PARTNER
          </h1>
          <h2 className="text-white text-2xl mt-2 font-mono tracking-widest" style={{ fontFamily: 'cursive, monospace' }}>
            Register
          </h2>
        </div>
        <Form.Root className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <Form.Field name="name" className="flex flex-col gap-1">
            <Label htmlFor="name" className="text-white text-lg text-center" style={{ fontFamily: 'cursive, monospace' }}>Name</Label>
            <Form.Control asChild>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="rounded-md px-4 py-2 bg-white text-black text-lg text-center focus:outline-none focus:ring-2 focus:ring-green-400"
                value={formData.name}
                onChange={handleChange}
                disabled={mutation.isPending}
                placeholder="Name"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="email" className="flex flex-col gap-1">
            <Label htmlFor="email" className="text-white text-lg text-center" style={{ fontFamily: 'cursive, monospace' }}>E-mail</Label>
            <Form.Control asChild>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rounded-md px-4 py-2 bg-white text-black text-lg text-center focus:outline-none focus:ring-2 focus:ring-green-400"
                value={formData.email}
                onChange={handleChange}
                disabled={mutation.isPending}
                placeholder="E-mail"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="phone" className="flex flex-col gap-1">
            <Label htmlFor="phone" className="text-white text-lg text-center" style={{ fontFamily: 'cursive, monospace' }}>Telefone</Label>
            <Form.Control asChild>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="rounded-md px-4 py-2 bg-white text-black text-lg text-center focus:outline-none focus:ring-2 focus:ring-green-400"
                value={formData.phone}
                onChange={handleChange}
                disabled={mutation.isPending}
                placeholder="Telefone"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="password" className="flex flex-col gap-1">
            <Label htmlFor="password" className="text-white text-lg text-center" style={{ fontFamily: 'cursive, monospace' }}>Senha</Label>
            <Form.Control asChild>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="rounded-md px-4 py-2 bg-white text-black text-lg text-center focus:outline-none focus:ring-2 focus:ring-green-400"
                value={formData.password}
                onChange={handleChange}
                disabled={mutation.isPending}
                placeholder="Senha"
              />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full mt-2 py-2 rounded-md text-white text-xl font-mono bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-60"
              style={{ fontFamily: 'cursive, monospace' }}
            >
              {mutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </div>
  );
}; 