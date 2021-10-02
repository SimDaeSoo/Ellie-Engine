import { useState } from 'react';
import { Sidenav, Dropdown, Nav, Sidebar, Icon } from 'rsuite';
import { IconNames } from 'rsuite/lib/Icon';

const navigations: Array<{
  icon: IconNames;
  name: string;
  subNavigations?: Array<{ icon: IconNames; name: string }>;
}> = [
  {
    icon: 'th2',
    name: 'Create Blocks',
    subNavigations: [
      {
        icon: 'th2',
        name: 'Hard Block',
      },
      {
        icon: 'th2',
        name: 'Soft Block',
      },
    ],
  },
  {
    icon: 'th2',
    name: 'Create Blocks',
  },
];

const SideNavigation = () => {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [toggle, setToggle] = useState(true);

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
    navigations.map(({ icon, name, subNavigations }, i) =>
      subNavigations ? (
        <Dropdown
          key={i}
          icon={<Icon icon={icon} />}
          eventKey={name}
          className='noselect'
          title={name}
        >
          {subNavigations.map(({ icon, name }, i) => (
            <Dropdown.Item
              key={i}
              icon={<Icon icon={icon} />}
              onSelect={() => setSelectedMenu(name)}
              eventKey={name}
              className='noselect'
            >
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown>
      ) : (
        <Nav.Item
          key={i}
          icon={<Icon icon={icon} />}
          onSelect={() => setSelectedMenu(name)}
          eventKey={name}
          className='noselect'
        >
          {name}
        </Nav.Item>
      )
    );

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
          <Nav activeKey={selectedMenu}>{NavigationElements()}</Nav>
        </Sidenav.Body>
      </Sidenav>
    </Sidebar>
  );
};

export default SideNavigation;
