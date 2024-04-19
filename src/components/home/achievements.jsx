
import SubHeading from "../sub-heading";

const Achievements = () => {

    const achievements = [
        {
            title: "2k+",
            desc: "International students.",
        },
        {
            title: "12+",
            desc: "Years of experience.",
        },
        {
            title: "15k+",
            desc: "Students taught.",
        },
        {
            title: "15+",
            desc: "In-demand courses.",
        },

    ]

    return (
        <div className="px-[20px] md:px-[50px]">
            <SubHeading text="Our " colourText="achievements." />
            <div className="grid grid-cols-2 md:grid-cols-4 ">
            {
                achievements.map(s =>
                    <div key={Math.random() * 34} className="custom-border flex flex-col gap-2 p-[15px] md:p-[30px] justify-center  font-[600]">
                        <span className="text-[28px] md:text-[32px]">{s.title}</span>
                        <span className="text-[16px] md:text-[18px]">{s.desc}</span>
                    </div>
                )
            }
            </div>
        </div>
    );
}

export default Achievements;