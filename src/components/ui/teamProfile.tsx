"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Image from "next/image";
import { Linkedin } from "lucide-react";

export function TeamProfile() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                    <a
                      href={
                        typeof active.linkedin === "string"
                          ? active.linkedin
                          : "https://www.linkedin.com"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin
                        size={20}
                        color="white"
                        className="bg-[#0077B5] p-1 w-auto h-auto rounded-sm mt-5"
                      />
                    </a>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-[#0F1F1C] text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400  [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="mx-auto max-w-5xl gap-8 pt-12 flex flex-col items-center">
        <div className="flex justify-center gap-8">
          {cards.slice(0, 2).map((card, index) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={card.title}
              onClick={() => setActive(card)}
              className="p-4 group relative w-[300px] overflow-hidden hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col w-full ">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <Image
                    width={200}
                    height={200}
                    src={card.src}
                    alt={card.title}
                    className="h-72 w-full rounded-lg object-cover object-top"
                  />
                </motion.div>
                <div className="flex justify-center items-center flex-col ">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-medium text-neutral-800 dark:text-neutral-200 mb-3 text-center text-base"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-center text-base"
                  >
                    {card.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-8">
          {cards.slice(2).map((card, index) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={card.title}
              onClick={() => setActive(card)}
              className="p-4 group relative w-[300px] overflow-hidden hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col w-full ">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <Image
                    width={200}
                    height={200}
                    src={card.src}
                    alt={card.title}
                    className="h-72 w-full rounded-lg object-cover object-top"
                  />
                </motion.div>
                <div className="flex justify-center items-center flex-col ">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-medium text-neutral-800 dark:text-neutral-200 mb-3 text-center text-base"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-center text-base"
                  >
                    {card.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description:
      "Associate Professor of Operations Research & Engineering Management",
    title: "Eli Olinick, Ph.D",
    src: "/olinickeli.jpeg",
    ctaText: "More",
    ctaLink:
      "https://www.smu.edu/lyle/departments/orem/people/faculty/olinick-eli",
    linkedin: "https://www.linkedin.com/in/eli-olinick-6ab0541/",
    content: () => {
      return (
        <p>
          Eli V. Olinick is an Associate Professor in the Department of
          Operations Research and Engineering Management at SMU&apos;s Bobby B.
          Lyle School of Engineering. He completed his B.S. in Applied
          Mathematics at Brown University and earned his M.S. and Ph.D. in
          Industrial Engineering and Operations Research at the University of
          California at Berkeley.
        </p>
      );
    },
  },
  {
    description: "M.S. in Management Science and Ph.D. in Operations Research",
    title: "YuanYuan Dong",
    src: "/Yuanyuan (Angela).JPG",
    ctaText: "More",
    ctaLink: "https://www.linkedin.com/in/yuanyuan-dong-profile/",
    linkedin: "https://www.linkedin.com/in/yuanyuan-dong-profile/",
    content: () => {
      return (
        <p>
          Yuanyuan (Angela) Dong received B.S. (2003) in Civil Aviation
          Transportation Management from Nanjing University of Aeronautics and
          Astronautics, M.S. (2006) in Management Science from Nanjing
          University, and Ph.D. (2015) in Operations Research from Southern
          Methodist University (SMU). She worked on ground transportation as an
          operations research scientist at Amazon from 2016 to 2018. After being
          an independent researcher from 2019 to 2022, she became the
          postdoctoral researcher at SMU from 2023 to 2025. Her research
          interest includes applied optimization, heuristics, logistics and
          supply chain management, vehicle routing problem, and network
          problems.
        </p>
      );
    },
  },
  {
    description: "Ph.D candidate in Mathematics",
    title: "Daniel Ryan",
    src: "/Daniel-Ryan.jpg",
    ctaText: "More",
    ctaLink: "https://djryn.github.io",
    linkedin: "https://www.linkedin.com/in/danieljosephryan/",
    content: () => {
      return (
        <p>
          Daniel Ryan began on this project as an undergraduate at SMU as a part
          of the SURF program with the Lyle School of Engineering. He later
          completed his B.A. in Mathematics, Computer Science, and Music at SMU
          and is currently pursuing his Ph.D. in Mathematics at North Carolina
          State University.
        </p>
      );
    },
  },

  {
    description: "B.S. in Computer Science and Data Science",
    title: "Tran Lam",
    src: "/Tran-Lam-Headshot.jpg",
    ctaText: "More",
    ctaLink:
      "https://blog.smu.edu/saes/2025/01/29/undergraduate-research-student-spotlight-tran-lam/",
    linkedin: "https://www.linkedin.com/in/tranlam06/",
    content: () => {
      return (
        <p>
          Tran Lam is pursuing a B.S. in Computer Science and Data Science at
          Southern Methodist University. Through the URI program under Engage
          Learning, Tran became involved in the research on the Backhaul Profit
          Maximization Problem (BPMP), focusing on optimizing algorithms to
          enhance efficiency. In addition to developing faster problem-solving
          techniques, Tran is also working on a web-based visualization platform
          to make the research more accessible and engaging for a broader
          audience.
        </p>
      );
    },
  },
  {
    description: "B.S. in Management Science and Data Science",
    title: "Sreshta Ghosh",
    src: "/Sreshta-Ghosh.jpeg",
    ctaText: "More",
    ctaLink: "https://www.linkedin.com/in/sreshtaghosh/",
    linkedin: "https://www.linkedin.com/in/sreshtaghosh/",
    content: () => {
      return (
        <p>
          Sreshta Ghosh is an honors student at Southern Methodist University,
          pursuing a B.S. in Management Science and Data Science with a minor in
          Business. She is actively involved in research on the Backhaul Profit
          Maximization Problem (BPMP), focusing on expanding the algorithm to
          multiple vehicles. Beyond her research, Sreshta is a member of the
          Society of Women Engineers, the SMU Belletones, and the SMU Crafts
          Club.
        </p>
      );
    },
  },
];
