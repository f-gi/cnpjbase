export function formatCnpjInput(cnpj: string): string {
    return cnpj
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18);
  }
  
  export function formatCnpjForApi(cnpj: string): string {
    return cnpj.replace(/\D/g, '');
  }
  