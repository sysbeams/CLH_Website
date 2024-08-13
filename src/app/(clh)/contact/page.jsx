import Heading from "@/components/contact/heading";
import DropMessage from "@/components/home/drop-message";

export const metadata = {
    title: "CLH - Contact Us",
    description: "Get in touch with Code Learners Hub for any inquiries, support, or collaboration opportunities. We're here to assist you on your journey to becoming an industry-ready software developer. Reach out to our team today and let's connect!",
    keywords: "Contact Code Learners Hub, Get in touch, Tech training support, Contact us for coding inquiries, Developer education contact, Reach out to Code Learners Hub, Support and inquiries, Connect with us, clh, Code Learners Hub",
  };
const ContactPage = () => {
    
    return ( 
        <div>
            <Heading/>
            <DropMessage/>
        </div>
     );
}
 
export default ContactPage;