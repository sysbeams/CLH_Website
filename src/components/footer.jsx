import Link from "next/link";

const Footer = () => {

    const socials = [
        {
            name: "Facebook",
            url: "https://www.facebook.com/codelearnershub?mibextid=ZbWKwL",
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/codelearnershub_?igsh=MW5wZWRqM3RiNGdwbw==",
        },
        {
            name: "X",
            url: "https://x.com/CodelearnersHub?t=03hsA5y3Atr4758HtAxoWw&s=09",
        },
        {
            name: "Youtube",
            url: "https://youtube.com/@codelearnershub1054?si=VuGZSHbDY3MJkPVT",
        },

    ]
    return (
        <div className="px-[20px] md:px-[50px] text-primary">
            <div className="w-full custom-border h-[70px] md:h-[90px]"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 ">
                {
                    socials.map(s =>
                        <div key={Math.random() * 34} className="h-[80px] md:h-[96px] custom-border flex  items-center justify-center text-[20px] md:text-[24px] font-[600]">
                            <Link href={s.url} target="_blank" >
                                {s.name}
                            </Link>
                        </div>
                    )
                }
            </div>
            <div className="py-10 flex flex-col gap-4 text-center custom-border">

                <div className="mt-2 text-[16px]">
                    <span className="block font-[600]">For enquiries:</span>
                    <span className="block">Whatsapp: <Link href="https://wa.me/2347034612192" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" title="Chat on Whatsapp"> +2347034612192</Link>  ,
                        <Link href="https://wa.me/2347031001461" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" title="Chat on Whatsapp">  +2347031001461</Link>
                    </span>
                    <span className="block mt-1">
                        Email:  <Link href="mailto:codelearnershub@gmail.com" className="text-blue-600 hover:underline" title="Send an email">  codelearnershub@gmail.com</Link>
                    </span>
                </div>

                <span className="text-[18px] ">
                    Codelearnershub is a registered trademark of Sysbeams. <br />© 2021-2024 Sysbeams, Inc.
                </span>

            </div>
        </div>
    );
}

export default Footer;