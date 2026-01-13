'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample gallery images - Replace with your actual photos
const galleryImages = [
  {
    id: 1,
    src: 'images/mancare_1.jpg',
    category: 'food',
    title: 'Cataif'
  },
  {
    id: 2,
    src: 'images/mancare_2.jpg',
    category: 'food',
    title: 'Gratar'
  },
  {
    id: 3,
    src: 'images/mancare_3.jpg',
    category: 'food',
    title: 'Sunca'
  },
  {
    id: 4,
    src: 'images/mancare_4.jpg',
    category: 'food',
    title: 'Kurtos'
  },
  {
    id: 5,
    src: 'images/nunta_1.jpg',
    category: 'wedding',
    title: 'Nunta'
  },
  {
    id: 6,
    src: 'images/nunta_2.jpg',
    category: 'wedding',
    title: 'Nunta'
  },
  {
    id: 7,
    src: 'images/random_1.jpg',
    category: 'random',
    title: 'La patinuar'
  },
  {
    id: 8,
    src: 'images/random_2.jpg',
    category: 'random',
    title: 'Elf'
  },
  {
    id: 9,
    src: 'images/concert_1.jpg',
    category: 'concert',
    title: 'Folk Frate'
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const galleryRef = useRef<HTMLElement>(null);

  const categories = ['all', 'food', 'concert', 'wedding', 'random'];

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  // Pagination calculations
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedImages = filteredImages.slice(startIndex, startIndex + itemsPerPage);
  const shouldShowPagination = totalPages > 1;

  const slides = filteredImages.map(img => ({ src: img.src }));

  // Handle responsive items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(4); // Mobile: 4 items
      } else {
        setItemsPerPage(8); // Desktop: 8 items
      }
    };

    // Set initial value
    updateItemsPerPage();

    // Add event listener for window resize
    window.addEventListener('resize', updateItemsPerPage);

    // Cleanup
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Reset to page 1 when category changes or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, itemsPerPage]);

  // Scroll to top of gallery when page changes
  useEffect(() => {
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section ref={galleryRef} id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Galerie</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Exploreaza colectia mea de momente capturat in diferite genuri
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-900 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {paginatedImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => {
                setCurrentImageIndex(index);
                setLightboxOpen(true);
              }}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white font-medium text-lg">{image.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination Controls */}
        {shouldShowPagination && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center items-center gap-2 mt-12"
          >
            {/* Previous Button */}
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className={`p-2 rounded-full border transition-all ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageSelect(page)}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`w-10 h-10 rounded-full font-medium transition-all ${
                  currentPage === page
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className={`p-2 rounded-full border transition-all ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentImageIndex}
        slides={slides}
      />
    </section>
  );
}
