import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCompanyByCnpj } from '../services/cnpj';
import { fetchAddressByCep } from '../services/viacep';
import { registerCompany } from '../services/company';
import { isValidCnpj } from '../utils/validateCnpj';
import { formatCnpjInput } from '../utils/cnpjMask';
import { RegisterModal } from '../components/RegisterModal';

const initialForm = {
  cnpj: '',
  razaoSocial: '',
  nomeFantasia: '',
  cep: '',
  estado: '',
  municipio: '',
  logradouro: '',
  numero: '',
  complemento: '',
};

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'cnpj') updatedValue = formatCnpjInput(value);
    setForm(prev => ({ ...prev, [name]: updatedValue }));
  };

  const handleCnpjBlur = async () => {
    const cleanCnpj = form.cnpj.replace(/\D/g, '');
    if (cleanCnpj.length !== 14 || !isValidCnpj(cleanCnpj)) return;
    try {
      const data = await fetchCompanyByCnpj(cleanCnpj);
      setForm(prev => ({ ...prev, ...data, estado: data.uf }));
    } catch {
      // Silencia erro
    }
  };

  const handleCepBlur = async () => {
    const cleanCep = form.cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;
    try {
      const data = await fetchAddressByCep(cleanCep);
      setForm(prev => ({
        ...prev,
        logradouro: data.logradouro || prev.logradouro,
        municipio: data.localidade || prev.municipio,
        estado: data.uf || prev.estado,
      }));
    } catch {
      // Silencia erro
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const cleanCnpj = form.cnpj.replace(/\D/g, '');

    if (!cleanCnpj || !isValidCnpj(cleanCnpj)) errs.cnpj = 'CNPJ inválido';

    if (!form.razaoSocial.trim()) errs.razaoSocial = 'Razão Social obrigatória';
    else if (form.razaoSocial.length > 100) errs.razaoSocial = 'Máximo de 100 caracteres';

    if (!form.nomeFantasia.trim()) errs.nomeFantasia = 'Nome Fantasia obrigatória';
    else if (form.nomeFantasia.length > 100) errs.nomeFantasia = 'Máximo de 100 caracteres';

    const cleanCep = form.cep.replace(/\D/g, '');
    if (!cleanCep) errs.cep = 'CEP obrigatório';
    else if (!/^\d{8}$/.test(cleanCep)) errs.cep = 'CEP inválido';

    if (!form.estado.trim()) errs.estado = 'Estado obrigatório';
    else if (!/^[A-Z]{2}$/i.test(form.estado)) errs.estado = 'Deve conter 2 letras (ex: SP)';

    if (!form.municipio.trim()) errs.municipio = 'Município obrigatório';
    else if (!/^[A-Za-zÀ-ÿ\s]{2,100}$/.test(form.municipio)) errs.municipio = 'Município inválido';

    if (!form.numero.trim()) errs.numero = 'Número obrigatório';
    else if (!/^\d+$/.test(form.numero)) errs.numero = 'Somente números';

    if (form.logradouro.length > 100) errs.logradouro = 'Máximo de 100 caracteres';
    if (form.complemento.length > 300) errs.complemento = 'Máximo de 300 caracteres';

    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      setLoading(true);
      const payload = { ...form };
      await registerCompany(payload);
      setSuccess(true);
    } catch (err: any) {
      if (err?.response?.status === 403) setApiError('CNPJ não permitido para cadastro.');
      else setApiError('Erro ao cadastrar empresa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" mb={3}>
        Cadastrar nova empresa
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="grid" gap={2}>
          <TextField
            name="cnpj"
            label="CNPJ"
            fullWidth
            inputProps={{ maxLength: 18 }}
            value={form.cnpj}
            onChange={handleChange}
            onBlur={handleCnpjBlur}
            error={!!errors.cnpj}
            helperText={errors.cnpj}
          />
          <TextField
            name="razaoSocial"
            label="Razão Social"
            fullWidth
            inputProps={{ maxLength: 100 }}
            value={form.razaoSocial}
            onChange={handleChange}
            error={!!errors.razaoSocial}
            helperText={errors.razaoSocial}
          />
          <TextField
            name="nomeFantasia"
            label="Nome Fantasia"
            fullWidth
            inputProps={{ maxLength: 100 }}
            value={form.nomeFantasia}
            onChange={handleChange}
            error={!!errors.nomeFantasia}
            helperText={errors.nomeFantasia}
          />
          <Box display="flex" gap={2}>
            <TextField
              name="cep"
              label="CEP"
              fullWidth
              inputProps={{ maxLength: 9 }}
              value={form.cep}
              onChange={handleChange}
              onBlur={handleCepBlur}
              error={!!errors.cep}
              helperText={errors.cep}
            />
            <TextField
              name="estado"
              label="Estado"
              fullWidth
              inputProps={{ maxLength: 2 }}
              value={form.estado}
              onChange={handleChange}
              error={!!errors.estado}
              helperText={errors.estado}
            />
            <TextField
              name="municipio"
              label="Município"
              fullWidth
              inputProps={{ maxLength: 100 }}
              value={form.municipio}
              onChange={handleChange}
              error={!!errors.municipio}
              helperText={errors.municipio}
            />
          </Box>
          <TextField
            name="logradouro"
            label="Logradouro"
            fullWidth
            inputProps={{ maxLength: 100 }}
            value={form.logradouro}
            onChange={handleChange}
          />
          <Box display="flex" gap={2}>
            <TextField
              name="numero"
              label="Número"
              fullWidth
              inputProps={{ maxLength: 10 }}
              value={form.numero}
              onChange={handleChange}
              error={!!errors.numero}
              helperText={errors.numero}
            />
            <TextField
              name="complemento"
              label="Complemento"
              fullWidth
              inputProps={{ maxLength: 300 }}
              value={form.complemento}
              onChange={handleChange}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={() => navigate('/')}>
              Voltar
            </Button>
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Cadastrar'}
            </Button>
          </Box>
          {apiError && (
            <Alert severity="error" onClose={() => setApiError('')}>
              {apiError}
            </Alert>
          )}
        </Box>
      </form>

      <RegisterModal
        open={success}
        onClose={() => setSuccess(false)}
        onConfirm={() => navigate('/')}
      />
    </Container>
  );
}
