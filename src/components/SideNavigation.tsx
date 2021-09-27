import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Sidenav, Nav, Sidebar, Icon } from 'rsuite';
import { IconNames } from 'rsuite/lib/Icon';

const navigations: Array<{
  icon: IconNames;
  path: string;
  name: string;
}> = [
  {
    icon: 'th2',
    path: '/',
    name: 'Test1',
  },
];

const SideNavigation = () => {
  const location = useLocation();
  const history = useHistory();
  const [toggle, setToggle] = useState(true);
  const { pathname } = location;

  const HeaderElement = () => (
    <Nav.Item
      icon={<Icon icon={toggle ? 'external-link-square' : 'gears2'} />}
      onClick={(e: any) => {
        setToggle(!toggle);
      }}
      className='noselect'
      style={{ backgroundColor: '#0f131a' }}
    >
      {!toggle ? 'Ellie Engine v0.0.1' : '-'}
    </Nav.Item>
  );

  const NavigationElements = () =>
    navigations.map(({ icon, path, name }, i) => (
      <Nav.Item
        key={i}
        icon={<Icon icon={icon} />}
        onSelect={() => history.push(path)}
        eventKey={path}
        className='noselect'
      >
        {name}
      </Nav.Item>
    ));

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
          <Nav>{HeaderElement()}</Nav>
        </Sidenav.Header>

        <Sidenav.Body style={{ height: 'calc(100%-50px)', marginTop: '50px' }}>
          <Nav activeKey={pathname}>{NavigationElements()}</Nav>
        </Sidenav.Body>
      </Sidenav>
    </Sidebar>
  );
};

export default SideNavigation;
