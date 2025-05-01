import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient, handleApiError } from '../lib/api-client';
import { toast } from 'react-hot-toast';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Preencha todos os campos corretamente');
      return;
    }

    try {
      const response = await apiClient.post('/auth/login', formData);
      localStorage.setItem('auth_token', response.data.access_token);
      toast.success(response.data.message || 'Login realizado com sucesso');
      navigate('/saving-jars');
    } catch (error) {
      const apiError = handleApiError(error);
      toast.error(apiError.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-800">
      <div className="w-full max-w-xs sm:max-w-sm bg-neutral-700 rounded-lg shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-2xl mb-8 text-white text-center font-handwritten tracking-widest select-none">
          FINANCIAL PARTNER<br />LOGIN
        </h1>
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-3 rounded-md bg-white text-black text-lg font-bold placeholder-black placeholder-opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              style={{ letterSpacing: '0.5px' }}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-4 py-3 rounded-md bg-white text-black text-lg font-bold placeholder-black placeholder-opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              style={{ letterSpacing: '0.5px' }}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-green-600 hover:bg-green-700 text-white text-lg font-bold transition-colors"
          >
            Login
          </button>
        </form>
      </div>
      <style>{`
        .font-handwritten {
          font-family: 'Caveat', 'Comic Sans MS', cursive, sans-serif;
          font-size: 2rem;
        }
      `}</style>
    </div>
  );
}; 