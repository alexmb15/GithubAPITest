import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, AppBar, Toolbar, Typography, Grid, Button, Box } from '@mui/material';
import UserList, { SearchUserType } from "./UserList";
import { SearchForm } from "./SearchForm";
import UserDetails from "./UserDetails";

function GitHubApp() {
    const initialValue = 'alexmb';
    let [searchTerm, setSearchTerm] = useState(initialValue);
    let [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login;
        }
    }, [selectedUser]);

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">GitHub API Test</Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: 20, display: 'flex', height: 'calc(100vh - 64px)', flexDirection: 'column' }}>
                <Box style={{ flexShrink: 0, position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white' }}>
                    <Box display="flex" alignItems="center">
                        <SearchForm value={searchTerm} onSubmit={setSearchTerm} />
                        <Button variant="contained"
                                color="primary"
                                onClick={() => {
                                    setSelectedUser(null)
                                    setSearchTerm(initialValue)}
                                }
                                size="small"
                                style={{ marginLeft: '8px' }}> Reset
                        </Button>
                    </Box>
                </Box>
                <Grid container spacing={3} style={{ flexGrow: 1, overflow: 'hidden' }}>
                    <Grid item xs={12} md={4} style={{ overflowY: 'auto', height: '100%' }}>
                        <UserList searchTerm={searchTerm} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                    </Grid>
                    <Grid item xs={12} md={8} style={{ overflowY: 'auto', height: '100%' }}>
                        <UserDetails selectedUser={selectedUser} />
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default GitHubApp;
