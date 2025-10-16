import { Typography, TextField, Pagination, Box, Container, Button, Skeleton } from '@mui/material';
import { useCompanies } from '../hooks/useCompanies';
import { useState } from 'react';
import { CompanyCard } from '../components/CompanyCard';

export default function Home() {
  const { data, isLoading, error } = useCompanies();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const filtered =
    data?.filter(
      (empresa: any) =>
        empresa.nomeFantasia?.toLowerCase().includes(search.toLowerCase()) ||
        empresa.cnpj.includes(search)
    ) || [];

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const skeletons = Array.from({ length: itemsPerPage }, (_, i) => (
    <Box
      key={i}
      sx={{
        borderRadius: 2,
        p: 2,
        border: '1px solid #e0e0e0',
        boxShadow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Skeleton variant="text" width="60%" height={24} />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="50%" />
    </Box>
  ));

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4, minHeight: '100vh' }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="60vh"
          gap={2}
        >
          <Typography variant="h6" color="error" textAlign="center">
            Erro ao carregar empresas.
          </Typography>
          <Button variant="outlined" onClick={() => window.location.reload()}>
            Tentar novamente
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4, minHeight: '100vh' }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={2}
        mb={3}
      >
        <Typography variant="h4" component="h1">
          Empresas
        </Typography>
        <Button variant="contained" color="primary">
          Cadastrar nova empresa
        </Button>
      </Box>

      <TextField
        label="Buscar por nome ou CNPJ"
        variant="outlined"
        fullWidth
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        gap={3}
        alignItems="stretch"
      >
        {isLoading && skeletons}

        {!isLoading && filtered.length === 0 && (
          <Typography
            variant="body1"
            sx={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              mt: 4,
              color: 'text.secondary',
            }}
          >
            Nenhuma empresa encontrada.
          </Typography>
        )}

        {!isLoading &&
          paginated.map((empresa: any, index: number) => (
            <CompanyCard
              key={`${empresa.cnpj}-${index}`}
              empresa={empresa}
              onClick={() => console.log('Abrir modal para:', empresa.cnpj)}
            />
          ))}
      </Box>

      {!isLoading && totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, val) => setPage(val)}
          sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
        />
      )}
    </Container>
  );
}
