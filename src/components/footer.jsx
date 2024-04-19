import Link from "next/link";

const Footer = () => {

    const socials = [
        {
            name: "LinkedIn",
            url: "#",
        },
        {
            name: "Instagram",
            url: "#",
        },
        {
            name: "X",
            url: "#",
        },
        {
            name: "Pinterest",
            url: "#",
        },

    ]
    return (
        <div className="px-[20px] md:px-[50px] text-primary">
            <div className="w-full custom-border h-[70px] md:h-[90px]"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 ">
                {
                    socials.map(s =>
                        <div key={Math.random() * 34} className="h-[80px] md:h-[96px] custom-border flex  items-center justify-center text-[20px] md:text-[24px] font-[600]">
                            <Link href={s.url} >
                                {s.name}
                            </Link>
                        </div>
                    )
                }
            </div>
            <div className="py-[40px] text-center custom-border">
                <span className="text-[18px]">
                    Codelearnershub is a registered trademark of Sysbeams. <br/>© 2021-2024 Sysbeams, Inc.
                </span>
            </div>
        </div>
    );
}

export default Footer;