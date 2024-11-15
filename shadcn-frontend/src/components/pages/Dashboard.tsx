export const Dashboard = () => {
    return (
        <div>
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }}
            >
                LOGOUT
            </button>
        </div>
    );
};
