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

const App = () => {
  const [percentage, setPercentage] = useState(0);
  const [asset, setAsset] = useState('');
  const [hide, setHide] = useState(false);

  useEffect(() => {
    (async () => {
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
          {hide && <Route exact path='/' component={TilemapWithBuffer} />}
          {hide && (
            <Route exact path='/cave-generate' component={CaveGenerate} />
          )}
          {hide && (
            <Route
              exact
              path='/cave-generate-texture'
              component={CaveGenerateWithTexture}
            />
          )}
          {hide && (
            <Route
              exact
              path='/liquid-simulation'
              component={LiquidSimulation}
            />
          )}
          {hide && (
            <Route
              exact
              path='/liquid-simulation-2'
              component={LiquidSimulation2}
            />
          )}
          {hide && (
            <Route
              exact
              path='/liquid-stress-test'
              component={LiquidStressTest}
            />
          )}
          {hide && (
            <Route
              exact
              path='/line-intersection'
              component={LineIntersection}
            />
          )}
          {hide && (
            <Route
              exact
              path='/line-intersection-2'
              component={LineIntersection2}
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
