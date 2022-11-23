import React ,{memo} from 'react';
import { formatDistance,formatDistanceToNow  } from 'date-fns';
import { parseISO } from 'date-fns/esm';

const TimeAgo = ({time}:any) => {

    const date= parseISO(time);
    const timePeriod= formatDistanceToNow(date)
    const timeAgo=`${timePeriod} ago`;
  return (
    <div>
     {timeAgo}
    </div>
  )
}

export default memo(TimeAgo)