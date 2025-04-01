import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";

  export function mapTimestampToDate(timestamp: Timestamp) {
    return timestamp ? dayjs.unix(timestamp?.seconds).toDate() : undefined;
  }

  export function mapDateToTimestamp(date: Date) {
    return Timestamp.fromDate(date);
  }