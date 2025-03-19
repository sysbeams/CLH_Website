import Navigator from "../navigator";
import SubHeading from "../sub-heading";

const Heading = () => {

    const contacts = [
        {
            title: "Address",
            desc: "CodelearnersHub Complex, Obantoko, Abeokuta, Ogun State, Nigeria",
        },
        {
            title: "Phone",
            desc: "+234 703 190 5878",
        },
        {
            title: "Mail",
            desc: "info@codelearnershub.com",
        },

    ]
    return (
        <>
            <Navigator links={[
                {
                    title: "Contact Us",
                    url: "/contact"
                }
            ]} />
            <div className="px-[20px] md:px-[50px]">
                <SubHeading text="Contact " colourText="us." />
                <div className="h-auto lg:h-[625px] bg-[#DBF6FF] custom-border flex flex-col lg:flex-row">
                    <div className="md:basis-[40%] p-[20px] py-[30px] md:ml-[40px] md:mt-[60px]">
                        <p className="text-[32px] md:text-[48px] leading-[32px] md:leading-[48px] font-[600] text-center md:text-left">Visit our readily accessible tutorial centre.</p>
                        <div className="mt-6 flex flex-col items-center md:items-start gap-6">
                            {
                                contacts.map(c =>
                                    <div key={Math.random() * 75} className="flex flex-col gap-1 text-[14px] md:text-[16px]">
                                        <span className="font-[700] text-center md:text-left">{c.title}</span>
                                        <span className="font-[500] text-center md:text-left">{c.desc}</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className=" lg:flex-1 flex justify-center  lg:justify-end lg:items-end overflow-hidden">
                        <div className=" w-[335px] h-[335px] md:w-[400px] md:h-[400px] lg:w-full lg:h-full bg-no-repeat bg-cover bg-center bg-[url('/assets/images/earth.png')] relative lg:left-[80px] lg:top-[100px]">

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Heading;