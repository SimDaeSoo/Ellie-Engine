import { useEffect } from 'react';
import { Route } from 'react-router';
import { Container } from 'rsuite';
import Stats from 'stats.js';
import CreatorTag from './components/CreatorTag';
import SideNavigation from './components/SideNavigation';
import RandomTile from './pages/RandomTile';

let callback: (x: number, y: number) => void;
const setCallback = (cb: (x: number, y: number) => void) => {
  callback = cb;
};

let updater: () => void;
const setUpdater = (cb: () => void) => {
  updater = cb;
};

const App = () => {
  useEffect(() => {
    const onTouch = (e: any) => {
      const [x, y] = [
        (e.targetTouches[0].clientX / window.innerWidth) * window.innerWidth,
        (e.targetTouches[0].clientY / window.innerHeight) * window.innerHeight,
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

    const dom: HTMLElement = document.getElementById('content') as HTMLElement;
    const stats: Stats = new Stats();
    stats.dom.style.right = '0';
    stats.dom.style.removeProperty('left');
    dom.appendChild(stats.dom);

    const render = async () => {
      if (updater) await updater();
      stats.update();
      window.requestAnimationFrame(render);
    };

    window.requestAnimationFrame(render);
  }, []);

  return (
    <>
      <Container style={{ height: '100%' }}>
        <Container id='content'>
          <Route
            exact
            path='/'
            render={() => (
              <RandomTile
                setCallback={(cb) => setCallback(cb)}
                setUpdater={(cb) => setUpdater(cb)}
              />
            )}
          />
          <CreatorTag />
        </Container>
        <SideNavigation />
      </Container>
    </>
  );
};

export default App;
