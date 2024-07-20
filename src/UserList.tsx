import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { instance } from "./api";

type SearchResultType = {
    items: Array<SearchUserType>
}
export type SearchUserType = {
    login: string
    id: number
    avatar_url: string
}

type UserListPropsType = {
    searchTerm: string
    selectedUser: SearchUserType | null
    setSelectedUser: (user: SearchUserType | null) => void
}
const UserList: React.FC<UserListPropsType> = ({ searchTerm, selectedUser, setSelectedUser }) => {
    const [users, setUsers] = useState<Array<SearchUserType>>([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        instance.get<SearchResultType>(`search/users?q=${searchTerm}`).then(res => {
            setUsers(res.data.items);
            setIsFetching(false);
        });
        return () => {
            setSelectedUser(null)
        }
    }, [searchTerm]);

    return (
        <Box>
            {isFetching ? <CircularProgress /> :
                <List>
                    {users.map(u => (
                        <ListItem
                            key={u.id}
                            selected={selectedUser?.id === u.id}
                            onClick={() => setSelectedUser(u)}
                            button
                        >
                            <ListItemAvatar>
                                <Avatar src={u.avatar_url} />
                            </ListItemAvatar>
                            <ListItemText primary={u.login} />
                        </ListItem>
                    ))}
                </List>
            }
        </Box>
    );
}

export default UserList;
