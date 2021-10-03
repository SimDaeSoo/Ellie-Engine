import { Icon } from 'rsuite';

const CreatorTag = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 2,
        right: 2,
        textAlign: 'right',
      }}
      className='noselect'
    >
      <div
        style={{
          color: '#FFFFFF',
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '1px 4px',
          display: 'inline-block',
          borderRadius: '4px',
          marginBottom: '2px',
        }}
      >
        <Icon icon={'github'} style={{ marginRight: '6px' }} />
        <a href='https://github.com/SimDaeSoo'>Created by daesoo94</a>
      </div>
      <div
        style={{
          color: '#FFFFFF',
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '1px 4px',
          borderRadius: '4px',
        }}
      >
        <span>IOS Mobile can only run single-threaded.</span>
      </div>
    </div>
  );
};

export default CreatorTag;
