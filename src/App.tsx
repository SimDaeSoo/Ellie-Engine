import { useEffect, useState } from 'react';
import { Route } from 'react-router';
import { Container } from 'rsuite';
import { preload, setRenderer } from './utils';
import CreatorTag from './components/CreatorTag';
import SideNavigation from './components/SideNavigation';
import ProgressBar from './components/ProgressBar';
import TilemapWithBuffer from './pages/TilemapWithBuffer';
import CaveGenerate from './pages/CaveGenerate';
import CaveGenerateWithTexture from './pages/CaveGenerateWithTexture';
import LiquidSimulation from './pages/LiquidSimulation';
import LiquidSimulation2 from './pages/LiquidSimulation2';
import LiquidStressTest from './pages/LiquidStressTest';
import LineIntersection from './pages/LineIntersection';
import LineIntersection2 from './pages/LineIntersection2';

let callback: (x: number, y: number) => void;

const App = () => {
  const [percentage, setPercentage] = useState(0);
  const [asset, setAsset] = useState('');
  const [hide, setHide] = useState(false);

  useEffect(() => {
    (async () => {
      // Event Listener
      const onTouch = (e: any) => {
        const [x, y] = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
        if (callback) callback(x, y);
      };
      const onClick = (e: any) => {
        const [x, y] = [e.clientX, e.clientY];
        if (callback) callback(x, y);
      };
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('click', onClick);
      window.addEventListener('touchstart', onTouch);
      window.addEventListener('click', onClick);

      setHide(false);
      setRenderer();
      await preload((percentage: number, assetName: string) => {
        setPercentage(Math.round(percentage * 100));
        setAsset(assetName);
      });
      setHide(true);
    })();
  }, []);

  return (
    <>
      <Container style={{ height: '100%' }}>
        <Container id='content'>
          {hide && (
            <Route
              exact
              path='/'
              render={() => (
                <TilemapWithBuffer setCallback={(cb) => (callback = cb)} />
              )}
            />
          )}
          {hide && (
            <Route
              exact
              path='/cave-generate'
              render={() => (
                <CaveGenerate setCallback={(cb) => (callback = cb)} />
              )}
            />
          )}
          {hide && (
            <Route
              exact
              path='/cave-generate-texture'
              render={() => (
                <CaveGenerateWithTexture
                  setCallback={(cb) => (callback = cb)}
                />
              )}
            />
          )}
          {hide && (
            <Route
              exact
              path='/liquid-simulation'
              render={() => (
                <LiquidSimulation setCallback={(cb) => (callback = cb)} />
              )}
            />
          )}
          {hide && (
            <Route
              exact
              path='/liquid-simulation-2'
              render={() => (
                <LiquidSimulation2 setCallback={(cb) => (callback = cb)} />
              )}
            />
          )}
          {hide && (
            <Route
              exact
              path='/liquid-stress-test'
              render={() => (
                <LiquidStressTest setCallback={(cb) => (callback = cb)} />
              )}
            />
          )}
          {hide && (
            <Route
              exact
              path='/line-intersection'
              render={() => (
                <LineIntersection setCallback={(cb) => (callback = cb)} />
              )}
            />
          )}
          {hide && (
            <Route
              exact
              path='/line-intersection-2'
              render={() => (
                <LineIntersection2 setCallback={(cb) => (callback = cb)} />
              )}
            />
          )}
          <CreatorTag />
        </Container>
        <ProgressBar hide={hide} asset={asset} percentage={percentage} />
        <SideNavigation />
      </Container>
    </>
  );
};

export default App;
