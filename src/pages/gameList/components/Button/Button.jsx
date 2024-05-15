import ButtonMUI from '@mui/material/Button';

function Button({ onClick, children, variant }) {
    return (
        <ButtonMUI
            onClick={onClick}
            variant={variant}
        >
            {children}
        </ButtonMUI>
    );
}

export default Button;