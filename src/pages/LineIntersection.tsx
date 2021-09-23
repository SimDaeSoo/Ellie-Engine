import { useState, useEffect } from 'react';
import { Progress } from 'rsuite';
import { preload, setRenderer, setUpdater } from '../utils';

const LineIntersection = () => {
  const [percentage, setPercentage] = useState(0);
  const [asset, setAsset] = useState('');
  const [hide, setHide] = useState(false);

  useEffect(() => {
    (async () => {
      setRenderer();
      await preload((percentage: number, assetName: string) => {
        setPercentage(Math.floor(percentage * 100));
        setAsset(assetName);
      });
      setHide(true);
      setUpdater(() => {});
    })();
  }, []);

  return (
    <>
      {
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
          <div
            style={{ width: '100%', textAlign: 'center' }}
            className='noselect'
          >
            Loading Asset : {asset}
          </div>
          <Progress.Line
            percent={percentage}
            status={percentage === 100 ? 'success' : 'active'}
          />
        </div>
      }
    </>
  );
};

export default LineIntersection;
