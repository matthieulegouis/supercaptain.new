import { useEffect, useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase/app';
import { PlusCircle, MinusCircle, X } from 'react-feather';
import { Modal, Form, Input, Select, Button, DatePicker } from 'antd';
import FormItem from '../../form/FormItem';
import TYPES_TIMELINE_ITEM from '../../../utils/consts/typesTimelineItem';

const Admin = ({
  item,
  showAdmin,
  setShowAdmin,
  updateTimelineItem,
  createTimelineItem,
}) => {
  const { t } = useTranslation('global');
  const { TextArea } = Input;
  const { Option } = Select;
  const { confirm } = Modal;
  const [type, setType] = useState();
  const [title, setTitle] = useState();
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [showDateEnd, setShowDateEnd] = useState(false);
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const [disabled, setDisabled] = useState(true);

  // Init
  useEffect(() => {
    if (item) {
      setType(item.type);
      setTitle(item.title);
      if (item.start) setDateStart(moment(item.start.seconds * 1000));
      if (item.end) {
        setDateEnd(moment(item.end.seconds * 1000));
        setShowDateEnd(true);
      } else setShowDateEnd(false);
      if (item.description) {
        setDescription(item.description);
        setShowDescription(true);
      } else {
        setDescription('');
        setShowDescription(false);
      }
    }
  }, [item]);

  // Handle disabled
  useEffect(() => {
    if (item && (
      title === item.title
      && type === item.type
      && (item.start && dateStart
        ? moment(dateStart).toDate().getTime() === item.start.seconds * 1000
        : true)
      && (item.dateEnd
        ? moment(dateEnd).toDate().getTime() === item.end.seconds * 1000
        : !dateEnd)
      && (item.description
        ? description === item.description
        : description.length === 0)
    )) {
      setDisabled(true);
    } else if (!title || !type || !dateStart) {
      setDisabled(true);
    } else setDisabled(false);
  }, [item, type, title, dateStart, dateEnd, description]);

  // Reset
  const reset = () => {
    setType();
    setTitle();
    setDateStart();
    setDateEnd();
    setShowDateEnd(false);
    setDescription('');
    setShowDescription(false);
    setDisabled(true);
  };

  // Handle submit
  const handleSubmit = () => {
    const values = {
      type,
      title,
      start: firebase.firestore.Timestamp.fromDate(moment(dateStart).toDate()),
      end: showDateEnd ? firebase.firestore.Timestamp.fromDate(moment(dateEnd).toDate()) : null,
      description: showDescription ? description : null,
    };
    if (item) updateTimelineItem(item.id, values);
    else createTimelineItem(values);
    setShowAdmin(false);
    reset();
  };

  // Handle Cancel
  const handeCancel = () => {
    if (!disabled) {
      confirm({
        title: t('discard_changes'),
        content: t('discard_changes_disclaimer'),
        onOk() {
          setShowAdmin(false);
        },
        onCancel() {},
        centered: true,
        okText: t('discard'),
        cancelButtonProps: { type: 'link' },
      });
    } else {
      setShowAdmin(false);
    }
  };

  return (
    <Modal
      title={t('add_timeline_item')}
      visible={showAdmin}
      onCancel={handeCancel}
      footer={null}
      centered
      closeIcon={<X />}
    >
      <Form onFinish={handleSubmit}>
        {/* TYPE */}
        <FormItem
          type="select"
          value={type}
          label={t('type')}
        >
          <Select onChange={(value) => setType(value)} value={type} placeholder={t('select_type')}>
            {TYPES_TIMELINE_ITEM.map((i) => (
              <Option key={i} value={i}>{t(i)}</Option>
            ))}
          </Select>
        </FormItem>

        {/* TITLE */}
        <FormItem
          type="text"
          value={title}
          label={t('title')}
        >
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            type="text"
            placeholder={t('title')}
          />
        </FormItem>

        {/* DATE PICKER */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormItem
              type="date"
              label={t('start_date')}
            >
              <DatePicker
                picker="month"
                value={dateStart}
                disabledDate={(current) => (current && current > moment().endOf('day')) || (current && current > dateEnd)}
                onChange={(date) => setDateStart(date)}
              />
            </FormItem>
          </div>
          <div>
            {showDateEnd && (
              <FormItem
                type="date"
                label={t('start_date')}
                className="m-0"
              >
                <DatePicker
                  picker="month"
                  value={dateEnd}
                  disabledDate={(current) => (current && current < dateStart) || !dateStart || (current && current > moment().endOf('day'))}
                  onChange={(date) => setDateEnd(date)}
                />
              </FormItem>
            )}
            {showDateEnd ? (
              <Button type="link" icon={<MinusCircle />} onClick={() => setShowDateEnd(false)}>{t('end_date')}</Button>) : (
                <Button type="link" icon={<PlusCircle />} onClick={() => setShowDateEnd(true)}>{t('end_date')}</Button>)}
          </div>
        </div>

        {/* DESCRIPTION */}
        {!showDescription && (
          <Button
            type="link"
            icon={<PlusCircle />}
            onClick={() => setShowDescription(true)}
            className="mb-4"
          >
            {t('description')}
          </Button>)}
        {showDescription && (
          <FormItem
            type="textarea"
            value={description}
            label={t('description')}
          >
            <Button
              type="link"
              icon={<MinusCircle />}
              onClick={() => setShowDescription(false)}
            >
              {t('description')}
            </Button>
            <TextArea
              rows={4}
              maxLength={140}
              showCount
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              type="text"
              placeholder={t('description')}
            />
          </FormItem>)}
        <FormItem className="m-0">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            disabled={disabled}
          >
            {item ? t('save') : t('add')}
          </Button>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default Admin;
