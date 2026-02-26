import Calendar from 'react-calendar';
import '../../style/CalendarSection.css';
import '../../style/Calendar.css';

export default function CalendarSection() {
  return (
    <div className='calendar-section'>
      <Calendar
        showNavigation={true}
        navigationLabel={() => (
          <div className="custom-nav-label">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="nav-month">9</span>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span className="nav-year">2027</span>
                <span className="nav-month-text">September</span>
              </div>
            </div>
            <span className="nav-right">sat. am 11:00</span>
          </div>
        )}
        prevLabel={null}
        nextLabel={null}
        prev2Label={null}
        next2Label={null}
        defaultValue={new Date(2027, 8, 7)}
        formatDay={(locale, date) => date.getDate()}
        showNeighboringDecade={false}
        showNeighboringMonth={false}
        tileDisabled={({ date }) => {
          return !(
            date.getFullYear() === 2027 &&
            date.getMonth() === 8 &&
            date.getDate() === 7
          );
        }}
        tileClassName={({ date }) =>
          date.getFullYear() === 2027 && date.getMonth() === 8 && date.getDate() === 7
            ? 'wedding-day'
            : null
        }
        tileContent={({ date }) => {
          if (date.getFullYear() === 2027 && date.getMonth() === 8 && date.getDate() === 7) {
            return (
              <div className="wedding-tile">
                <svg viewBox="0 0 32 32" width="36" height="36">
                  <path
                    d="M16 28S4 20 4 11.5a7.5 7.5 0 0 1 12-6 7.5 7.5 0 0 1 12 6C28 20 16 28 16 28z"
                    fill="#fce4ec"
                    stroke="#fce4ec"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="wedding-date">7</span>
              </div>
            );
          }
          return null;
        }}
        onClickDay={() => {}}
      />
    </div>
  );
}
