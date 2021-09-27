import { useEffect, useState } from 'react';
import { Route } from 'react-router';
import { Container } from 'rsuite';
import CreatorTag from './components/CreatorTag';
import SideNavigation from './components/SideNavigation';
import Tilemap from './pages/Tilemap';

const App = () => {
  const [callback, setCallback] = useState<(x: number, y: number) => void>();

  useEffect(() => {
    (async () => {
      const onTouch = (e: any) => {
        const [x, y] = [
          (e.targetTouches[0].clientX / window.innerWidth) * window.innerWidth,
          (e.targetTouches[0].clientY / window.innerHeight) *
            window.innerHeight,
        ];
        if (callback) callback(x, y);
      };
      const onClick = (e: any) => {
        const [x, y] = [
          (e.clientX / window.innerWidth) * window.innerWidth,
          (e.clientY / window.innerHeight) * window.innerHeight,
        ];
        if (callback) callback(x, y);
      };
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('click', onClick);
      window.addEventListener('touchstart', onTouch);
      window.addEventListener('click', onClick);
    })();
  }, [callback]);

  return (
    <>
      <Container style={{ height: '100%' }}>
        <Container id='content'>
          <Route
            exact
            path='/'
            render={() => <Tilemap setCallback={(cb) => setCallback(cb)} />}
          />
          <CreatorTag />
        </Container>
        <SideNavigation />
      </Container>
    </>
  );
};

export default App;
