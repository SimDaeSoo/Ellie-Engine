import { Route } from 'react-router';
import { Container } from 'rsuite';
import CreatorTag from './CreatorTag';
import SideNavigation from './SideNavigation';
import TilemapWithBuffer from './pages/TilemapWithBuffer';
import CaveGenerate from './pages/CaveGenerate';
import CaveGenerateWithTexture from './pages/CaveGenerateWithTexture';
import LiquidSimulation from './pages/LiquidSimulation';

const App = () => {
  return (
    <>
      <Container style={{ height: '100%' }}>
        <SideNavigation />
        <Container id='content'>
          <Route exact path='/' component={TilemapWithBuffer} />
          <Route exact path='/cave-generate' component={CaveGenerate} />
          <Route
            exact
            path='/cave-generate-texture'
            component={CaveGenerateWithTexture}
          />
          <Route exact path='/liquid-simulation' component={LiquidSimulation} />
          <CreatorTag />
        </Container>
      </Container>
    </>
  );
};

export default App;
