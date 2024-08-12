import { UserData } from "./api";
import { authService } from "./auth";

const getUserData = async () => {
    try {
        const email = authService.getUserEmail();
        if (!email) throw new Error('No user email found');

        const response = await UserData(email);
        return response?.data;
    } catch (error) {
        throw new Error('Failed to fetch user data: ' + (error.message || 'An error occurred'));
    }
};

const getUsername = async () => {
    try {
        const userData = await getUserData();
        return userData?.name;
    } catch (error) {
        throw new Error('Failed to get username: ' + (error.message || 'An error occurred'));
    }
};

const getUserID = async () => {
    try {
        const userData = await getUserData();
        return userData?.id;
    } catch (error) {
        throw new Error('Failed to get user ID: ' + (error.message || 'An error occurred'));
    }
};

export const User = { getUsername, getUserData, getUserID };
