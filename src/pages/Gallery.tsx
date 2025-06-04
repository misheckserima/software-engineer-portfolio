import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const images = [
    {
      id: 1,
      src: "/gallery/1.png",
      alt: "Professional Portrait",
      caption: "Professional headshot in blue blazer"
    },
    {
      id: 2,
      src: "/gallery/2.png",
      alt: "Casual Moments",
      caption: "Group photo with friends outdoors"
    },
    {
      id: 3,
      src: "/gallery/4.png",
      alt: "Street Style",
      caption: "Urban style portrait"
    },
    {
      id: 4,
      src: "/gallery/7.png",
      alt: "Adventure Ready",
      caption: "Outdoor adventure style"
    },
    {
      id: 5,
      src: "/gallery/8.png",
      alt: "Visionary",
      caption: "Looking up inspiration"
    },
    {
      id: 6,
      src: "/gallery/9.png",
      alt: "Natural Pose",
      caption: "Casual sitting portrait"
    },
    {
      id: 7,
      src: "/gallery/11.png",
      alt: "Professional Style",
      caption: "Business casual portrait"
    },
    {
      id: 8,
      src: "/gallery/12.png",
      alt: "Modern Look",
      caption: "Contemporary studio portrait"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
  };

  const selectImage = (index: number) => {
    setSelectedImage(index);
    setIsAutoPlaying(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            My Gallery
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            A collection of my professional and personal photographs showcasing different looks and styles for various occasions.
          </p>
        </div>

        {/* Main Slideshow */}
        <Card className="mb-12 overflow-hidden bg-white/90 backdrop-blur-md border-slate-200 shadow-2xl">
          <div className="relative">
            <div className="h-[420px] md:h-[560px] bg-gray-100 flex items-center justify-center">
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="w-full h-full object-cover object-[center_25%]"
              />
              
              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md hover:bg-white/90 border-white/40"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md hover:bg-white/90 border-white/40"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Image Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {images[selectedImage].caption}
                </h3>
                <p className="text-white/80">
                  {selectedImage + 1} of {images.length}
                </p>
              </div>

              {/* Auto-play indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-white text-sm bg-black/30 px-2 py-1 rounded">
                  {isAutoPlaying ? 'Auto' : 'Manual'}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Thumbnail Navigation */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-center text-slate-800">Browse Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <Card 
                key={image.id}
                className={`overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedImage === index 
                    ? 'ring-4 ring-blue-500 shadow-xl scale-105' 
                    : 'hover:shadow-lg hover:scale-102 opacity-70 hover:opacity-100'
                } bg-white/90 backdrop-blur-md border-slate-200`}
                onClick={() => selectImage(index)}
              >
                <div className="aspect-square bg-gray-100 p-2 flex items-center justify-center">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="max-w-[85%] max-h-[85%] w-auto h-auto object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Gallery Controls */}
        <div className="flex justify-center gap-4 mb-12">
          <Button
            variant={isAutoPlaying ? "default" : "outline"}
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isAutoPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
          </Button>
        </div>

        {/* About the Photos Section */}
        <Card className="bg-white/90 backdrop-blur-md border-slate-200 shadow-lg">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              About These Photos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-600">
              <div>
                <p className="mb-4">
                  This collection captures different aspects of my personality and professional demeanor. 
                  Each image tells a story, from professional headshots to candid moments that showcase authenticity.
                </p>
                <p>
                  From corporate portraits to creative lifestyle shots, this gallery represents the versatility 
                  and attention to detail that I bring to all my professional endeavors.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Photo Collection:</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Professional and lifestyle photography</li>
                  <li>• Multiple environments and settings</li>
                  <li>• Various clothing styles and moods</li>
                  <li>• Studio and outdoor locations</li>
                  <li>• Perfect for corporate and creative use</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Gallery;
