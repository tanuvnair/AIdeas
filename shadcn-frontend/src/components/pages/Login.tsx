import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { AxiosError } from "axios";

export const Login = () => {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<AxiosError | null>(null);

    const loginFormSchema = z.object({
        email: z
            .string()
            .email("Invalid email address")
            .min(1, "Email is required"),

        password: z.string().min(1, "Password field must not be empty"),
    });

    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
        const { email, password } = values;

        try {
            await login(email, password);
        } catch (err) {
            console.log(err);
            setError({
                message: "Invalid credentials. Please try again.",
            } as AxiosError);
        }
    };

    return (
        <div className="relative min-h-screen">
            <Button
                variant="ghost"
                className="absolute top-8 left-8"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
            </Button>

            <div className="flex flex-col justify-center max-w-md mx-auto h-screen gap-8 p-8">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Log In
                </h1>
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error.message}</AlertDescription>
                    </Alert>
                )}

                <Form {...loginForm}>
                    <form
                        onSubmit={loginForm.handleSubmit(onSubmit)}
                        className="flex flex-col gap-8"
                    >
                        <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">
                            Log In
                            {isLoading ? (
                                <div className="ml-1 animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : null}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};
