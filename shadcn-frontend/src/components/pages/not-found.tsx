export const NotFound = () => {
    return (
        <>
            <div className="flex flex-col h-screen items-center justify-center text-center gap-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    404 - Page not found
                </h1>
                <p className="text-xl text-muted-foreground">
                    The page you are looking for does not exist
                </p>
            </div>
        </>
    );
};
