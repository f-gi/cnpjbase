import { useQuery } from '@tanstack/react-query';
import { getCompanyRevenue } from '../services/company';

export function useCompanyRevenue(cnpj: string) {
  return useQuery({
    queryKey: ['revenue', cnpj],
    queryFn: () => getCompanyRevenue(cnpj),
    enabled: !!cnpj,
  });
}
