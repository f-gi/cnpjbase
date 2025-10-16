import axios from 'axios';

export async function fetchAddressByCep(cep: string) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  } catch (error) {
    console.error('[fetchAddressByCep] Error fetching address:', error);
    throw new Error('Erro ao buscar endereço pelo CEP');
  }
}
