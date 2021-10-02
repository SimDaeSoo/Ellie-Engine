import { Icon } from 'rsuite';

const CreatorTag = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        color: '#FFFFFF',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '1px 4px',
      }}
      className='noselect'
    >
      <Icon icon={'github'} style={{ marginRight: '6px' }} />
      <a href='https://github.com/SimDaeSoo'>Created by daesoo94</a>
    </div>
  );
};

export default CreatorTag;
