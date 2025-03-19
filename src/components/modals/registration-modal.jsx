"use client";
import { useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

const RegistrationModal = ({ setIsOpen }) => {
    
    const [loading, setLoading] = useState(false)
    const [enquiry, setEnquiry] = useState({
        name: "",
        tel: "",
        address: "",
        sponsorTel: "",
        education: "",
        source: "",
    });
    const getEmailBdy = () => {
            return `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                    <h2 style="color: #007BFF; text-align: center;">New Registration On CLH WebSite</h2>
                    <p style="font-size: 16px; color: #555;">Hello, you have received a new enquiry from your website.</p>
                    
                    <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">
                        <p><strong style="color: #007BFF;">Name:</strong> ${enquiry.name}</p>
                        <p><strong style="color: #007BFF;">Address:</strong> ${enquiry.address}</p>
                        <p><strong style="color: #007BFF;">Tel:</strong> ${enquiry.tel}</p>
                        <p><strong style="color: #007BFF;">Sponsor Tel:</strong> ${enquiry.sponsorTel}</p>
                        <p><strong style="color: #007BFF;">Level of Education:</strong> ${enquiry.education}</p>
                        <p><strong style="color: #007BFF;">Source:</strong> ${enquiry.source}</p>
                    </div>
                    <p style="font-size: 12px; color: #777; text-align: center;">This is an automated email. Please do not reply directly.</p>
                </div>
            `;
        }
        const sendEmail = async (e) => {
            e.preventDefault();
            setLoading(true);
            const emailRequest = { emailBdy : getEmailBdy(), senderEmail: enquiry.email, subject: "New Registration" }
            try {
                const response = await fetch("/api/send-email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(emailRequest)
                });
    
                const data = await response.json();
                toast.success(data.message);
            } catch (error) {
                toast.error("Failed to send email");
            } finally {
                setLoading(false);
            }
        };
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
                <form action="post" onSubmit={sendEmail} className="text-primary text-[16px] md:text-[20px] font-[500] ">
                    <input type="text" placeholder="Your name" className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" required value={enquiry.name} onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })} />
                    <input type="text" placeholder="Your phone number" required className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" value={enquiry.tel} onChange={(e) => setEnquiry({ ...enquiry, tel: e.target.value })} />
                    <input type="text" placeholder="Your home address" required className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" value={enquiry.address} onChange={(e) => setEnquiry({ ...enquiry, address: e.target.value })} />
                    <input type="text" placeholder="Sponsor's phone number" className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" value={enquiry.sponsorTel} onChange={(e) => setEnquiry({ ...enquiry, sponsorTel: e.target.value })} />
                    <input type="text" placeholder="Highest level of education attained" required className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" value={enquiry.education} onChange={(e) => setEnquiry({ ...enquiry, education: e.target.value })} />
                    <input type="text" placeholder="How did you hear about CodeLearners Hub?" required className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" value={enquiry.source} onChange={(e) => setEnquiry({ ...enquiry, source: e.target.value })} />
                    <button type="submit" className="h-[60px] md:h-[86px] flex items-center justify-center text-[20px] md:text-[24px] font-[600] bg-secondary custom-border w-full "disabled={loading}>
                   {loading ? <BeatLoader/> : 'Send'} 
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegistrationModal;
