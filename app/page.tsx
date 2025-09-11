import HomePage from './components/HomePage';
import { MantineProvider } from '@mantine/core';

export default function Home() {
  return (
    <MantineProvider>
      <HomePage />
    </MantineProvider>
  );
}
