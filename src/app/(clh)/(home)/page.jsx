import Achievements from "@/components/home/achievements";
import Alumni from "@/components/home/alumni";
import DropMessage from "@/components/home/drop-message";
import CoursesInDemand from "@/components/home/courses-in-demand";
import Heading from "@/components/home/heading";
import HowThingsWork from "@/components/home/how-things-work";
import Love from "@/components/home/love";
import Needs from "@/components/home/needs";
import Testimonials from "@/components/home/testimonials";

const HomePage = () => {
    return ( 
        <div className="mt-[30px]">
            <Heading/>
            <Needs/>
            <CoursesInDemand/>
            <HowThingsWork/>
            <Achievements/>
            <Love/>
            <Testimonials/>
            <Alumni/>
            <DropMessage/>
        </div>
     );
}
 
export default HomePage;