import CircularGallery from './blocks/Components/CircularGallery/CircularGallery'
import { NavbarDemo } from "./components/NavbarDemo"
import WrapButton from "./components/ui/wrap-button"
import { TextReveal } from "@/components/magicui/text-reveal"
import TiltedCard from "./blocks/Components/TiltedCard/TiltedCard"
import { RestaurantMenu } from "./components/updatedCompo/RestaurantMenu"
import BlurGallery from "./components/Gallery"
import Footer from "./components/Footer"
import { motion } from 'framer-motion';
import { TextAnimate } from './components/magicui/text-animate'

export default function App() {
  const charVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: index * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <main>
      <div className="fixed inset-0 -z-10">
        <img src="./bg7.png" alt="" className='w-full h-full' />
      </div>
      <div className="relative z-10">
        <nav className="w-full pt-5">
          <NavbarDemo />
        </nav>

        <div className="mt-20 flex justify-center">
          <div className="w-full flex flex-wrap justify-center">
            {"TODAY I'M FEELING...".split('').map((char, index) => (
              <motion.span
                key={index}
                className="font-bold text-4xl lg:text-8xl  text-white"
                variants={charVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </div>



        <div className="h-[600px]">
          <CircularGallery
            bend={typeof window !== "undefined" && window.innerWidth >= 1024 ? 3 : 0.2}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>

        <div className="p-10 text-white flex justify-center">
          <a href="#menu">
            <WrapButton className="w-84 text-3xl font-bold flex justify-center">
              ORDER NOW
            </WrapButton>
          </a>
        </div>

        <div id='about' className="mt-28 px-10 lg:px-20 flex flex-col md:flex-row justify-start gap-10 items-start">
          <TiltedCard
            imageSrc="./cas-owner.jpg"
            altText="CIRCLE & SLICE"
            captionText="CIRCLE & SLICE"
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
          />
          <div>
            <TextAnimate animation="blurInUp" by="character" once className='text-5xl font-bold text-emerald-400'>
              CIRCLE & SLICE
            </TextAnimate>
            <TextReveal className="font-normal">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos quo nihil itaque similique ad dignissimos
              quisquam asperiores laudantium deleniti laborum, a magnam placeat. Dolore, reiciendis sint iste earum
              voluptatem repellendus! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </TextReveal>
          </div>
        </div>

        <div id='menu'>
          <TextAnimate animation="blurInUp" by="character" once className='mt-20 text-5xl font-bold text-emerald-400 mx-20'>
            OUR MENU
          </TextAnimate>
        </div>

        <div className="w-full flex justify-center items-start">
          <RestaurantMenu />
        </div>

        <div id="gallery">
          <TextAnimate animation="blurInUp" by="character" once className='mt-20 text-5xl font-bold text-emerald-400 mx-5 lg:mx-15'>
            OUR GALLERY
          </TextAnimate>
        </div>


        <div className="mt-10 mx-5 lg:mx-16 flex justify-center items-start">
          <BlurGallery />
        </div>

        <div className="w-full text-white mt-28">
          <Footer />
        </div>
      </div>
    </main>
  )
}
