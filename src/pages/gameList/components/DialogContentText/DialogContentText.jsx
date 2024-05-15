import DialogContentTextMUI from '@mui/material/DialogContentText';

function DialogContentText({ id, children }) {
    return (
        <DialogContentTextMUI id={id}>
            {children}
        </DialogContentTextMUI>
    );
}

export default DialogContentText;