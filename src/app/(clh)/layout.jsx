import Footer from "@/components/footer";
import TopNav from "@/components/top-nav";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col w-full h-full overflow-x-hidden relative">
            <TopNav />
            <div className="flex-1">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;