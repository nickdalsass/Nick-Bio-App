import "./globals.css";
import "@mantine/core/styles.css";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
    <html lang="en">
      <body>
<MantineProvider defaultColorScheme="light" theme={{ fontFamily: "Share Tech Mono, MS Sans Serif, Tahoma, sans-serif" }}>
            <LayoutProvider>
            <AppShell ff={"inherit"} header={{ height: { base: 70, md: 100 } }}>
            <AppShellHeader
              withBorder={false}
              style={{
                background: "#000080",
                color: "#fff",
                borderBottom: "2px solid #000080",
                boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              <Group justify="space-between" align="center" wrap="wrap" gap="md" style={{ height: '100%', padding: '0 12px' }}>
                <Title
                  ff={"inherit"}
                  c={"#fff"}
                  size={42}
                  style={{ padding: "12px 20px", fontSize: "clamp(1.25rem, 3vw, 2.625rem)" }}
                >
                  Nicholas Dalsass
                </Title>
                <PageController />
              </Group>
            </AppShellHeader>
            <AppShellMain
              style={{
                overflowY: "auto",
                background: "#c0c0c0",
                margin: 8,
                border: "2px solid",
                borderColor: "#fff #404040 #404040 #fff",
                boxShadow: "inset 1px 1px 0 #fff",
              }}
            >
              {children}
            </AppShellMain>
          </AppShell>
            </LayoutProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
