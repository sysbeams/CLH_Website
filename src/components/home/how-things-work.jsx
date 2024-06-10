import Explorebtn from "../explore-btn";
import SubHeading from "../sub-heading";

const HowThingsWork = () => {

    const steps = [
        {
            title: "Create an account.",
            desc: "It's simple! Click the register button, enter your email address, create a password and click the submit button.",
        },
        {
            title: "Select a Course.",
            desc: "Explore options available and selects a preferred course",
        },
        {
            title: "Get Assessed",
            desc: "Receive a mail on the assessment data, prepare for the assessment with our assessment plan, pass the assessment and receive a mail on the commencement of the class",
        },

    ]
    return (
        <div className="px-[20px] md:px-[50px]">
            <SubHeading text="How things" colourText="work." />
            <div className="flex flex-col md:flex-row md:h-[470px]">
                <div className="md:basis-[50%] h-[300px] md:h-full custom-border bg-no-repeat bg-cover bg-center grayscale bg-[url('/assets/images/girl4.png')]"></div>
                <div className="md:basis-[50%] custom-border p-[15px] md:px-[30px] lg:px-[50px] justify-center flex flex-col gap-6 text-primary">
                    {
                        steps.map((s, index) =>
                            <div key={Math.random() * 30} className="flex flex-row gap-2">
                                <span className="text-[16px] font-[600]">0{index+1}</span>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[28px] font-[600]">{s.title}</span>
                                    <span className="text-[18px] font-[500]">{s.desc}</span>
                                </div>
                            </div>
                        )
                    }

                </div>

            </div>
            <Explorebtn/>
        </div>
    );
}

export default HowThingsWork;