import React, { useState } from 'react';
import {useIntl} from "react-intl";
import Button from "../Button";
import Grid from "../../../gameDetails/components/Grid";
import TextField from "../../../gameDetails/components/TextField";

function FilterForm({ filters, setFilters }) {
    const {formatMessage} = useIntl();
    const [showFilters, setShowFilters] = useState(false);
    const [localFilters, setLocalFilters] = useState(filters);

    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleInputChange = (event) => {
        setLocalFilters({
            ...localFilters,
            [event.target.name]: event.target.value,
        });
    };

    const handleApplyFilters = () => {
        setFilters(localFilters);
        localStorage.setItem('gameListFilters', JSON.stringify(localFilters));
    };

    return (
        <div>
            <Button variant="contained" onClick={handleToggleFilters}>
                {formatMessage({id: 'filter'})}
            </Button>
            {showFilters && (
                <Grid container justify-content="space-around" spacing={3}>
                    <Grid item xs={6}>
                        <TextField
                            name="developerId"
                            label={formatMessage({id: 'dev-id'})}
                            value={localFilters.developerId}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="yearReleased"
                            label={formatMessage({id: 'year-released'})}
                            value={localFilters.yearReleased}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" onClick={handleApplyFilters}>
                            {formatMessage({id: 'apply-filters'})}
                        </Button>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

export default FilterForm;
