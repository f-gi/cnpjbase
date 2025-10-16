import { Card, CardContent, Typography } from '@mui/material';

interface CompanyCardProps {
  empresa: any;
  onClick: () => void;
}

export function CompanyCard({ empresa, onClick }: CompanyCardProps) {
  return (
    <Card
      onClick={onClick}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" noWrap gutterBottom>
          {empresa.nomeFantasia || 'Sem nome'}
        </Typography>
        <Typography variant="body2" noWrap>
          {empresa.razaoSocial || 'Sem razão social'}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          CNPJ: {empresa.cnpj}
        </Typography>
        <Typography variant="body2">
          {empresa.municipio} - {empresa.estado}
        </Typography>
      </CardContent>
    </Card>
  );
}
