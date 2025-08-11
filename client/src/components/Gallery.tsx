import { BlurFade } from "./magicui/blur-fade"
import { images } from "@/constant"


export default function BlurGallery() {
    return (
        <section>
            <div className="columns-2 gap-4 sm:columns-3">
                {images.map((image, idx) => (
                    <BlurFade key={image.src} delay={0.25 + idx * 0.05} inView>
                        <img
                            className="mb-4 size-full rounded-lg object-contain"
                            src={image.src}
                            alt={image.alt}
                        />
                    </BlurFade>
                ))}
            </div>
        </section>
    )
}