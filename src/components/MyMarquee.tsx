import * as React from 'react';
import { infoCard } from '../pages/Home';
import Marquee from 'marquee-react-dwyer';

export interface MyMarqueeProps {
  infoCardData: infoCard[];
}

const MyMarquee: React.SFC<MyMarqueeProps> = ({ infoCardData }) => {
  const textOrAuthor: Boolean[] = [true, false];
  const [time] = React.useState<string>('10000');
  const textDecider = (bool: Boolean, index: Number) =>
    index < infoCardData.length
      ? bool
        ? infoCardData[index.toFixed()].note
        : infoCardData[index.toFixed()].author
      : '';

  return (
    <>
      {infoCardData.length && Number(time)
        ? textOrAuthor.map((bool: Boolean, index: Number) => (
            <Marquee
              key={index}
              Size={'h6'}
              NumberOfOptions={infoCardData.length.toString()}
              Index0={textDecider(bool, 0)}
              Index1={textDecider(bool, 1)}
              Index2={textDecider(bool, 2)}
              Index3={textDecider(bool, 3)}
              Index4={textDecider(bool, 4)}
              Index5={textDecider(bool, 5)}
              Index6={textDecider(bool, 6)}
              Index7={textDecider(bool, 7)}
              Index8={textDecider(bool, 8)}
              TimeToCross={time}
              TimeToChange={time}
              IsRandom={'false'}
              Color={'black'}
            />
          ))
        : null}
    </>
  );
};

export default MyMarquee;
