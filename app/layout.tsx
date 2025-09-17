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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
    <html lang="en">
      <body>
        <MantineProvider defaultColorScheme="dark">
          <AppShell ff={"JetBrains Mono, monospace"} header={{ height: 100 }}>
            <AppShellHeader withBorder={false} bg={"#d3d3d3"}>
              <Group justify="space-between" align="center" style={{ height: '100%' }}>
                <Title
                  ff={"inherit"}
                  c={"#222"}
                  size={42}
                  style={{ padding: 20 }}
                >
                  Nicholas Dalsass
                </Title>
                <PageController />
              </Group>
            </AppShellHeader>
            <AppShellMain>{children}</AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
