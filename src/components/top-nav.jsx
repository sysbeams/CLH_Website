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
  ];
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <style jsx>{`
        @keyframes pulse-glow {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
        }

        @keyframes shake-bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0) translateX(0);
          }
          10% {
            transform: translateY(-3px) translateX(-1px);
          }
          30% {
            transform: translateY(-2px) translateX(1px);
          }
          40% {
            transform: translateY(-4px) translateX(-1px);
          }
          60% {
            transform: translateY(-2px) translateX(1px);
          }
          70% {
            transform: translateY(-3px) translateX(0);
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .register-btn-mobile {
          animation: pulse-glow 2s infinite;
          background: linear-gradient(-45deg, #011629);
          background-size: 400% 400%;
          animation: pulse-glow 2s infinite, gradient-shift 3s ease infinite;
        }

        .register-btn-mobile:hover {
          animation-play-state: paused;
          transform: scale(1.05);
          transition: transform 0.2s ease;
        }

        .arrow-wiggle {
          animation: arrow-wiggle 1s infinite;
        }

        @keyframes arrow-wiggle {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(3px);
          }
          75% {
            transform: translateX(-1px);
          }
        }
      `}</style>

      <div className="w-full px-[20px] md:px-[50px] flex items-center justify-between my-[15px] md:my-[30px] relative">
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
        <div className="md:hidden">
          <Link href="/">
            <Image
              alt="logo"
              src="/assets/images/logo.png"
              width={150}
              height={35}
            />
          </Link>
        </div>
        <button
          onClick={() => setIsNavOpen(true)}
          className="lg:hidden w-[40px] h-[38px] p-[3px] custom-border flex items-center justify-center"
        >
          <div className="w-full h-full custom-border bg-secondary flex items-center justify-center text-primary">
            <LuMenu size={20} />
          </div>
        </button>
        <div
          className={`bg-white lg:hidden fixed top-0 h-[100vh] w-[100vw] transition-all duration-500 pt-[25px] flex flex-col items-end z-30 ${
            isNavOpen ? "right-0" : "-right-[100vw]"
          }`}
        >
          <button
            onClick={() => setIsNavOpen(false)}
            className="lg:hidden w-[40px] h-[38px] p-[3px] custom-border flex items-center justify-center mr-4"
          >
            <div className="w-full h-full custom-border bg-secondary flex items-center justify-center text-primary">
              <FaRegTimesCircle size={20} />
            </div>
          </button>
          <div className="w-full flex flex-col mt-4">
            {navOptions.map((n, index) => (
              <button
                key={index * 10}
                onClick={() => {
                  setIsNavOpen(false);
                  router.push(n.route);
                }}
              >
                <div className="h-[56px] border-y-[1px] border-primary text-[15px] text-primary font-[600] flex items-center justify-center hover:underline transition-all duration-300">
                  {n.text}
                </div>
              </button>
            ))}
            <button
              onClick={() => router.push(`/courses`)}
              className="h-[56px] border-y-[1px] border-primary bg-secondary text-[15px] text-primary font-[600] flex items-center justify-center"
            >
              Courses
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="register-btn-mobile h-[56px] border-y-[1px] border-primary text-[15px] text-white font-[700] flex items-center justify-center gap-2 relative z-10"
            >
              <span>Register Now!</span>
              <FaArrowRightLong size={20} className="arrow-wiggle" />
            </button>
          </div>
        </div>
        <div className="h-[70px] custom-border p-2 items-center hidden lg:flex gap-5 z-20">
          <div className="flex gap-8 pl-6">
            {navOptions.map((n, index) => (
              <Link key={index * 10} href={n.route}>
                <span className="text-[15px] text-primary font-[600] hover:underline transition-all duration-300">
                  {n.text}
                </span>
              </Link>
            ))}
          </div>
          <div className="flex gap-2 h-full">
            <button
              onClick={() => router.push(`/courses`)}
              className="h-full px-[30px] custom-border bg-secondary text-[15px] text-primary font-[600] flex items-center justify-center"
            >
              Courses
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="register-btn-mobile h-full px-[30px] custom-border text-[15px] text-white font-[700] flex items-center justify-center gap-2 relative z-10"
            >
              <span>Register Now!</span>
              <FaArrowRightLong size={20} className="arrow-wiggle" />
            </button>
          </div>
        </div>
      </div>
      {isOpen && <RegistrationModal setIsOpen={setIsOpen} />}
    </>
  );
};

export default TopNav;
