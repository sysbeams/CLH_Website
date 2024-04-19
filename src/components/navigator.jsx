import Link from "next/link";
import { RiHomeSmile2Fill } from "react-icons/ri";


const Navigator = ({ links = []}) => {
    return (
        <div className="p-[20px] md:px-[50px] custom-border flex items-center text-[16px] text-[#999999] font-[600]">
            <Link href="/">
                <div className="flex items-center gap-1">
                    <RiHomeSmile2Fill fill="#179FC9" size={25} />
                    <span>Home</span>
                </div>
            </Link>
            {
                links.map((l, index) =>
                    <Link href={l.url} key={Math.random()*76}>
                        <span className="ml-2">{">  "}<span className={` whitespace-nowrap ${index+1 == links.length ? "text-primary" :""}`}>{l.title}</span></span>
                    </Link>
                )
            }
        </div>
    );
}

export default Navigator;