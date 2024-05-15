import DialogMUI from '@mui/material/Dialog';

function Dialog({
                    open,
                    onClose,
                    ariaLabelledBy,
                    ariaDescribedBy,
                    children,
                }) {
    return (
        <DialogMUI open={open}
                   onClose={onClose}
                   aria-labelledby={ariaLabelledBy}
                   aria-describedby={ariaDescribedBy}
        >
            {children}
        </DialogMUI>
    );
}

export default Dialog;