import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function RegisterModal({ open, onClose, onConfirm }: RegisterModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth data-testid="success-modal">
      <DialogTitle>Empresa cadastrada com sucesso!</DialogTitle>
      <DialogContent>
        <Typography variant="body1" color="textSecondary">
          A empresa foi registrada com sucesso no sistema.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} autoFocus variant="contained">
          Voltar para a Home
        </Button>
      </DialogActions>
    </Dialog>
  );
}
