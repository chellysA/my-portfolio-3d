import React from "react";
import { Skills } from "../constants/Skills";
import { Languages } from "../constants/Languages";
import { motion } from "framer-motion";
const Section = (props) => {
  const { children } = props;
  return (
    <motion.section
      className="min-h-screen w-screen px-10 mx-auto flex flex-col items-start justify-center"
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
export const Interface = () => {
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection />
      <SkillsSection />
      <Section>Projects</Section>
      <ContactSection />
    </div>
  );
};

const AboutSection = () => {
  return (
    <Section>
      <h1 className="text-6xl font-extrabold leading-snug">
        Hi, I'm <br />
        <span className="text-purple-300 italic">Chellys</span>
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 1, delay: 1 },
        }}
      >
        A web developer with a passion for learning.
      </motion.p>
      <button className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-4">
        Contact me
      </button>
    </Section>
  );
};

const SkillsSection = () => {
  return (
    <Section>
      <motion.div whileInView={"visible"}>
        <h2 className="text-3xl font-bold">Skills</h2>
        <div className="mt-4 space-y-4">
          {Skills.map((skill, index) => (
            <div className="w-64" key={index}>
              <motion.h3
                initial={{ opacity: 0 }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: { duration: 1, delay: 1 + index * 0.2 },
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
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-3xl font-bold mt-6">Languages</h2>
          <div className="mt-4 space-y-4">
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
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${language.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};
const ContactSection = () => {
  return (
    <Section>
      <div className="h-[90vh]">
        <h2 className="text-5xl font-bold">Contact me</h2>
        <div className="mt-8 p-8 rounded-md bg-white w-96 max-w-full">
          <form>
            <label for="name" className="font-medium text-gray-900 block mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full h-10 rounded-md border-0 text-gray-900 shadow-sm mb-2"
            />

            <label for="email" className="font-medium text-gray-900 block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full h-10 rounded-md border-0 text-gray-900 shadow-sm mb-2"
            />

            <label
              for="message"
              className="font-medium text-gray-900 block mb-1"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm"
              rows="3"
            ></textarea>

            <button
              type="submit"
              className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
};
