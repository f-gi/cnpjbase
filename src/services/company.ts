import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
});

export const getCompanies = async () => {
  try {
    const response = await api.get('/companies');
    return response.data;
  } catch (error) {
    console.error('[getCompanies] Erro ao buscar empresas:', error);
    throw new Error('Erro ao buscar empresas');
  }
};

export const getCompanyRevenue = async (cnpj: string) => {
  try {
    const cleanCnpj = cnpj.replace(/\D/g, '');
    const response = await api.get(`/companies/cnpj/${cleanCnpj}`);
    return response.data;
  } catch (error) {
    console.error('[getCompanyRevenue] Erro ao buscar receita:', error);
    throw new Error('Erro ao buscar rendimento da empresa');
  }
};
