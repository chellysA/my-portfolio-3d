import React from "react";
import { Skills } from "../constants/Skills";
import { Languages } from "../constants/Languages";
import { certifications } from "../constants/certifications";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom } from "./Projects";
import { currentCertificationAtom } from "./Certifications";
import cvChellys from "../assets/cvChellys.pdf";

const Section = (props) => {
  const { children, mobileTop } = props;
  return (
    <motion.section
      className={`min-h-screen w-screen px-6 sm:px-10 mx-auto flex flex-col items-start pointer-events-none ${
        mobileTop
          ? "justify-start mt-6 md:mt-0 md:justify-center"
          : "justify-center"
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay: 0.3 },
      }}
    >
      {children}
    </motion.section>
  );
};
export const Interface = ({ setSection }) => {
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <SkillsSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection />
    </div>
  );
};

const AboutSection = ({ setSection }) => {
  return (
    <Section mobileTop>
      <div className="pointer-events-auto max-w-md">
        <h1 className="text-gray-700 text-5xl md:text-6xl font-extrabold mb-4 leading-snug">
          Hi, I'm <br />
          <span className="text-yellow-500/30 italic bg-white px-4 pb-1">
            {" "}
            Chellys{" "}
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 1 },
          }}
          className="text-base text-gray-700"
        >
          A web developer with a passion for learning.
        </motion.p>
        <button
          className="bg-purple-700/50 text-white py-2 md:py-4 px-6 md:px-8 rounded-lg font-bold text-base md:text-lg mt-4"
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            setSection(4);
          }}
        >
          Contact me
        </button>
      </div>
    </Section>
  );
};
const SkillsSection = () => {
  return (
    <Section>
      <div className="pointer-events-auto w-full">
        <motion.div whileInView={"visible"}>
          <h2 className="text-2xl font-bold">Skills</h2>
          <div className="mt-2 space-y-2">
            {Skills.map((skill, index) => (
              <div className="w-64" key={index}>
                <motion.h3
                  initial={{ opacity: 0 }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: { duration: 1, delay: 0.5 + index * 0.2 },
                    },
                  }}
                  className="text-sm font-bold"
                >
                  {skill.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-200 rounded-full mt-1">
                  <motion.div
                    initial={{ scaleX: 0, originX: 0 }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 0.5 + index * 0.2,
                        },
                      },
                    }}
                    className="h-full bg-purple-500/50 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-bold mt-4 mb-2">Languages</h2>
            <div className="space-y-2">
              {Languages.map((language, index) => (
                <div className="w-64" key={index}>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    variants={{
                      visible: {
                        opacity: 1,
                        transition: { duration: 1, delay: 1 + index * 0.2 },
                      },
                    }}
                    className="text-sm font-bold text-gray-800"
                  >
                    {language.name}
                  </motion.h3>
                  <div className="h-2 w-full bg-gray-200 rounded-full mt-1">
                    <motion.div
                      initial={{ scaleX: 0, originX: 0 }}
                      variants={{
                        visible: {
                          scaleX: 1,
                          transition: {
                            duration: 1,
                            delay: 2 + index * 0.2,
                          },
                        },
                      }}
                      className="h-full bg-purple-500/50 rounded-full"
                      style={{ width: `${language.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
const BubbleArrow = ({ direction, onClick }) => {
  const isLeft = direction === "left";
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center p-2 md:p-4 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2"
      style={{
        boxShadow: "0 4px 14px rgba(208, 148, 236, 0.5)",
      }}
      whileHover={{
        scale: 1.12,
        boxShadow: "0 6px 20px rgba(255, 182, 206, 0.65)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      aria-label={isLeft ? "Proyecto anterior" : "Siguiente proyecto"}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className={isLeft ? "" : "rotate-180"}
        style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" }}
      >
        <path
          d="M15 18l-6-6 6-6"
          stroke="rgba(126, 34, 206, 0.85)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <div className="pointer-events-auto w-full">
        <div className="flex w-full h-full gap-6 md:gap-10 items-center justify-center mt-80">
          <BubbleArrow direction="left" onClick={previousProject} />
          <h2 className="text-2xl md:text-5xl font-bold">Projects</h2>
          <BubbleArrow direction="right" onClick={nextProject} />
        </div>
      </div>
    </Section>
  );
};

const CertificationsSection = () => {
  const [currentCertification, setCurrentCertification] = useAtom(
    currentCertificationAtom,
  );

  const nextCertification = () => {
    setCurrentCertification((currentCertification + 1) % certifications.length);
  };

  const previousCertification = () => {
    setCurrentCertification(
      (currentCertification - 1 + certifications.length) %
        certifications.length,
    );
  };

  return (
    <Section>
      <div className="pointer-events-auto w-full">
        <div className="flex w-full h-full gap-6 md:gap-10 items-center justify-center mt-80">
          <BubbleArrow direction="left" onClick={previousCertification} />
          <h2 className="text-2xl md:text-5xl font-bold">Certifications</h2>
          <BubbleArrow direction="right" onClick={nextCertification} />
        </div>
      </div>
    </Section>
  );
};

const ContactSection = () => {
  return (
    <Section>
      <div className="pointer-events-auto h-[90vh] w-full flex flex-col items-start justify-center">
        <h2 className="text-5xl font-bold">Let&apos;s connect</h2>
        <p className="mt-4 text-gray-600 max-w-md">
          I&apos;m always happy to talk about new projects, collaborations or
          just say hi.
        </p>
        <div className="mt-6 flex flex-col md:flex-row md:flex-wrap gap-4 justify-start text-center">
          <a
            href="https://github.com/chellysA"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-white shadow-md text-gray-800 font-semibold hover:bg-yellow-200/50 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/chellys-castillo/"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-white shadow-md text-gray-800 font-semibold hover:bg-yellow-200/50 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=chellys.castillo@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-purple-600/60 text-white font-semibold shadow-md hover:bg-yellow-200/50 transition-colors"
          >
            Email me
          </a>
          <a
            href={cvChellys}
            download="cvChellysCastillo"
            target="_blank"
            rel="noreferrer"
            className="px-4 md:px-6 py-3 rounded-full bg-white shadow-md text-gray-800 font-semibold hover:bg-yellow-200/50 transition-colors"
          >
            Download CV
          </a>
        </div>
      </div>
    </Section>
  );
};
