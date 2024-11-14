import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const LandingPage = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="flex flex-col lg:flex-row justify-center items-center h-screen gap-8 p-8 lg:p-16 ">
                <div className="flex flex-col p-8 gap-6 max-w-2xl lg:max-w-3xl">
                    <div className="flex flex-col gap-4">
                        <h1 className="scroll-m-20 text-4xl lg:text-6xl font-extrabold tracking-tight  lg:text-left">
                            AIdeas
                        </h1>
                        <p className="text-lg text-muted-foreground  lg:text-left">
                            Your AI note taking assistant, at your fingertips,
                            powered by Gemini
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Button variant={"outline"} className="p-6">
                            Get started
                        </Button>
                        <Button variant={"link"}>
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

            <hr className="w-1/2 mx-auto m-8"></hr>

            {/* Key Features Section */}
            <section className="py-14 px-8">
                <div className="flex flex-col items-center max-w-6xl mx-auto">
                    <h2 className="text-3xl font-semibold tracking-tight mb-14">
                        Key Features
                    </h2>
                    <div className="flex flex-col md:flex-row gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-primary">
                                    Feature #1
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="">
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
