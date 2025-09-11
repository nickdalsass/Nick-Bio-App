import './globals.css';
import '@mantine/core/styles.css';
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  MantineProvider,
  Title,
  SegmentedControl,
} from '@mantine/core';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <MantineProvider defaultColorScheme='dark'>
          <AppShell
            ff={'JetBrains Mono, monospace'}
            header={{ height: 120 }}
          >
            <AppShellHeader
              bg={'#d3d3d3'}
              withBorder={false}
              className='header-blur-edge'
              style={{ padding: 0, margin: 0 }}
            >
              <Title
                ff={'inherit'}
                c={'transparent'}
                size={42}
                style={{ padding: 20, WebkitTextStroke: '2px black' }}
              >
                Nicholas Dalsass
              </Title>
              <SegmentedControl
                size={'lg'}
                radius={'lg'}
                mr={20}
                withItemsBorders={false}
                bg={'#d3d3d3'}
                styles={{
                  label: { color: '#222' },
                  indicator: { backgroundColor: 'rgba(0, 0, 0, 0.12)' },
                }}
                data={['Home', 'Projects', 'Articles', 'Connect']}
              />
            </AppShellHeader>
            <AppShellMain>{children}</AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
