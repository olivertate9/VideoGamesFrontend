import IconButtonMUI from '@mui/material/IconButton';

function IconButton({ ariaLabel, children, onClick }) {
    return(
        <IconButtonMUI aria-label={ariaLabel} onClick={onClick}>
            {children}
        </IconButtonMUI>
    );
}

export default IconButton;