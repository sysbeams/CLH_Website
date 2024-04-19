"use client";
import { useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";

const RegistrationModal = ({ setIsOpen }) => {

    const [enquiry, setEnquiry] = useState({
        name: "",
        tel: "",
        address: "",
        ParentTel: "",
        education: "",
        source: "",
    });

    return (
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div class="bg-white w-[100vw] md:w-[800px] rounded-[2px] custom-border lg:max-h-[90vh] overflow-y-auto hide-scrollbar text-primary">
                <div className="relative h-[250px] bg-[#DBF6FF] flex justify-between px-[15px] md:px-[30px] overflow-hidden ">
                    <div className="flex-1 flex flex-col text-[36px] md:text-[52px] leading-[52px] font-[600] justify-center ">
                        <span className="">Registration</span>
                        <span className=" text-secondary">Form.</span>
                    </div>
                    <div className="flex-1 grayscale bg-no-repeat bg-cover bg-center bg-[url('/assets/images/man4.png')] absolute right-[-40px] md:right-0 md:relative top-[60px] md:top-[30px] w-[300px] h-[363px] md:w-[340px] md:h-[440px] ">

                    </div>
                    <button type="button" onClick={()=> setIsOpen(false)} className="absolute top-4 right-3 text-primary hide-scrollbar">
                        <FaRegTimesCircle size={25}/>
                    </button>
                </div>
                <form action="post" className="text-primary text-[16px] md:text-[20px] font-[500] ">
                    <input type="text" placeholder="Your name" className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" value={enquiry.name} onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })} />
                    <input type="text" placeholder="Your phone number" className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" value={enquiry.tel} onChange={(e) => setEnquiry({ ...enquiry, tel: e.target.value })} />
                    <input type="text" placeholder="Your home address" className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" value={enquiry.address} onChange={(e) => setEnquiry({ ...enquiry, address: e.target.value })} />
                    <input type="text" placeholder="Parent/Guardian's phone number" className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" value={enquiry.ParentTel} onChange={(e) => setEnquiry({ ...enquiry, ParentTel: e.target.value })} />
                    <input type="text" placeholder="Highest level of education attained" className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" value={enquiry.education} onChange={(e) => setEnquiry({ ...enquiry, education: e.target.value })} />
                    <input type="text" placeholder="How did you hear about CodeLearners Hub?" className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" value={enquiry.source} onChange={(e) => setEnquiry({ ...enquiry, source: e.target.value })} />
                    <button type="submit" className="h-[60px] md:h-[86px] flex items-center justify-center text-[20px] md:text-[24px] font-[600] bg-secondary custom-border w-full ">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegistrationModal;
