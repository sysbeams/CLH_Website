"use client";
import { useRouter } from "next/navigation";
import { GoArrowUpRight } from "react-icons/go";

const Heading = () => {

    const router = useRouter();
    return (
        <div className="w-full border-bottom">
            <div className="flex flex-col lg:flex-row gap-[50px]  lg:px-[50px]">
                <div className="basis-[40%] flex flex-col gap-8 text-primary px-[20px] md:px-[50px] lg:px-0">
                    <div className="flex flex-col text-[60px] md:text-[88px]  font-[600] leading-[60px] md:leading-[88px]">
                        <span>Learn.</span>
                        <span>Collaborate.</span>
                        <span className="text-secondary">Validate.</span>
                    </div>
                    <span className="text-[18px] md:text-[20px] leading-[28px] font-[600]">
                        Become an industry ready software developer in a few months.
                    </span>
                    <span className="text-[18px] md:text-[20px] leading-[28px] font-[500]">
                        Code Learners Hub gives the best training and hand-on experience that you need to fit into the evolving and competitive global tech market.
                    </span>
                    <div className="flex gap-12">
                        <div className="flex flex-col font-[500]">
                            <span className="text-[36px]">400+</span>
                            <span className="text-[20px]">Students taught</span>
                        </div>
                        <div className="flex flex-col font-[500]">
                            <span className="text-[36px]">6+</span>
                            <span className="text-[20px]">Years of experience</span>
                        </div>
                    </div>
                    <button onClick={() => router.push(`/courses`)} className="custom-border h-[56px] bg-secondary flex justify-between items-center px-6 text-[14px] font-[600]">
                        <span>
                            Explore Courses
                        </span>
                        <GoArrowUpRight size={20} />
                    </button>
                </div>
                <div className="flex-1 flex justify-center relative lg:static overflow-hidden">
                    <div className="absolute -top-4 md:top-10 lg:top-0 md:right-[-220px] lg:right-[-300px] bg-no-repeat bg-cover w-[430px] md:w-[520px] lg:w-[715px] h-[1000px] lg:h-[1100px] rotate-[45deg] lg:rotate-[-160deg]  bg-[url('/assets/images/tile.png')]">

                    </div>
                    <div className="bg-no-repeat bg-cover bg-center bg-[url('/assets/images/man.png')]  w-[335px] h-[430px] md:w-[553px] md:h-[712px] z-10 grayscale">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Heading;