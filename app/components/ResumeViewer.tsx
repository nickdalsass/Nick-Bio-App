"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Paper, Text, Group, UnstyledButton, Loader } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const RESUME_PATH = "/resume.pdf";

export default function ResumeViewer() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [phaseInComplete, setPhaseInComplete] = useState(false);
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 47.99em)");
  const hideOnMobile = isMobile && (pathname === "/projects" || pathname === "/articles");

  useEffect(() => setMounted(true), []);

  const handleOpen = () => {
    setOpen(true);
    setPdfLoading(true);
    setPhaseInComplete(false);
  };

  useEffect(() => {
    if (!open) return;
    const fallback = setTimeout(() => setPdfLoading(false), 2500);
    return () => clearTimeout(fallback);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Floating button - hidden on mobile Projects/Articles pages */}
      {!hideOnMobile && (
        <div
          style={{
            position: "fixed",
            right: 20,
            bottom: 24,
            zIndex: 100,
          }}
        >
          <UnstyledButton onClick={handleOpen} style={{ display: "block" }}>
            <Paper
              p="sm"
              radius={0}
              style={{
                border: "2px solid",
                borderColor: "#fff #404040 #404040 #fff",
                boxShadow: "inset 1px 1px 0 #fff, 2px 2px 4px rgba(0,0,0,0.2)",
                background: "#c0c0c0",
                cursor: "pointer",
              }}
            >
              <Group gap="xs" wrap="nowrap">
                <span style={{ fontSize: "1.25rem" }}>📄</span>
                <Text size="sm" fw={600}>
                  My Resume
                </Text>
              </Group>
            </Paper>
          </UnstyledButton>
        </div>
      )}

      {/* Modal - rendered via portal */}
      {mounted && open &&
        createPortal(
          <>
            <div
              onClick={handleClose}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                zIndex: 200,
                cursor: "pointer",
              }}
            />
            <div
              style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 201,
                pointerEvents: "none",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                onAnimationComplete={() => setPhaseInComplete(true)}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "min(95vw, 900px)",
                  height: "90vh",
                  display: "flex",
                  flexDirection: "column",
                  pointerEvents: "auto",
                  position: "relative",
                }}
              >
                {!phaseInComplete && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#c0c0c0",
                      zIndex: 2,
                    }}
                  >
                    <Loader size="lg" color="gray" />
                  </div>
                )}
                {/* Win95 title bar */}
                <Group
                  justify="space-between"
                  align="center"
                  style={{
                    padding: "4px 6px",
                    background: "#000080",
                    color: "#fff",
                    border: "1px solid #fff",
                    borderBottom: "none",
                    minHeight: 28,
                  }}
                >
                  <Group gap="xs">
                    <span style={{ fontSize: "1rem" }}>📄</span>
                    <Text size="sm" fw={600}>
                      Resume - Nicholas Dalsass
                    </Text>
                  </Group>
                  <UnstyledButton
                    onClick={handleClose}
                    style={{
                      width: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#c0c0c0",
                      border: "1px solid",
                      borderColor: "#fff #404040 #404040 #fff",
                      color: "#000",
                      fontSize: "0.75rem",
                      lineHeight: 1,
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </UnstyledButton>
                </Group>

                {/* Window content */}
                <Paper
                  style={{
                    flex: 1,
                    minHeight: 0,
                    border: "2px solid",
                    borderColor: "#fff #404040 #404040 #fff",
                    boxShadow: "inset 1px 1px 0 #fff",
                    background: "#fff",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      minHeight: 0,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {pdfLoading && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#fff",
                          zIndex: 1,
                        }}
                      >
                        <Loader size="lg" color="gray" />
                      </div>
                    )}
                    <iframe
                      src={RESUME_PATH}
                      title="Resume"
                      onLoad={() => setPdfLoading(false)}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        border: "none",
                        display: "block",
                      }}
                    />
                  </div>
                  <Group
                    justify="flex-end"
                    p="sm"
                    style={{
                      borderTop: "1px solid #808080",
                      background: "#c0c0c0",
                    }}
                  >
                    <UnstyledButton
                      component="a"
                      href={RESUME_PATH}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: "4px 12px",
                        background: "#c0c0c0",
                        border: "2px solid",
                        borderColor: "#fff #404040 #404040 #fff",
                        boxShadow: "inset 1px 1px 0 #fff",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                      }}
                    >
                      Open in new tab
                    </UnstyledButton>
                    <UnstyledButton
                      onClick={handleClose}
                      style={{
                        padding: "4px 12px",
                        background: "#c0c0c0",
                        border: "2px solid",
                        borderColor: "#fff #404040 #404040 #fff",
                        boxShadow: "inset 1px 1px 0 #fff",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                      }}
                    >
                      Close
                    </UnstyledButton>
                  </Group>
                </Paper>
              </motion.div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}
