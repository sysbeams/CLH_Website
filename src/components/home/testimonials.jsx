"use client";
import Image from "next/image";
import TestimonialData from "../../data/testimonials.json";
import { useState } from "react";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState(TestimonialData);
    const [expanded, setExpanded] = useState({});

    const toggleReadMore = (index) => {
        setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <div className="px-[20px] md:px-[50px]">
            <div className="flex overflow-x-auto hide-scrollbar custom-border">
                {
                    testimonials.map((t, index) =>
                        <div key={index} className="flex flex-col gap-5 border-x-[1px] border-primary p-[15px] md:p-[30px] min-w-[80%] md:min-w-[65%] h-auto">
                            <Image
                                src="/assets/icons/quote.svg"
                                alt="quote"
                                width={56}
                                height={40}
                            />
                            <span className="text-[20px] md:text-[24px] font-[600]">{t.title}</span>
                            <span className="text-[16px] md:text-[18px] font-[500]">
                                {expanded[index] || t.testimonial.length <= 450
                                    ? t.testimonial
                                    : `${t.testimonial.substring(0, 450)}... `}
                                {t.testimonial.length > 450 && (
                                    <button
                                        onClick={() => toggleReadMore(index)}
                                        className="text-primary underline ml-2"
                                    >
                                        {expanded[index] ? "See less" : "Read more"}
                                    </button>
                                )}
                            </span>
                            <div className="flex flex-col text-[16px] md:text-[18px] font-[600]">
                                <span>{t.name}</span>
                                <span className="text-secondary">{t.occupation}</span>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="custom-border p-[15px] md:p-[30px] flex items-center text-primary text-[14px] md:text-[16px] font-[600] gap-2 ">
                <span>01</span>
                <div className="w-[120px] md:w-[240px] h-[2px] bg-[#AFD3E2]"></div>
                <span>0{testimonials.length}</span>
            </div>
        </div>
    );
}

export default Testimonials;
