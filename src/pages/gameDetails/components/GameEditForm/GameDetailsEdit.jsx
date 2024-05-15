import TextField from "../TextField";
import Button from "../Button";
import {useIntl} from "react-intl";
import Grid from "../Grid";

function GameDetailsEdit({editingGameData, errors, onChange, onSave, onCancel}) {
    const {formatMessage} = useIntl();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    name="title"
                    label={formatMessage({ id: 'label-title' })}
                    value={editingGameData.title}
                    onChange={onChange}
                    error={!!errors.title}
                    helperText={errors.title}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    name="yearReleased"
                    label={formatMessage({ id: 'label-year' })}
                    value={editingGameData.yearReleased}
                    onChange={onChange}
                    error={!!errors.yearReleased}
                    helperText={errors.yearReleased}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    name="genre"
                    label={formatMessage({ id: 'label-genre' })}
                    value={editingGameData.genre}
                    onChange={onChange}
                    error={!!errors.genre}
                    helperText={errors.genre}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    name="developer"
                    label={formatMessage({ id: 'label-dev' })}
                    value={editingGameData.developer?.name}
                    onChange={onChange}
                    error={!!errors.developer?.name}
                    helperText={errors.developer?.name}
                />
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" color="primary" onClick={onSave}>{formatMessage({ id: 'save' })}</Button>
            </Grid>
            <Grid item xs={2}>
                <Button variant="outlined" onClick={onCancel}>{formatMessage({ id: 'cancel' })}</Button>
            </Grid>
        </Grid>
    );
}

export default GameDetailsEdit;
