"use client";
import { useState } from "react";
import SubHeading from "../sub-heading";

const DropMessage = () => {

    const [enquiry, setEnquiry] = useState({
        name: "",
        email: "",
        course: "",
        message: ""
    })
    return (
        <div className="px-[20px] md:px-[50px]">
            <SubHeading text="Want to drop " colourText="a message?" />
            <form action="post" className="text-primary text-[16px] md:text-[20px] font-[500] ">
                <input type="text" placeholder="Your name" className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" value={enquiry.name} onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })} />
                <input type="text" placeholder="Your email address" className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" value={enquiry.email} onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })} />
                <input type="text" placeholder="Your course of choice" className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" value={enquiry.course} onChange={(e) => setEnquiry({ ...enquiry, course: e.target.value })} />
                <textarea type="text" placeholder="Your message for us (if any)" className="custom-border  p-6 placeholder:text-[#B3B3B3] w-full resize-none h-[250px] " value={enquiry.message} onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })} />
                <button type="submit" className="h-[64px] md:h-[96px] flex items-center justify-center text-[20px] md:text-[28px] font-[600] bg-secondary custom-border w-full -mt-2">
                    Send a message
                </button>
            </form>

        </div>
    );
}

export default DropMessage;