import * as React from 'react';
import { infoCard } from '../pages/Home';

export interface MyMarqueeProps {
  infoCardData: infoCard[];
}

const MyMarquee: React.SFC<MyMarqueeProps> = ({ infoCardData }) => {
  const [time] = React.useState<number>(10000);
  const [info, setInfo] = React.useState<string>('');
  const [index, setIndex] = React.useState<number>(1);

  React.useEffect(() => {
    let interval: any;

    if (infoCardData.length) {
      setInfo((inf) => (inf === '' ? infoCardData[0].note : inf));
      interval = setInterval(() => {
        setInfo(infoCardData[index].note);
        const newIndex = index + 1 < infoCardData.length ? index + 1 : 0;
        setIndex(newIndex);
      }, time);
    }

    return () => {
      if (interval !== undefined) clearInterval(interval);
    };
  }, [index, infoCardData, time]);

  return <p>{info}</p>;
};

export default MyMarquee;
