import { useEffect, useState } from 'react';
import { ChevronDown, Trash2, Edit, Cpu, Package, PenTool, ShoppingBag, Voicemail } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Tooltip, Dropdown, Menu } from 'antd';
import calculateDuration from '../../../utils/functions/calculateDuration';
import Admin from './Admin';

const Item = ({ item, canEdit, updateTimelineItem, deleteTimelineItem }) => {
  const { t } = useTranslation('global');
  const { confirm } = Modal;
  const [showAdmin, setShowAdmin] = useState(false);
  const [tooltipDate, setTooltipDate] = useState('');
  const [duration, setDuration] = useState();

  // Init
  useEffect(() => {
    // Calculate duration
    const d = calculateDuration(item.start, item.end);
    switch (true) {
      case (d.countYears === 0 && d.countMonths > 0):
        setDuration(`${d.countMonths} ${d.countMonths === 1 ? t('month') : t('months')}`);
        break;
      case (d.countYears > 0 && d.countMonths === 0):
        setDuration(`${d.countYears} ${d.countYears === 1 ? t('year') : t('years')}`);
        break;
      case (d.countYears > 0 && d.countMonths > 0):
        setDuration(`
          ${d.countYears} ${d.countYears === 1 ? t('year') : t('years')}
          ${d.countMonths} ${d.countMonths === 1 ? t('month') : t('months')}
        `);
        break;
      default:
        setDuration(t('less_than_a_month'));
    }
    if (d.monthEnd && d.yearEnd) {
      if (d.yearEnd === d.yearStart && d.monthEnd === d.monthStart) {
        setTooltipDate(`${d.monthStart} ${d.yearStart}`);
      } else {
        setTooltipDate(`${d.monthStart} ${d.yearStart} - ${d.monthEnd} ${d.yearEnd}`);
      }
    } else {
      setTooltipDate(`${'since'} ${d.monthStart} ${d.yearStart}`);
    }
  }, [item]);

  // Update item
  const updateItem = () => {
    setShowAdmin(true);
  };

  // Delete item
  const deleteItem = () => {
    confirm({
      title: t('delete_timeline_item'),
      content: t('delete_timeline_item_disclaimer'),
      onOk() {
        deleteTimelineItem(item.id);
      },
      onCancel() {},
      centered: true,
      okText: t('delete'),
      cancelButtonProps: { type: 'link' },
    });
  };

  // Menu for the dropdown
  const menuDropdown = (
    <Menu>
      <Menu.Item icon={<Edit />}>
        <Button type="link" onClick={updateItem}>{t('edit')}</Button>
      </Menu.Item>
      <Menu.Item icon={<Trash2 />}>
        <Button danger type="link" onClick={deleteItem}>{t('delete')}</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="flex mb-7">
        <div className="text-center mr-4">
          {item.type === 'mission' && <Cpu size="40" />}
          {item.type === 'intership' && <Package size="40" />}
          {item.type === 'study' && <PenTool size="40" />}
          {item.type === 'training' && <ShoppingBag size="40" />}
          {item.type === 'other' && <Voicemail size="40" />}
          <div className="text-xl">{t(item.type)}</div>
        </div>
        <div style={{ width: '100%' }}>
          <div className="flex justify-between items-center">
            <div className="font-bold">{item.title}</div>
            <div className="flex">
              <Tooltip placement="top" title={tooltipDate}>
                <Button type="link">{duration}</Button>
              </Tooltip>
              {canEdit && (
                <Dropdown className="ml-4" trigger={['click']} overlay={menuDropdown} placement="bottomRight">
                  <Button shape="circle" icon={<ChevronDown />} />
                </Dropdown>
              )}
            </div>
          </div>
          <div>{item.description}</div>
          <ul className="flex text-xl">
            <li>Location</li>
            <li>Company</li>
          </ul>
        </div>
      </div>
      {(canEdit && showAdmin) && (
        <Admin
          item={item}
          showAdmin={showAdmin}
          setShowAdmin={setShowAdmin}
          updateTimelineItem={updateTimelineItem}
        />
      )}
    </>
  );
};

export default Item;
