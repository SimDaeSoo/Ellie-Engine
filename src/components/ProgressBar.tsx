import { Progress } from 'rsuite';

const ProgressBar = ({
  hide,
  asset,
  percentage,
}: {
  hide: boolean;
  asset: string;
  percentage: number;
}) => {
  return (
    <div
      style={{
        width: '100%',
        position: 'absolute',
        bottom: '20px',
        opacity: hide ? 0 : 1,
        transitionProperty: 'opacity',
        transitionDuration: '1s',
      }}
    >
      <div style={{ width: '100%', textAlign: 'center' }} className='noselect'>
        Loading Asset : {asset}
      </div>
      <Progress.Line
        className='notransition'
        percent={percentage}
        status={percentage === 100 ? 'success' : 'active'}
      />
    </div>
  );
};

export default ProgressBar;
