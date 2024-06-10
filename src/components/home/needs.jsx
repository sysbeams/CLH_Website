import Explorebtn from "../explore-btn";
import SubHeading from "../sub-heading";

const Needs = () => {
    const needs = [
        {
            imgPath: "/assets/images/man2.png",
            title: "Industry Experienced Tutors",
            desc: "Become an industry ready software developer in a few months. Code Learners Hub gives the best training and hand-on experience that you need to fit into the evolving and competitive global tech market. ",
        },
        {
            imgPath: "/assets/images/girl.png",
            title: "In-Demand Courses",
            desc: "CodeLearnershub offers a variety of in-demand courses designed to equip you with skills needed to thrive in today's dynamic tech landscape. Our curriculum is meticulously crafted to reflect the latest industry trends and technological advancements, ensuring you are prepared to meet the demands of the modern job market. Join us to acquire the skills that are in high demand and position yourself at the forefront of the technology revolution.",
        },
        {
            imgPath: "/assets/images/girl2.png",
            title: "The attention you need to grow.",
            desc: "We provide the personalised attention and support you need to excel in the tech space. At CodeLearnershub, we are committed to your personal and professional growth as we offer the attention and resources you need to succeed and enjoy your journey in the tech arena. Join us and experience a learning environment where your unique needs are recognized and nurtured.",
        },

    ]
    return (
        <div className="z-10 relative bg-white px-[20px] md:px-[50px] text-primary">
           <SubHeading text="We have what you" colourText="need."/>
            <div className="flex flex-col">
                {
                    needs.map(n =>
                        <div key={Math.random() * 21} className="custom-border flex flex-col md:flex-row md:h-[400px]">
                            <div className="md:basis-[50%] lg:basis-[60%] custom-border bg-no-repeat bg-cover bg-center grayscale h-[230px] md:h-full" style={{backgroundImage: `url('${n.imgPath}')`}}></div>
                            <div className="md:flex-1 custom-border p-[20px] md:px-[50px] flex justify-center flex-col gap-2">
                                <span className="text-[32px] md:text-[36px] font-[600] leading-[44px]">{n.title}</span>
                                <span className="text-[16px] md:text-[18px] font-[500]">{n.desc}</span>
                            </div>
                        </div>

                    )
                }
            </div>
            <Explorebtn/>
        </div>
    );
}

export default Needs;