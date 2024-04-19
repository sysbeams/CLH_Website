"use client";
import SubHeading from "../sub-heading";
import AlumniData from "../../data/alumni.json";
import { useState } from "react";
import { MdOutlinePlayCircleFilled } from "react-icons/md";


const Love = () => {

    const [alumni, setAlumni] = useState(AlumniData);
    return (
        <div className="px-[20px] md:px-[50px]">
            <SubHeading text="Our students " colourText="love us." />
            <div className="grid grid-cols-1 md:grid-cols-3">
                {
                    alumni.slice(0, 3).map(c =>
                        <div key={Math.random() * 90} className="custom-border w-full flex flex-col ">
                            <div className="h-[212px] md:h-[277px] bg-no-repeat bg-cover bg-center grayscale overflow-hidden text-white flex justify-end items-end p-4" style={{ backgroundImage: `url('${c.imgPath}')` }}>
                                <MdOutlinePlayCircleFilled size={40}/>
                            </div>
                            <div className="flex flex-col justify-center items-start gap-4 text-primary text-[20px] md:text-[24px] font-[600] p-[15px] md:p-[30px]">
                                <span className="leading-[28px] md:leading-[32px]">{c.name}</span>
                                <span className=" text-secondary">{c.occupation}</span>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Love;