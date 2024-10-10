export const verifyToken = async (token) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify-token`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (response.ok) {
        return await response.json();
    } else {
        return false;
    }
};
