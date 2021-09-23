import { useState } from 'react';
import { Route } from 'react-router';
import { useLocation, useHistory } from 'react-router-dom';
import { Sidenav, Nav, Container, Sidebar, Icon } from 'rsuite';
import TilemapWithBuffer from './pages/TilemapWithBuffer';
import CaveGenerate from './pages/CaveGenerate';
import Viewport from './pages/Viewport';

const App = () => {
  const location = useLocation();
  const history = useHistory();
  const [toggle, setToggle] = useState(true);
  const { pathname } = location;

  return (
    <>
      <Container style={{ height: '100%' }}>
        <Sidebar
          collapsible
          width={toggle ? 0 : 250}
          style={{
            position: 'absolute',
            height: '100%',
            overflow: 'auto',
            backgroundColor: '#1a1d24',
          }}
        >
          <Sidenav>
            <Sidenav.Header
              style={{
                position: 'fixed',
                top: 0,
                height: '50px',
                width: toggle ? 50 : 250,
                zIndex: 2,
              }}
            >
              <Nav>
                <Nav.Item
                  icon={<Icon icon={toggle ? 'angle-right' : 'angle-left'} />}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setToggle(!toggle);
                  }}
                  style={{ backgroundColor: '#0f131a' }}
                >
                  Toggle
                </Nav.Item>
              </Nav>
            </Sidenav.Header>

            <Sidenav.Body
              style={{ height: 'calc(100%-50px)', marginTop: '50px' }}
            >
              <Nav activeKey={pathname}>
                <Nav.Item
                  icon={<Icon icon='gears2' />}
                  disabled
                  style={{ backgroundColor: '#0f131a' }}
                  eventKey={pathname}
                >
                  2D Platform Engine
                </Nav.Item>

                <Nav.Item
                  icon={<Icon icon='th2' />}
                  onSelect={() => history.push('/')}
                  eventKey='/'
                >
                  Tilemap With Buffer
                </Nav.Item>
                <Nav.Item
                  icon={<Icon icon='th2' />}
                  onSelect={() => history.push('/cave-generate')}
                  eventKey='/cave-generate'
                >
                  Cave Generate
                </Nav.Item>
                <Nav.Item
                  icon={<Icon icon='square-o' />}
                  onSelect={() => history.push('/viewport')}
                  eventKey='/viewport'
                >
                  Viewport
                </Nav.Item>
                <Nav.Item
                  icon={<Icon icon='tint' />}
                  onSelect={() => history.push('/liquid-simulation')}
                  eventKey='/liquid-simulation'
                  disabled
                >
                  Liquid Simulation
                </Nav.Item>
                <Nav.Item
                  icon={<Icon icon='tint' />}
                  onSelect={() => history.push('/liquid-simulation-2')}
                  eventKey='/liquid-simulation-2'
                  disabled
                >
                  Liquid Simulation 2
                </Nav.Item>
                <Nav.Item
                  icon={<Icon icon='tint' />}
                  onSelect={() => history.push('/liquid-stress-test')}
                  eventKey='/liquid-stress-test'
                  disabled
                >
                  Liquid Stress Test
                </Nav.Item>
                <Nav.Item
                  icon={<Icon icon='close' />}
                  onSelect={() => history.push('/line-intersection')}
                  eventKey='/line-intersection'
                  disabled
                >
                  Line Intersection
                </Nav.Item>
                <Nav.Item
                  icon={<Icon icon='lightbulb-o' />}
                  onSelect={() => history.push('/lighting-area')}
                  eventKey='/lighting-area'
                  disabled
                >
                  Lighting Area
                </Nav.Item>
                <Nav.Item
                  icon={<Icon icon='lightbulb-o' />}
                  onSelect={() => history.push('/lighting-area-2')}
                  eventKey='/lighting-area-2'
                  disabled
                >
                  Lighting Area 2
                </Nav.Item>
                <Nav.Item
                  icon={<Icon icon='lightbulb-o' />}
                  onSelect={() => history.push('/lighting-stress-test')}
                  eventKey='/lighting-stress-test'
                  disabled
                >
                  Lighting Stress Test
                </Nav.Item>
                <Nav.Item
                  icon={<Icon icon='lightbulb-o' />}
                  onSelect={() => history.push('/lighting-with-viewport')}
                  eventKey='/lighting-with-viewport'
                  disabled
                >
                  Lighting With Viewport
                </Nav.Item>
                <Nav.Item
                  icon={<Icon icon='object-ungroup' />}
                  onSelect={() => history.push('/aabb-collision')}
                  eventKey='/aabb-collision'
                  disabled
                >
                  AABB Collision
                </Nav.Item>
                <Nav.Item
                  icon={<Icon icon='object-ungroup' />}
                  onSelect={() => history.push('/aabb-collision-2')}
                  eventKey='/aabb-collision-2'
                  disabled
                >
                  AABB Collision 2
                </Nav.Item>
                <Nav.Item
                  icon={<Icon icon='object-ungroup' />}
                  onSelect={() => history.push('/aabb-stress-test')}
                  eventKey='/aabb-stress-test'
                  disabled
                >
                  AABB Stress Test
                </Nav.Item>

                <Nav.Item
                  icon={<Icon icon='globe' />}
                  onSelect={() => history.push('/sample-world')}
                  eventKey='/sample-world'
                  disabled
                >
                  Sample World 1
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </Sidebar>

        <Container id='content'>
          <Route exact path='/' component={TilemapWithBuffer} />
          <Route exact path='/cave-generate' component={CaveGenerate} />
          <Route exact path='/viewport' component={Viewport} />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              color: '#FFFFFF',
            }}
          >
            <a href='https://github.com/SimDaeSoo'>Created by daesoo94</a>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default App;
