import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Empty, Select, Skeleton } from 'antd';
import { Plus } from 'react-feather';
import Admin from './Admin';
import TimelineTable from './TimelineTable';

const Timeline = ({
  value,
  canEdit,
  updateTimelineItem,
  createTimelineItem,
  deleteTimelineItem,
  pendingFetch,
}) => {
  const { t } = useTranslation('global');
  const { Option } = Select;
  const [showAdmin, setShowAdmin] = useState(false);
  const [types, setTypes] = useState([]);
  const [type, setType] = useState('all_types');

  useEffect(() => {
    const array = [];
    if (value) {
      value.map((item) => {
        if (!array.includes(item.type)) return array.push(item.type);
        return false;
      });
      setTypes(array);
    }
  }, [value]);

  // Now events
  let nowEvents = [];
  if (value) {
    nowEvents = value
      .filter((item) => {
        if (!item.end) return item;
        return false;
      })
      .filter((item) => {
        if (type !== 'all_types') {
          return item.type === type;
        }
        return item;
      });
  }

  // Past events
  let pastEvents = [];
  if (value) {
    pastEvents = value
      .filter((item) => {
        if (item.end) return item;
        return false;
      })
      .filter((item) => {
        if (type !== 'all_types') {
          return item.type === type;
        }
        return item;
      });
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2>{t('timeline')}</h2>
        <div>
          <Select
            style={{ width: '200px' }}
            onChange={(v) => setType(v)}
            value={type}
            placeholder={t('select_type')}
          >
            <Option value="all_types">{t('all_types')}</Option>
            {types.map((i) => <Option key={i} value={i}>{t(i)}</Option>)}
          </Select>
          {canEdit && (
            <Button
              className="ml-4"
              type="primary"
              onClick={() => setShowAdmin(true)}
              icon={<Plus />}
            >
              {t('add')}
            </Button>
          )}
        </div>
      </div>

      {/* Now */}
      {nowEvents.length > 0 && (
        <TimelineTable
          title={t('current_events')}
          events={nowEvents}
          canEdit={canEdit}
          updateTimelineItem={updateTimelineItem}
          deleteTimelineItem={deleteTimelineItem}
        />
      )}

      {/* Before */}
      {pastEvents.length > 0 && (
        <TimelineTable
          className="mt-5"
          title={t('past_events')}
          events={pastEvents}
          canEdit={canEdit}
          updateTimelineItem={updateTimelineItem}
          deleteTimelineItem={deleteTimelineItem}
        />
      )}

      {/* Empty */}
      {(pendingFetch
      && !pendingFetch.pending
      && nowEvents.length === 0
      && pastEvents.length === 0) && (
        <Empty />
      )}

      {/* Loading */}
      {(pendingFetch && pendingFetch.pending) && (
        <Skeleton active />
      )}

      {/* Admin */}
      {canEdit && (
        <Admin
          showAdmin={showAdmin}
          setShowAdmin={setShowAdmin}
          createTimelineItem={createTimelineItem}
        />
      )}
    </div>
  );
};

export default Timeline;
