
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegTimesCircle } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { useRouter } from "next/navigation";
import RegistrationModal from "./modals/registration-modal";



const TopNav = () => {
    const router = useRouter();
    const navOptions = [
        {
            text: "About Us",
            route: "/about",
        },
        {
            text: "Contact Us",
            route: "/contact",
        },

    ]
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="w-full  px-[20px] md:px-[50px] flex items-center justify-between my-[15px] md:my-[30px] relative">
                <div className="hidden md:block">
                    <Link href="/">
                        <Image
                            alt="logo"
                            src="/assets/images/logo.png"
                            width={230}
                            height={40}
                        />
                    </Link>
                </div>
                <div className=" md:hidden">
                    <Link href="/">
                        <Image
                            alt="logo"
                            src="/assets/images/logo.png"
                            width={150}
                            height={35}
                        />
                    </Link>
                </div>
                <button onClick={() => setIsNavOpen(true)} className="lg:hidden w-[40px] h-[38px] p-[3px] custom-border flex items-center justify-center">
                    <div className="w-full h-full custom-border bg-secondary flex items-center justify-center text-primary">
                        <LuMenu size={20} />
                    </div>
                </button>
                <div className={`bg-white lg:hidden fixed top-0 h-[100vh] w-[100vw] transition-all duration-500 pt-[25px] flex flex-col items-end z-30 ${isNavOpen ? "right-0" : "-right-[100vw]"}`} >
                    <button onClick={() => setIsNavOpen(false)} className="lg:hidden w-[40px] h-[38px] p-[3px] custom-border flex items-center justify-center mr-4">
                        <div className="w-full h-full custom-border bg-secondary flex items-center justify-center text-primary">
                            <FaRegTimesCircle size={20} />
                        </div>
                    </button>
                    <div className="w-full flex flex-col mt-4">
                        {
                            navOptions.map((n, index) =>
                                <Link key={index * 10} href={n.route}>
                                    <div className="h-[56px] border-y-[1px] border-primary text-[15px] text-primary font-[600] flex items-center justify-center hover:underline transition-all duration-300">{n.text}</div>
                                </Link>
                            )
                        }
                        <button onClick={() => router.push(`/courses`)} className="h-[56px] border-y-[1px] border-primary bg-secondary text-[15px] text-primary font-[600] flex items-center justify-center">
                            Courses
                        </button>
                        <button onClick={() => setIsOpen(true)} className="h-[56px] border-y-[1px] border-primary bg-primary text-[15px] text-white font-[600] flex items-center justify-center gap-2">
                            <span>Register</span>
                            <FaArrowRightLong size={20} />
                        </button>
                    </div>
                </div>
                <div className="h-[70px] custom-border p-2 items-center hidden lg:flex gap-5 z-20">
                    <div className="flex gap-8 pl-6">
                        {
                            navOptions.map((n, index) =>
                                <Link key={index * 10} href={n.route}>
                                    <span className="text-[15px] text-primary font-[600] hover:underline transition-all duration-300">{n.text}</span>
                                </Link>
                            )
                        }

                    </div>
                    <div className="flex gap-2 h-full">
                        <button onClick={() => router.push(`/courses`)} className="h-full px-[30px] custom-border bg-secondary text-[15px] text-primary font-[600] flex items-center justify-center">
                        Courses
                        </button>
                        <button onClick={() => setIsOpen(true)} className="h-full px-[30px] custom-border bg-primary text-[15px] text-white font-[600] flex items-center justify-center gap-2">
                            <span>Register</span>
                            <FaArrowRightLong size={20} />
                        </button>
                    </div>
                </div>
            </div>
            {
                isOpen &&
                <RegistrationModal setIsOpen={setIsOpen} />
            }
        </>
    );
}

export default TopNav;