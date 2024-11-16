import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/components/auth-provider";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

export const SignUp = () => {
    const { isLoading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<AxiosError | null>(null);
    const [successDialog, setSuccessDialog] = useState(false);

    const handleSuccessDialogClose = () => {
        setSuccessDialog(false);
    };

    const formSchema = z
        .object({
            email: z
                .string()
                .email("Invalid email address")
                .min(1, "Email is required"),

            password: z
                .string()
                .min(8, "Password must be at least 8 characters long")
                .regex(
                    /[A-Z]/,
                    "Password must contain at least one uppercase letter"
                )
                .regex(
                    /[a-z]/,
                    "Password must contain at least one lowercase letter"
                )
                .regex(/[0-9]/, "Password must contain at least one number")
                .regex(
                    /[@$!%*?&]/,
                    "Password must contain at least one special character"
                ),

            confirmPassword: z.string().min(1, "Confirm password is required"),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "The passwords don't match",
            path: ["confirmPassword"],
        });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { email, password } = values;

        axios
            .post(
                `${import.meta.env.VITE_API_URL}/auth/sign-up`,
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        Authorization: "Bearer token",
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(() => {
                setSuccessDialog(true);
                <DialogTrigger>Open</DialogTrigger>;
            })
            .catch((error) => {
                let errorMessage = "An error occurred.";

                if (error.response) {
                    errorMessage =
                        error.response.data.message ||
                        `Error: ${error.response.status}`;
                } else if (error.request) {
                    errorMessage =
                        "No response from the server. Please try again later.";
                } else {
                    errorMessage = error.message;
                }

                setError({
                    message: errorMessage,
                } as AxiosError);
            });
    };

    return (
        <div className="flex flex-col h-screen items-center justify-center gap-4">
            <div>
                <Button
                    variant="ghost"
                    className="absolute top-8 left-8"
                    onClick={() => navigate("/")}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
            </div>

            {error && (
                <Alert variant="destructive" className="max-w-sm w-full">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
            )}

            <Card className="mx-auto max-w-sm w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Create your new account
                    </CardTitle>

                    <CardDescription>
                        Enter your email below to sign up
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Confirm Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Button type="submit">
                                    Sign Up
                                    {isLoading ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background"></div>
                                    ) : (
                                        ""
                                    )}
                                </Button>
                            </div>

                            <div className="mt-4 text-center text-sm">
                                Already have an account?{" "}
                                <Link to="/login" className="underline">
                                    Log In
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Dialog
                open={successDialog}
                onOpenChange={handleSuccessDialogClose}
            >
                <DialogContent>
                    <DialogHeader className="gap-4">
                        <DialogTitle>Your account was created.</DialogTitle>

                        <Button onClick={() => navigate("/login")}>Done</Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};
