import Explorebtn from "../explore-btn";
import SubHeading from "../sub-heading";

const Needs = () => {
    const needs = [
        {
            imgPath: "/assets/images/man2.png",
            title: "The very best industry tutors.",
            desc: "Lorem ipsum dolor sit amet consectetur. In adipiscing diam quam leo id a sit et ligula odio. Lorem ipsum dolor sit amet consectetur. In adipiscing diam quam leo id a sit et ligula odio. ",
        },
        {
            imgPath: "/assets/images/girl.png",
            title: "The most in-demand courses.",
            desc: "Lorem ipsum dolor sit amet consectetur. In adipiscing diam quam leo id a sit et ligula odio. Lorem ipsum dolor sit amet consectetur. In adipiscing diam quam leo id a sit et ligula odio. ",
        },
        {
            imgPath: "/assets/images/girl2.png",
            title: "The attention you need to grow.",
            desc: "Lorem ipsum dolor sit amet consectetur. In adipiscing diam quam leo id a sit et ligula odio. Lorem ipsum dolor sit amet consectetur. In adipiscing diam quam leo id a sit et ligula odio. ",
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