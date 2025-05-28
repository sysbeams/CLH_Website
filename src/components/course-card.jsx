"use client";
import { useRouter } from "next/navigation";

const CourseCard = ({url, imgPath, title, price}) => {
    
    const router = useRouter();
    return (
        <div onClick={()=> router.push(`/courses/${url}`)} className="custom-border w-full flex flex-col hover:cursor-pointer hover:scale-[1.02] transition-all duration-300 ease-in-out">
            <div className="h-[212px] md:h-[277px] bg-no-repeat bg-contain bg-center grayscale overflow-hidden" style={{backgroundImage: `url('${imgPath}')`}}></div>
            <div className="flex flex-col justify-center items-start gap-4 text-primary text-[20px] md:text-[24px] font-[600] p-[15px] md:p-[30px]">
                <span className="leading-[28px] md:leading-[32px]">{title}</span>
                <span className=" text-secondary">{price}</span>
            </div>
        </div>
    );
}

export default CourseCard;