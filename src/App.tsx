import { useEffect } from 'react';
import { Container } from 'rsuite';
import Stats from 'stats.js';
import CreatorTag from './components/CreatorTag';
import SideNavigation from './components/SideNavigation';
import Main from './pages/Main';
import { setController, setMouseEventCallback, updater, setUpdater, setMenuSelectCallback } from './utils';

const App = () => {
  const isWide = window.innerWidth >= 768;

  useEffect(() => {
    const dom: HTMLElement = document.getElementById('content') as HTMLElement;
    const stats: Stats = new Stats();
    stats.dom.style.right = '0';
    stats.dom.style.removeProperty('left');
    stats.dom.className += 'noselect';
    dom.appendChild(stats.dom);

    setController();

    const render = async () => {
      if (updater) await updater();
      stats.update();
      window.requestAnimationFrame(render);
    };

    window.requestAnimationFrame(render);
  }, [isWide]);

  return (
    <>
      <Container style={{ height: '100%' }}>
        <Container
          id='content'
          style={{
            marginLeft: isWide ? '220px' : 0,
            height: '100%',
          }}
        >
          <Main
            setMouseEventCallback={(cb) => setMouseEventCallback(cb, isWide)}
            setMenuSelectCallback={(cb) => setMenuSelectCallback(cb)}
            setUpdater={(cb) => setUpdater(cb)}
          />
          <CreatorTag />
        </Container>
        <SideNavigation isWide={isWide} />
      </Container>
    </>
  );
};

export default App;
