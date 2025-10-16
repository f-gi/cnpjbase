import axios from 'axios';

export async function fetchCompanyByCnpj(cnpj: string) {
  try {
    const response = await axios.post(
      'https://api.arkmeds.com/cnpj',
      { cnpj },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('[fetchCompanyByCnpj] Erro ao buscar CNPJ:', error);
    throw new Error('Erro ao buscar dados da empresa pelo CNPJ');
  }
}
