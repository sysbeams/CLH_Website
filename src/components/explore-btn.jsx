"use client";
import { useRouter } from "next/navigation";

const Explorebtn = () => {

    const router = useRouter();
    return (
        <button onClick={()=> router.push(`/courses`)} className="h-[64px] md:h-[96px] flex items-center justify-center text-[20px] md:text-[28px] font-[600] bg-secondary custom-border w-full">
            Explore Courses
        </button>
    );
}

export default Explorebtn;