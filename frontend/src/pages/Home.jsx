import { useEffect, useState } from "react";
import { getStates, getFestivals, getHotels, getGuides } from "@/utils/api";
import SectionRow from "@/components/SectionRow";
import HeroCarousel from "@/components/HeroCarousel";
import ChatBox from "@/components/ChatBox";
import TravelQuiz from "@/components/TravelQuiz";
import { motion } from "framer-motion";

export default function Home() {
  const [states, setStates] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    getStates().then((res) => setStates(res.data));
    getFestivals().then((res) => setFestivals(res.data));
    getHotels().then((res) => setHotels(res.data));
    getGuides().then((res) => setGuides(res.data));
  }, []);

  const heroImages = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
  ];

  return (
    <div className="bg-[#2E1F13] min-h-screen text-white">
      {/* Hero Carousel */}
      <div className="py-6 px-4 md:px-12">
        <HeroCarousel images={heroImages} />
      </div>

      {/* States Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="px-4 md:px-12 mt-6"
      >
        <h2 className="text-3xl font-bold mb-4 border-b-4 border-[#C19A6B] w-fit pb-2">
          States of India
        </h2>
        <SectionRow title="States of India" data={states} type="state" />
      </motion.div>

      {/* Festivals Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="px-4 md:px-12 mt-10"
      >
        <h2 className="text-3xl font-bold mb-4 border-b-4 border-[#C19A6B] w-fit pb-2">
          Festivals of India
        </h2>
        <SectionRow title="Festivals of India" data={festivals} type="festival" />
      </motion.div>

      {/* Optional: Hotels & Guides */}
      {/* <motion.div className="px-4 md:px-12 mt-10">
        <SectionRow title="Hotels" data={hotels} type="hotel" />
      </motion.div>
      <motion.div className="px-4 md:px-12 mt-10">
        <SectionRow title="Guides" data={guides} type="guide" />
      </motion.div> */}

      {/* Floating ChatBox & TravelQuiz */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <TravelQuiz />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
        >
          <ChatBox />
        </motion.div>
      </div>
    </div>
  );
}
