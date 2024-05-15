import DialogContentMUI from '@mui/material/DialogContent';

function DialogContent({children}) {
    return(
        <DialogContentMUI>
            {children}
        </DialogContentMUI>
    );
}

export default DialogContent;