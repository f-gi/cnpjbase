import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCompanyRevenue } from '../hooks/useCompanyRevenue';

interface RevenueModalProps {
  cnpj: string | null;
  open: boolean;
  onClose: () => void;
}

export function RevenueModal({ cnpj, open, onClose }: RevenueModalProps) {
  const { data, isLoading, error } = useCompanyRevenue(cnpj || '');

  const formattedRevenue = data?.valor_rendimento?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pr: 2,
        }}
      >
        Rendimento Atual
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {isLoading && (
          <Box display="flex" justifyContent="center" alignItems="center" py={4}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" textAlign="center" py={2}>
            Erro ao buscar rendimento da empresa.
          </Typography>
        )}

        {!isLoading && !error && (
          <Typography variant="h5" fontWeight="bold" textAlign="center" py={2} color="primary.main">
            {formattedRevenue}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}
