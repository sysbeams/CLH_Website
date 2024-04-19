import Navigator from "../navigator";
import SubHeading from "../sub-heading";

const AboutUs = () => {
    return (
        <>
            <Navigator links={[
                {
                    title: "About Us",
                    url: "/about"
                }
            ]} />
            <div className="px-[20px] md:px-[50px]">
                <SubHeading text="About " colourText="us." />

            </div>
        </>
    );
}

export default AboutUs;