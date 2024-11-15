import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FiMoon, FiSun } from "react-icons/fi";
import { ArrowUp } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const LandingPage = () => {
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    const features = [
        {
            featureName: "Feature #1",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor condimentum risus eget fermentum. Nunc eu lorem vel arcu vulputate feugiat. Aenean ante metus, porta vel ullamcorper sed, pharetra a augue. Quisque mollis tincidunt mattis. Quisque ut cursus leo, ac convallis nulla. Donec sed congue tellus, pretium commodo nunc. Cras erat velit, iaculis a mollis id, sodales at dolor.",
        },
        {
            featureName: "Feature #2",
            description:
                "Ut mattis magna non luctus feugiat. Mauris elit arcu, elementum a dui nec, viverra bibendum turpis. Integer fringilla scelerisque tristique. Nam a ligula ante. Nam ut facilisis orci. Vestibulum odio nisi, gravida nec faucibus sed, eleifend in ex. Praesent felis purus, consequat et velit quis, iaculis vehicula metus. Ut sed dignissim ante. Aliquam sit amet dapibus mauris. Praesent vitae suscipit nulla.",
        },
        {
            featureName: "Feature #3",
            description:
                "In accumsan urna blandit mauris aliquet, sed finibus odio pretium. Cras ante nunc, hendrerit vitae turpis eget, sollicitudin laoreet neque. Phasellus non aliquet arcu, eget feugiat odio. Proin pulvinar eros nunc, sed ultricies risus placerat sed. Nunc viverra in nisi id fermentum. Vivamus mauris est, lacinia at lacus a, varius sodales metus. Morbi tristique massa turpis, vel lobortis ex imperdiet non.",
        },
    ];

    const testimonials = [
        {
            author: "Tanuv Nair",
            message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor condimentum risus eget fermentum. Nunc eu lorem vel arcu vulputate feugiat. Aenean ante metus, porta vel ullamcorper sed, pharetra a augue. Quisque mollis tincidunt mattis. Quisque ut cursus leo, ac convallis nulla. Donec sed congue tellus, pretium commodo nunc. Cras erat velit, iaculis a mollis id, sodales at dolor.",
        },
        {
            author: "Vunat Rian",
            message:
                "Ut mattis magna non luctus feugiat. Mauris elit arcu, elementum a dui nec, viverra bibendum turpis. Integer fringilla scelerisque tristique. Nam a ligula ante. Nam ut facilisis orci. Vestibulum odio nisi, gravida nec faucibus sed, eleifend in ex. Praesent felis purus, consequat et velit quis, iaculis vehicula metus. Ut sed dignissim ante. Aliquam sit amet dapibus mauris. Praesent vitae suscipit nulla.",
        },
        {
            author: "Meows the ninth",
            message:
                "In accumsan urna blandit mauris aliquet, sed finibus odio pretium. Cras ante nunc, hendrerit vitae turpis eget, sollicitudin laoreet neque. Phasellus non aliquet arcu, eget feugiat odio. Proin pulvinar eros nunc, sed ultricies risus placerat sed. Nunc viverra in nisi id fermentum. Vivamus mauris est, lacinia at lacus a, varius sodales metus. Morbi tristique massa turpis, vel lobortis ex imperdiet non.",
        },
    ];

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="flex flex-col lg:flex-row justify-center items-center h-screen gap-8 p-8 lg:p-16 relative">
                <div className="absolute top-16 right-16 flex items-center gap-4">
                    <Button
                        variant="outline"
                        onClick={toggleTheme}
                        className="p-2"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <FiSun size={24} />
                        ) : (
                            <FiMoon size={24} />
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/sign-in")}
                    >
                        Log In
                    </Button>
                </div>

                <div className="flex flex-col p-8 gap-6 max-w-2xl lg:max-w-3xl">
                    <div className="flex flex-col gap-4">
                        <h1 className="scroll-m-20 text-4xl lg:text-6xl font-extrabold tracking-tight lg:text-left">
                            AIdeas
                        </h1>
                        <p className="text-lg text-muted-foreground lg:text-left">
                            Your AI note taking assistant, at your fingertips,
                            powered by Gemini
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                        <Button
                            variant="default"
                            className="p-6"
                            onClick={() => navigate("/sign-up")}
                        >
                            Get started
                        </Button>

                        <Button
                            variant="outline"
                            className="p-6"
                            onClick={() => navigate("/sign-in")}
                        >
                            Already have an account?
                        </Button>
                    </div>
                </div>

                <div className="w-full lg:w-auto max-w-xl">
                    <img
                        src="./src/assets/landing-artwork.svg"
                        alt="Landing artwork"
                        className="w-full h-auto"
                    />
                </div>
            </section>

            {/* Key Features and Testimonials */}
            <hr className="w-1/2 mx-auto my-8" />
            <section className="flex flex-col justify-around px-8 lg:px-64 py-16 lg:py-32 gap-32">
                <div>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-8">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-full">
                        {features.map((feature, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>{feature.featureName}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-8">
                        Testimonials
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-full">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index}>
                                <CardHeader className="flex flex-row gap-6">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <CardTitle>{testimonial.author}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{testimonial.message}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Scroll to top button */}
            <Button
                variant="outline"
                className={`
                    fixed
                    bottom-8
                    right-8
                    px-6
                    py-8
                    rounded-full
                    transition-opacity
                    duration-300
                    ${
                        isVisible
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                    }
                `}
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <ArrowUp size={24} />
            </Button>
        </>
    );
};
