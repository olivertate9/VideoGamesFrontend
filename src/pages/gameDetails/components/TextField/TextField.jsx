import TextFieldMUI from '@mui/material/TextField';

function TextField({ name, value, label, onChange, error, helperText }) {
    return (
        <TextFieldMUI
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
        />
    );
}

export default TextField;