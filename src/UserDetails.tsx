import React, { useEffect, useState } from "react";
import { instance } from "./api";
import { SearchUserType } from "./UserList";
import { Timer } from "./Timer";
import { CircularProgress, Typography, Card, CardContent, Avatar, Box } from "@mui/material";

type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}

type UserDetailsPropsType = {
    selectedUser: SearchUserType | null
}

const initialTimer = 10;
const UserDetails: React.FC<UserDetailsPropsType> = ({ selectedUser }) => {
    const [userDetails, setUserDetails] = useState<UserType | null>(null);
    const [timer, setTimer] = useState(initialTimer);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (selectedUser) {
            setIsFetching(true);
            instance.get<UserType>(`users/${selectedUser.login}`).then(res => {
                setTimer(initialTimer);
                setUserDetails(res.data);
                setIsFetching(false);
            });
        }
    }, [selectedUser]);

    useEffect(() => {
        if (timer < 1) setUserDetails(null);
    }, [timer]);

    if (isFetching) {
        return <CircularProgress />;
    }

    return (
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent>
                {userDetails && (
                    <>
                        <Timer initialTimer={timer} onChange={setTimer} userId={userDetails.id} />
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Avatar src={userDetails.avatar_url} alt='avatar' style={{ width: 200, height: 200 }} />
                            <Typography variant="h4">{userDetails.login}</Typography>
                            <Typography variant="body1">Followers: {userDetails.followers}</Typography>
                        </Box>
                    </>
                )}
            </CardContent>
        </Card>
    );
}

export default UserDetails;
