import SnackbarMUI from '@mui/material/Snackbar';

function Snackbar({open, autoHideDuration, onClose, message}) {
    return (
        <SnackbarMUI
            open={open}
            autoHideDuration={autoHideDuration}
            message={message}
            onClose={onClose}
        />
    );
}

export default Snackbar;