import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../AuthProvider";
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
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const formSchema = z.object({
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

        confirmPassword: z
            .string()
            .min(1, "Confirm Password is required")
            .refine(
                (value: string) =>
                    value === formSchema.shape.password._def.value,
                "Passwords do not match"
            ),
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

        try {
            await login(email, password);
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid credentials. Please try again.");
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
                    Create your new account
                </h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-8"
                    >
                        <FormField
                            control={form.control}
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
                            control={form.control}
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

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">
                            Sign Up
                            {isLoading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background"></div>
                            ) : (
                                ""
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};
