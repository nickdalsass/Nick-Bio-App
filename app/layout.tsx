import "./globals.css";
import "@mantine/core/styles.css";
import Link from "next/link";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  MantineProvider,
  Title,
  Group,
} from "@mantine/core";
import PageController from "./components/PageController";
import { LayoutProvider } from "./components/LayoutContext";
import ResumeViewer from "./components/ResumeViewer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
    <html lang="en">
      <body className="retro-scanlines">
<MantineProvider defaultColorScheme="light" theme={{ fontFamily: "Share Tech Mono, MS Sans Serif, Tahoma, sans-serif" }}>
            <LayoutProvider>
            <AppShell ff={"inherit"} header={{ height: { base: 110, md: 100 } }}>
            <AppShellHeader
              className="app-shell-header"
              withBorder={false}
              style={{
                background: "#000080",
                color: "#fff",
                borderBottom: "2px solid #000080",
                boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              <Group justify="space-between" align="center" wrap="wrap" gap="xs" className="header-group" style={{ height: "100%" }}>
                <Link href="/" className="header-home-link" style={{ textDecoration: "none" }}>
                <Title
                  ff={"inherit"}
                  c={"#fff"}
                  size={42}
                  className="header-title"
                  style={{
                    padding: "12px 20px",
                    fontSize: "clamp(1.25rem, 3vw, 2.625rem)",
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                >
                  Nicholas Dalsass
                </Title>
              </Link>
                <div className="header-nav-wrap">
                  <PageController />
                </div>
              </Group>
            </AppShellHeader>
            <AppShellMain
              style={{
                overflowY: "auto",
                background: "#c0c0c0",
                borderTop: "2px solid #fff",
                boxShadow: "inset 2px 2px 0 #fff, inset -2px -2px 0 #404040",
              }}
            >
              {children}
              <ResumeViewer />
            </AppShellMain>
          </AppShell>
            </LayoutProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
