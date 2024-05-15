import DialogTitleMUI from '@mui/material/DialogTitle';

function DialogTitle({ id, children }) {
    return (
        <DialogTitleMUI id={id}>
            {children}
        </DialogTitleMUI>
    );
}

export default DialogTitle;