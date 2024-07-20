import React, { useEffect, useState } from "react";
import { TextField, Button, Box } from '@mui/material';

type SearchFormPropsType = {
    value: string
    onSubmit: (searchTerm: string) => void
}
export const SearchForm = (props: SearchFormPropsType) => {
    let [tempSearch, setTempSearch] = useState('');

    useEffect(() => {
        setTempSearch(props.value);
    }, [props.value]);

    return (
        <Box display="flex" alignItems="center">
            <TextField
                variant="outlined"
                placeholder='Search'
                value={tempSearch}
                onChange={(e) => setTempSearch(e.currentTarget.value)}
                margin="normal"
                size="small"
                style={{ flexGrow: 1, marginRight: '8px' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => props.onSubmit(tempSearch)}
                size="small"
            >
                Find
            </Button>
        </Box>
    );
}
