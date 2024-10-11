import axios from "axios";

export const verifyToken = async (token) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/verify-token`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error verifying token:", error);
        return false;
    }
};
