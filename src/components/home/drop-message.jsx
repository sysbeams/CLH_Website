"use client";
import { useState } from "react";
import SubHeading from "../sub-heading";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const DropMessage = () => {
    const [loading, setLoading] = useState(false)
    const [enquiry, setEnquiry] = useState({
        name: "",
        email: "",
        course: "",
        message: ""
    })
    const getEmailBdy = () => {
        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                <h2 style="color: #007BFF; text-align: center;">New Course Enquiry</h2>
                <p style="font-size: 16px; color: #555;">Hello, you have received a new enquiry from your website.</p>
                
                <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">
                    <p><strong style="color: #007BFF;">Name:</strong> ${enquiry.name}</p>
                    <p><strong style="color: #007BFF;">Email:</strong> ${enquiry.email}</p>
                    <p><strong style="color: #007BFF;">Course Interested:</strong> ${enquiry.course}</p>
                    <p><strong style="color: #007BFF;">Message:</strong></p>
                    <p style="background-color: #fff; padding: 10px; border-left: 4px solid #007BFF;">${enquiry.message}</p>
                </div>
                
                <p style="text-align: center; margin-top: 20px;">
                    <a href="mailto:${enquiry.email}" style="background-color: #007BFF; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reply to Enquiry</a>
                </p>

                <p style="font-size: 12px; color: #777; text-align: center;">This is an automated email. Please do not reply directly.</p>
            </div>
        `;
    }
    const sendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        const emailRequest = { emailBdy : getEmailBdy(), senderEmail: enquiry.email, subject: "New Course Enquiry" }
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
        <div className="px-[20px] md:px-[50px]">
            <SubHeading text="Want to drop " colourText="a message?" />
            <form action="post" onSubmit={sendEmail} className="text-primary text-[16px] md:text-[20px] font-[500] ">
                <input type="text" placeholder="Your name" className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" value={enquiry.name} onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })} />
                <input type="text" placeholder="Your email address" className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" value={enquiry.email} onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })} />
                <input type="text" placeholder="Your course of choice" className="custom-border h-[60px] md:h-[86px] px-6 placeholder:text-[#B3B3B3] w-full" value={enquiry.course} onChange={(e) => setEnquiry({ ...enquiry, course: e.target.value })} />
                <textarea type="text" placeholder="Your message for us (if any)" className="custom-border  p-6 placeholder:text-[#B3B3B3] w-full resize-none h-[250px] " value={enquiry.message} onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })} />
                <button type="submit" className="h-[64px] md:h-[96px] flex items-center justify-center text-[20px] md:text-[28px] font-[600] bg-secondary custom-border w-full -mt-2" disabled={loading}>
                   {loading ? <BeatLoader/> : 'Send a message'} 
                </button>
            </form>

        </div>
    );
}

export default DropMessage;