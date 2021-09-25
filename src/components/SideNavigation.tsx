import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Sidenav, Nav, Sidebar, Icon } from 'rsuite';

const SideNavigation = () => {
  const location = useLocation();
  const history = useHistory();
  const [toggle, setToggle] = useState(true);
  const { pathname } = location;

  return (
    <Sidebar
      collapsible
      width={toggle ? 0 : 250}
      style={{
        position: 'absolute',
        height: '100%',
        overflow: 'auto',
        backgroundColor: '#1a1d24',
      }}
      onClick={(e: any) => {
        e.stopPropagation();
      }}
      onTouchStart={(e: any) => {
        e.stopPropagation();
      }}
    >
      <Sidenav>
        <Sidenav.Header
          style={{
            position: 'fixed',
            top: 0,
            height: '50px',
            width: toggle ? 56 : 250,
            zIndex: 2,
          }}
        >
          <Nav>
            <Nav.Item
              icon={<Icon icon={toggle ? 'external-link-square' : 'gears2'} />}
              onClick={(e: any) => {
                setToggle(!toggle);
              }}
              style={{ backgroundColor: '#0f131a' }}
            >
              {!toggle ? 'Ellie Engine v0.0.1' : '-'}
            </Nav.Item>
          </Nav>
        </Sidenav.Header>

        <Sidenav.Body style={{ height: 'calc(100%-50px)', marginTop: '50px' }}>
          <Nav activeKey={pathname}>
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
              icon={<Icon icon='th2' />}
              onSelect={() => history.push('/cave-generate-texture')}
              eventKey='/cave-generate-texture'
            >
              Cave With Texture
            </Nav.Item>
            <Nav.Item
              icon={<Icon icon='tint' />}
              onSelect={() => history.push('/liquid-simulation')}
              eventKey='/liquid-simulation'
            >
              Liquid Simulation
            </Nav.Item>
            <Nav.Item
              icon={<Icon icon='tint' />}
              onSelect={() => history.push('/liquid-simulation-2')}
              eventKey='/liquid-simulation-2'
            >
              Liquid Simulation 2
            </Nav.Item>
            <Nav.Item
              icon={<Icon icon='tint' />}
              onSelect={() => history.push('/liquid-stress-test')}
              eventKey='/liquid-stress-test'
            >
              Liquid Stress Test
            </Nav.Item>
            <Nav.Item
              icon={<Icon icon='close' />}
              onSelect={() => history.push('/line-intersection')}
              eventKey='/line-intersection'
            >
              Line Intersection
            </Nav.Item>
            <Nav.Item
              icon={<Icon icon='close' />}
              onSelect={() => history.push('/line-intersection-2')}
              eventKey='/line-intersection-2'
            >
              Line Intersection 2
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
              Sample World
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </Sidebar>
  );
};

export default SideNavigation;
