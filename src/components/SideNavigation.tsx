import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useEffect, useState } from 'react';
import { Sidenav, Dropdown, Nav, Sidebar, Icon } from 'rsuite';
import { NAVIGATIONS, MENU_TYPES } from '../constants';
import { menuSelectCallback } from '../utils';

const HeaderElement = ({ toggle, onClick }: { toggle: boolean; onClick: () => void }) => (
  <Sidenav.Header
    style={{
      position: 'fixed',
      top: 0,
      height: 52,
      width: 130,
      zIndex: 2,
      backgroundColor: '#0f131a',
      borderRadius: '12px',
      border: '#555555 1px solid',
      margin: '5px',
      overflow: 'hidden',
      display: !toggle ? 'none' : '',
    }}
  >
    <Nav>
      <Nav.Item icon={<Icon icon={'bars'} />} onClick={onClick} className='noselect'>
        Menus
      </Nav.Item>
    </Nav>
  </Sidenav.Header>
);

const SideNavigation = ({ isWide }: { isWide: boolean }) => {
  const [selectedMenus, setSelectedMenus] = useState(['Play', 'Dirt Block', '25px', '3x', '']);
  const [toggle, setToggle] = useState(isWide ? false : true);

  const onSelectMenu = (i: number, name: string, type: MENU_TYPES) => {
    if (!isWide) {
      setToggle(!toggle);
      const content = document.getElementById('sidebar') as HTMLElement;
      disableBodyScroll(content);
    }

    const newSelecteds = [...selectedMenus];
    newSelecteds[i] = name;

    setSelectedMenus(newSelecteds);
    menuSelectCallback(type);
  };

  useEffect(() => {
    const content = document.getElementById('sidebar') as HTMLElement;
    disableBodyScroll(content);
  }, []);

  const NavigationElements = () =>
    NAVIGATIONS.map(({ icon, name, type, subNavigations }, i) =>
      subNavigations ? (
        <Nav activeKey={selectedMenus[i]} key={i}>
          <Dropdown icon={<Icon icon={icon} />} eventKey={name} className='noselect' title={name} noCaret={true} open={true}>
            {subNavigations.map(({ name, type }, j) => (
              <Dropdown.Item key={j} icon={<Icon icon='caret-right' />} onSelect={(name) => onSelectMenu(i, name, type)} eventKey={name} className='noselect'>
                {name}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </Nav>
      ) : (
        <Nav key={i}>
          <Nav.Item icon={<Icon icon={icon} />} onSelect={(name) => onSelectMenu(i, name, type)} eventKey={name} className='noselect'>
            {name}
          </Nav.Item>
        </Nav>
      )
    );

  return (
    <Sidebar
      collapsible
      id='sidebar'
      width={toggle ? 0 : 220}
      style={{
        position: 'absolute',
        height: '100%',
        overflow: 'auto',
        backgroundColor: '#1a1d24',
      }}
      onMouseDown={(e: any) => {
        e.stopPropagation();
      }}
      onTouchStart={(e: any) => {
        e.stopPropagation();
      }}
    >
      <Sidenav defaultOpenKeys={NAVIGATIONS.map(({ name }) => name)}>
        <HeaderElement
          toggle={toggle}
          onClick={() => {
            setToggle(!toggle);
            const content = document.getElementById('sidebar') as HTMLElement;
            enableBodyScroll(content);
          }}
        />
        <Sidenav.Body style={{ height: '100%' }}>
          <Nav activeKey='header'>
            <Nav.Item icon={<Icon icon='play' />} disabled className='noselect' style={{ backgroundColor: '#202020' }}>
              Playground
            </Nav.Item>
          </Nav>
          {NavigationElements()}

          <div
            style={{
              margin: '20px',
              color: '#333344',
              textAlign: 'center',
            }}
            className='noselect'
          >
            Ellie Engine v0.0.0
          </div>
        </Sidenav.Body>
      </Sidenav>
    </Sidebar>
  );
};

export default SideNavigation;
