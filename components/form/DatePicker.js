import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

const DatePicker = ({ date, onChange, onlyMonth, onlyYear }) => {
  const { Option } = Select;
  const { t } = useTranslation('global');
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [maxDaysinMonth, setMaxDaysinMonth] = useState(0);
  const [className, setClassName] = useState('grid-cols-3');

  // Init
  useEffect(() => {
    if (onlyMonth) setClassName('grid-cols-2');
    if (onlyYear) setClassName('grid-cols-1');
  }, []);

  // Handle changes
  useEffect(() => {
    const newDate = new Date(year, month, day);
    onChange(newDate);
  }, [day, month, year]);

  // Set number of days in a month
  useEffect(() => {
    setMaxDaysinMonth(getDaysInMonth(month, year));
  }, [month, year]);

  // Render days
  const days = [];
  for (let i = 1; i < maxDaysinMonth + 1; i += 1) {
    days.push(
      <Option key={i} value={i}>
        {i}
      </Option>
    );
  }

  // Render years
  const years = [];
  const today = new Date();
  const lastYear = today.getFullYear();
  for (let i = lastYear; i > 1905; i -= 1) {
    years.push(
      <Option key={i} value={i}>
        {i}
      </Option>
    );
  }

  return (
    <div className={`grid ${className} gap-4`}>
      {/* Day */}
      {!onlyMonth && !onlyYear && (
        <div>
          <Form.Item type="select" value={day} label={t('day')}>
            <Select value={day} onChange={(value) => setDay(value)}>
              {days}
            </Select>
          </Form.Item>
        </div>
      )}
      {/* Month */}
      {!onlyYear && (
        <div>
          <Form.Item type="select" value={month} label={t('month')}>
            <Select value={month} onChange={(value) => setMonth(value)}>
              <Option value={0}>{t('January')}</Option>
              <Option value={1}>{t('February')}</Option>
              <Option value={2}>{t('March')}</Option>
              <Option value={3}>{t('April')}</Option>
              <Option value={4}>{t('May')}</Option>xs
              <Option value={5}>{t('June')}</Option>
              <Option value={6}>{t('July')}</Option>
              <Option value={7}>{t('August')}</Option>
              <Option value={8}>{t('September')}</Option>
              <Option value={9}>{t('October')}</Option>
              <Option value={10}>{t('November')}</Option>
              <Option value={11}>{t('December')}</Option>
            </Select>
          </Form.Item>
        </div>
      )}
      {/* Year */}
      <div>
        <Form.Item type="select" value={year} label={t('year')}>
          <Select value={year} onChange={(value) => setYear(value)}>
            {years}
          </Select>
        </Form.Item>
      </div>
    </div>
  );
};

export default DatePicker;
