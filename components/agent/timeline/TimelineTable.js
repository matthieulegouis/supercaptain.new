import Item from './Item';

const TimelineTable = ({
  className,
  title,
  events,
  canEdit,
  updateTimelineItem,
  deleteTimelineItem,
}) => (
  <div className={`relative ${className || ''}`}>
    <h3>{title}</h3>
    {(events && events.length > 0) && events.map((item) => (
      <Item
        key={item.id}
        item={item}
        end={item.end}
        type={item.type}
        canEdit={canEdit}
        updateTimelineItem={updateTimelineItem}
        deleteTimelineItem={deleteTimelineItem}
      />
    )).sort((a, b) => new Date(b.end) - new Date(a.end))}
  </div>
);

export default TimelineTable;
