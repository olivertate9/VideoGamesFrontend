import React from 'react';
import Dialog from '../Dialog';
import DialogActions from '../DialogActions';
import DialogContent from '../DialogContent';
import DialogContentText from '../DialogContentText';
import DialogTitle from '../DialogTitle';
import Button from '../Button';
import {useIntl} from "react-intl";

function DeleteDialog({
                          open,
                          onClose,
                          gameTitle,
                          onConfirm,
                          isDeleting = false,
                          errorMessage = '',
                          ariaLabelledBy,
                          ariaDescribedBy,
                      }) {
    const {formatMessage} = useIntl();

    const handleClose = () => {
        onClose(false, '');
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            isDeleting={isDeleting}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
        >
            <DialogTitle id={ariaLabelledBy}>{formatMessage({id: 'delete-game-question'})}</DialogTitle>
            <DialogContent>
                {errorMessage ? (
                    <DialogContentText id={ariaDescribedBy} color="error">
                        {errorMessage}
                    </DialogContentText>
                ) : (
                    <DialogContentText id={ariaDescribedBy}>
                        {formatMessage({ id: 'question-sure' })} "{gameTitle}"?
                    </DialogContentText>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{formatMessage({id: 'cancel-deletion'})}</Button>
                <Button onClick={onConfirm} autoFocus disabled={isDeleting}>
                    {formatMessage({id: 'confirm-deletion'})}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDialog;