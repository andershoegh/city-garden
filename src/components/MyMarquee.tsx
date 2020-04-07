import * as React from 'react';
import { infoCard } from '../pages/Home';
import Marquee from 'marquee-react-dwyer';

export interface MyMarqueeProps {
  infoCardData: infoCard[];
}

const MyMarquee: React.SFC<MyMarqueeProps> = ({ infoCardData }) => {
  const [time] = React.useState<string>('10000');
  const textDecider = (index: Number) =>
    index < infoCardData.length ? infoCardData[index.toFixed()].note : '';

  return (
    <>
      {infoCardData.length ? (
        <Marquee
          Size={'h6'}
          NumberOfOptions={infoCardData.length.toString()}
          Index0={textDecider(0)}
          Index1={textDecider(1)}
          Index2={textDecider(2)}
          Index3={textDecider(3)}
          Index4={textDecider(4)}
          Index5={textDecider(5)}
          Index6={textDecider(6)}
          Index7={textDecider(7)}
          Index8={textDecider(8)}
          TimeToCross={time}
          TimeToChange={time}
          IsRandom={'false'}
          Color={'black'}
        />
      ) : null}
    </>
  );
};

export default MyMarquee;
