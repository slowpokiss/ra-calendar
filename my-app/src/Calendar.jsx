import { format, startOfDay ,startOfMonth, endOfMonth, getDay, addDays, subDays, getDaysInMonth } from 'date-fns';
import { ru, tr } from "date-fns/locale";
import "../../css/main.css";

function getWeeks(date, currDay) {
  let month = [];
  const firstDayOfMonth = getDay(startOfMonth(date))
  const lastDayOfMonth = getDay(endOfMonth(date))

  for (let i = 1; i < firstDayOfMonth; i++) {
    const prevDay = format(subDays(startOfMonth(date), i), 'd')
    month.push(<td className="ui-datepicker-other-month">{prevDay}</td>);
  }
  month = month.reverse()

  for (let i = 0; i < getDaysInMonth(date); i++) {
    const day = format(addDays(firstDayOfMonth, i), 'd');
    if (day === currDay) {
      month.push(<td className="ui-datepicker-today">{day}</td>);
    } else {
      month.push(<td>{day}</td>);
    }
  }

  if (lastDayOfMonth !== 0) {
    for (let i = 1; i < 8 - lastDayOfMonth; i++) {
      const prevDay = format(addDays(endOfMonth(date), i), 'd')
      month.push(<td className="ui-datepicker-other-month">{prevDay}</td>);
    }
  }

  return month;
}

export default function Calendar({ date }) {
  const russDate = format(date, "EEEE d MMMM yyyy", { locale: ru });
  const [currDayOfWeek, currDay, currMonth, currYear] = russDate.split(" ");
  const currMonthIP = format(date, "LLLL", { locale: ru });

  const month = getWeeks(date, currDay)
  let a = [];
  const monthByWeeks = [];
  month.forEach((el, ind) => {
    a.push(el);
    if (Number(ind + 1) % 7 === 0 && ind !== 0) {
      month.slice(ind, 7)
      monthByWeeks.push(a)
      a = [];
      return
    }
  });

  return (
    <>
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{currDayOfWeek}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{currDay}</div>
          <div className="ui-datepicker-material-month">{currMonth}</div>
          <div className="ui-datepicker-material-year">{currYear}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{currMonthIP}</span>&nbsp;
          <span className="ui-datepicker-year">{currYear}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">
              Пн
            </th>
            <th scope="col" title="Вторник">
              Вт
            </th>
            <th scope="col" title="Среда">
              Ср
            </th>
            <th scope="col" title="Четверг">
              Чт
            </th>
            <th scope="col" title="Пятница">
              Пт
            </th>
            <th scope="col" title="Суббота">
              Сб
            </th>
            <th scope="col" title="Воскресенье">
              Вс
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>{monthByWeeks[0]}</tr>
          <tr>{monthByWeeks[1]}</tr>
          <tr>{monthByWeeks[2]}</tr>
          <tr>{monthByWeeks[3]}</tr>
          <tr>{monthByWeeks[4]}</tr>
        </tbody>
      </table>
    </div>
    </>
  );
}
