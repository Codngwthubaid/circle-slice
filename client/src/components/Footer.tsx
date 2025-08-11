import { Instagram } from 'lucide-react';
import { FaTiktok } from "react-icons/fa6";
import { Button } from '@/components/ui/button';

export default function Footer() {
    return (
        <footer className="w-full bg-transparent px-4 py-6 mt-10">
            <div className="flex justify-between items-center flex-wrap gap-4 navbar-font">
                {/* <FlipLink href="#">C&S</FlipLink> */}
                <FooterLogo/>

                <div className="flex gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <Instagram className="size-7 text-white" />
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                            <FaTiktok className="size-6 text-white" />
                        </a>
                    </Button>
                </div>
            </div>
        </footer>
    );
}

const FooterLogo = () => {
    return (
      <a
        href="#"
        className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
      >
        <span className="text-white text-5xl font-medium">CIRCLE&SLICE</span>
      </a>
    );
  };