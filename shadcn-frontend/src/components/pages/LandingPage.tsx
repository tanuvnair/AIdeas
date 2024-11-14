import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export const LandingPage = () => {
    return (
        <>
            {/* First Section: Hero Section */}
            <section className="flex flex-col lg:flex-row justify-center items-center h-screen gap-8 p-8 lg:p-16">
                <div className="p-8 lg:p-12 flex flex-col gap-6 max-w-2xl lg:max-w-3xl">
                    <div className="flex flex-col gap-4">
                        <h1 className="scroll-m-20 text-4xl lg:text-6xl font-extrabold tracking-tight text-center lg:text-left">
                            AIdeas
                        </h1>
                        <p className="text-lg lg:text-xl text-muted-foreground text-center lg:text-left">
                            Your AI note taking assistant, at your fingertips,
                            powered by Gemini
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Button
                            variant={"outline"}
                            className="w-full sm:w-auto p-6 text-center"
                        >
                            Get started
                        </Button>
                        <Button
                            variant={"default"}
                            className="w-full sm:w-auto p-6 text-center"
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

            <div className="flex align-middle justify-center">
                <hr className="w-1/2"></hr>
            </div>

            <section className="py-16 px-8 lg:px-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-semibold tracking-tight text-center mb-8">
                        Key Features
                    </h2>
                    <div className="flex justify-center p-4 gap-4 items-center">
                        <Card className="flex flex-col items-center">
                            <CardHeader>
                                <CardTitle>Feature #1</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Maxime labore doloremque
                                    aliquid maiores culpa velit recusandae
                                    possimus odio quod, a amet ut rerum expedita
                                    consequuntur asperiores molestiae tempora
                                    architecto adipisci.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="flex flex-col items-center">
                            <CardHeader>
                                <CardTitle>Feature #1</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Maxime labore doloremque
                                    aliquid maiores culpa velit recusandae
                                    possimus odio quod, a amet ut rerum expedita
                                    consequuntur asperiores molestiae tempora
                                    architecto adipisci.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="flex flex-col items-center">
                            <CardHeader>
                                <CardTitle>Feature #3</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Maxime labore doloremque
                                    aliquid maiores culpa velit recusandae
                                    possimus odio quod, a amet ut rerum expedita
                                    consequuntur asperiores molestiae tempora
                                    architecto adipisci.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
};
