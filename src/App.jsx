
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import HTMLFlipBook from "react-pageflip";
// No import needed here - images in public folder are accessed directly

const pages = [
  {
    id: 1,
    title: "A New Beginning",
    body: `It all started with a simple dream... and a lonely journey that was about to change everything.`,
    images: ["/img1.jpeg"]
  },
  { 
    id: 2,
    title: "Finding a Place",
    body: `Among countless streams, I found one that felt different — like I finally belonged.`,
    images: ["/img2.jpeg"]
  },
  {
    id: 3,
    title: "Unexpected Bonds",
    body: `What started as strangers slowly turned into friendships I never knew I needed.`,
    images: ["/img3.jpeg"]
  },
  {
    id: 4,
    title: "A Name, A Story",
    body: `“Our Group” wasn’t just a name — it became a part of who I am today.`,
    images: ["/img4.jpeg"]
  },
  {
    id: 5,
    title: "Moments That Matter",
    body: `Through laughter, chaos, and memories… every moment became unforgettable.`,
    images: ["/img5.jpeg"]
  },
  {
    id: 6,
    title: "More Than a Community",
    body: `This was never just a stream — it became a family I’m proud to be part of.`,
    images: ["/img6.jpeg"]
  },
  {
    id: 7,
    title: "Forever Grateful",
    body: `Some journeys end… but the memories, the people, and the feelings stay forever.`,
    images: ''
  },
  {
    id: 8,
    title: "Prepared By",
    body: `Mr.Allah Rakha`,
    images: ''
  }
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [visited, setVisited] = useState(new Set([0]));
  const [giftOpened, setGiftOpened] = useState(false);

  const audioRef = useRef(null);
  const bookRef = useRef();

  const markVisited = (i) => {
    setVisited((prev) => {
      const newSet = new Set(prev);
      newSet.add(i);
      return newSet;
    });
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const nextPage = () => {
    bookRef.current.pageFlip().flipNext();
  };

  const prevPage = () => {
    bookRef.current.pageFlip().flipPrev();
  };

  // ✅ FIX: react-pageflip uses spreads (2 pages at once)
  const allVisited = visited.size >= pages.length;

  return (
    <div className="font-sans">
      <audio ref={audioRef} src="/page-flip.mp3" preload="auto" />

      {/* Intro */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-100 to-rose-100 text-center relative overflow-hidden">

        {/* Background floating icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 35 }).map((_, i) => {
            const icons = ["👋", "✨", "💖", "🎉", "🌸", "💫", "🤍"];

            // FIX: distribute using percentages (NOT window size)
            const left = Math.random() * 100;   // %
            const top = Math.random() * 100;    // %
            const size = Math.random() * 24 + 16;

            return (
              <motion.span
                key={i}
                className="absolute"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  fontSize: `${size}px`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  y: [0, -80, -160],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                  scale: [0.5, 1.2, 0.8],
                }}
                transition={{
                  duration: Math.random() * 6 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut",
                }}
              >
                {icons[i % icons.length]}
              </motion.span>
            );
          })}
        </div>

        {/* Foreground text */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl font-bold z-10"
        >
         Scroll down to discover the story ↓
        </motion.h1>
      </section>

      {/* Book Container - This handles the "Desktop Size" issue */}
      <section className="flex flex-col items-center justify-space-between p-4 md:p-10 bg-gradient-to-b from-rose-100 to-pink-200">

        {/* The "Cover" Wrapper */}
        <div className="relative w-full h-full overflow-hidden max-w-[500px] lg:max-w-[900px] aspect-[3/4] md:aspect-[3/2] bg-[#4a3225] p-2 md:p-4 rounded-xl shadow-2xl">

          <HTMLFlipBook
            width={500}
            height={650}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={(e) => {
              const i = e.data;
              setIndex(i);
              markVisited(i);
              markVisited(i + 1);
              playSound();
            }}
            ref={bookRef}
            className="book-main"
          >
            {/* FRONT COVER */}
            <div className="w-full h-full">
              <img
                src="/cover.png" // ← replace with your image
                alt="cover"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            {pages.map((page, i) => (
              <div
                key={page.id}
                className="bg-[#f4e4bc] relative flex flex-col items-center p-6 md:p-12 shadow-inner border-l border-black/10"
                dir="rtl"
              >
                {/* Header Badge from your design */}
                {/* <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-[#fffcf5] border border-[#e2d2b1] px-4 py-1 rounded-full shadow-sm text-xs md:text-sm text-[#8a7a5a]">
                  {page.badge}
                </div> */}

                {/* Page Number */}
                <div className="absolute top-4 left-6 text-xl font-serif text-grey-500 opacity-50">
                  {i + 1}
                </div>

                {/* Content */}
                <div className="mt-12 w-full flex flex-col items-center">
                  {page.title && (
                    <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#5d4a37]">{page.title}</h2>
                  )}

                  {page.images.length > 0 && (
                    <div className="w-full mb-6">
                      <img
                        src={page.images[0]}
                        alt="memory"
                        className="w-full h-50 md:h-64 object-cover rounded-md shadow-md sepia-[0.3]"
                      />
                    </div>
                  )}

                  <p className="text-[#5d4a37] text-base md:text-lg leading-relaxed text-left w-full">
                    {page.body}
                  </p>
                </div>

                {/* Spine Shadow Effect */}
                <div className={`absolute top-0 bottom-0 w-12 pointer-events-none ${i % 2 === 0 ? 'left-0 bg-gradient-to-r from-black/10 to-transparent' : 'right-0 bg-gradient-to-l from-black/10 to-transparent'}`} />
              </div>
            ))}
          </HTMLFlipBook>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-10 mb-20">
          <button onClick={() => bookRef.current.pageFlip().flipPrev()} className="bg-white p-4 rounded-full shadow-lg hover:bg-rose-50 transition-colors">
            <FiChevronLeft size={24} className="text-[#4a3225]" />
          </button>

          <span className="text-lg font-medium text-[#4a3225]">
            {index + 1} / {pages.length}
          </span>

          <button onClick={() => bookRef.current.pageFlip().flipNext()} className="bg-white p-4 rounded-full shadow-lg hover:bg-rose-50 transition-colors">
            <FiChevronRight size={24} className="text-[#4a3225]" />
          </button>
        </div>
      </section>

      {/* Gift Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-200 to-rose-300 relative overflow-hidden">
{/* Background floating icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 35 }).map((_, i) => {
            const icons = ["👋", "✨", "💖", "🎉", "🌸", "💫", "🤍"];

            // FIX: distribute using percentages (NOT window size)
            const left = Math.random() * 100;   // %
            const top = Math.random() * 100;    // %
            const size = Math.random() * 24 + 16;

            return (
              <motion.span
                key={i}
                className="absolute"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  fontSize: `${size}px`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  y: [0, -80, -160],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                  scale: [0.5, 1.2, 0.8],
                }}
                transition={{
                  duration: Math.random() * 6 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut",
                }}
              >
                {icons[i % icons.length]}
              </motion.span>
            );
          })}
        </div>
        {!allVisited ? (
          <p className="text-lg">📖 Read all the pages to unlock the gift</p>
        ) : (
          <div className="flex flex-col items-center">

            {/* Hint before opening */}
            {!giftOpened && (
              <p className="text-sm mb-4 opacity-70 animate-pulse text-center">
                👇 Click on the gift to unlock the surprise
              </p>
            )}

            {/* Gift button */}
            <motion.button
              onClick={() => setGiftOpened(true)}
              whileTap={{ scale: 0.9 }}
              className="text-7xl mb-10"
            >
              🎁
            </motion.button>

            {/* Firework burst + celebration */}
            {giftOpened && (
              <div className=" flex items-center justify-center pointer-events-none">

                {/* Center celebration */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-7xl animate-bounce z-10 mt-10"
                >
                  🎉💖✨
                </motion.div>

                {/* Burst emojis */}
                {Array.from({ length: 30 }).map((_, i) => {
                  const emojis = ["🎉", "🎊", "💖", "✨", "🎗", "📢", "🎷", "🎺", "🎸", "💫"];
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        x: (Math.random() - 0.5) * 1500,
                        y: (Math.random() - 0.5) * 1500,
                      }}
                      transition={{ duration: 2.2, delay: i * 0.02 }}
                      className="absolute text-3xl"
                    >
                      {emojis[i % emojis.length]}
                    </motion.span>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
