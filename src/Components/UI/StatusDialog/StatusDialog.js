import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function StatusDialog({ 
  open, 
  onClose, 
  title, 
  message, 
  isError 
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isError ? "خطأ في الحجز" : "نجاح"}</DialogTitle>
      <DialogContent dividers>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          إغلاق
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StatusDialog;