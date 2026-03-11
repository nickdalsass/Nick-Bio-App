"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Stack, Title, Container, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { motion, AnimatePresence } from "motion/react";

const subtitleVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const HomeOverlay = () => {
  const [showEducation, setShowEducation] = useState(false);
  const isMobile = useMediaQuery("(max-width: 47.99em)");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      setShowEducation(true);
      interval = setInterval(() => setShowEducation((p) => !p), 6000);
    }, 5000);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, []);
  return (
    <div className="home-page-wrapper">
      <Container size="lg" px={{ base: 16, sm: 20, md: 24 }} className="home-page-container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 0.1 },
            },
            hidden: {},
          }}
        >
          <Stack
            align="center"
            justify="center"
            gap="md"
            className="home-stack"
          >
        <motion.div
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 },
          }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          style={{ position: "relative" }}
          onDragStart={(e) => e.preventDefault()}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: 8,
              background: "transparent",
              filter: "blur(8px)",
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="home-avatar">
            <Image
              src="/LinkedInHeadshot.jpeg"
              alt="Nicholas Dalsass"
              width={560}
              height={560}
              sizes="(max-width: 48em) 200px, 280px"
              quality={95}
              priority
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
          </div>
        </motion.div>

        <Stack align="center" gap="xs">
          <motion.div
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 16 },
            }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              style={{ cursor: "default" }}
            >
              <Title
                order={1}
                size="2.5rem"
                fw={500}
                ff="inherit"
                ta="center"
              >
                Nicholas Dalsass
                <span style={{ animation: "blink 1s step-end infinite", marginLeft: 2 }}>|</span>
              </Title>
            </motion.div>
          </motion.div>
          <motion.div
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 12 },
            }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              style={{ cursor: "default" }}
            >
              <Stack align="center" gap={4} style={{ minHeight: 48 }}>
                <AnimatePresence mode="wait" initial={false}>
                  {showEducation ? (
                    <motion.div
                      key="education"
                      variants={subtitleVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <Text
                        size={isMobile ? "sm" : "lg"}
                        c="dark"
                        ff="inherit"
                        ta="center"
                        style={isMobile ? undefined : { whiteSpace: "nowrap" }}
                      >
                        CUA Junior · CS, Math & Philosophy
                      </Text>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="developer"
                      variants={subtitleVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <Text
                        size={isMobile ? "sm" : "lg"}
                        c="dark"
                        ff="inherit"
                        ta="center"
                        style={isMobile ? undefined : { whiteSpace: "nowrap" }}
                      >
                        Software Developer
                      </Text>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Stack>
            </motion.div>
          </motion.div>
        </Stack>
          </Stack>
        </motion.div>
      </Container>
    </div>
  );
};

export default HomeOverlay;
