import Explorebtn from "../explore-btn";
import SubHeading from "../sub-heading";

const Needs = () => {
    const needs = [
        {
            imgPath: "/assets/images/tutor.jpg",
            title: "Industry Experienced Tutors",
            desc: "Our tutors are seasoned industry professionals with extensive experience in the tech world. We are committed to your success, and equipping you with the skills needed to excel. \n\nWith CodeLearnershub, you're not just learning. You’re learning from the best.",
        },
        {
            imgPath: "/assets/images/girl.png",
            title: "In-Demand Courses",
            desc: "CodeLearnershub offers a variety of in-demand courses designed to equip you with skills needed to thrive in the dynamic tech space. Our curricula are meticulously crafted to reflect the latest industry trends and technological advancements.\n\nJoin us to acquire high-demand skills and position yourself at the forefront of tech revolution.",
        },
        {
            imgPath: "/assets/images/attention.jpg",
            title: "The attention you need to grow.",
            desc: "We provide the personalised attention and support you need to excel in the tech space.\n\nJoin us and experience a learning environment where your unique needs are recognized and nurtured.",
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
                                <span className="text-[16px] md:text-[18px] font-[500] whitespace-pre-line">{n.desc}</span>
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