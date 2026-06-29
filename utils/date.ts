const date = new Date();

const day = date.getDate();
const month = date.toLocaleString('en-US', { month: 'long' });
const year = date.getFullYear();

const formattedDateToday = `${day} ${month}, ${year}`;

export { formattedDateToday };
// export function formattedDateToClick(daysToClick: number) {

//   return `${daysToClick} ${month}, ${year}`;
// }

export const formattedDateToClick = `${month} ${year}`
export const formattedDateisClicked = `${month}, ${year}`
