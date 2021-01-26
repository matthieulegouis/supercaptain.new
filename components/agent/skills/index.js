import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Empty, Skeleton } from 'antd';
import { Plus } from 'react-feather';
import Item from './Item';
import Admin from './Admin';

const Skills = ({ value, canEdit, updateSkill, addSkill, removeSkill, pendingFetch }) => {
  const { t } = useTranslation('global');
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2>{t('skills')}</h2>
        {canEdit && <Button type="primary" onClick={() => setShowAdmin(true)} icon={<Plus />}>{t('add')}</Button>}
      </div>
      {value && (
        <div className="grid grid-cols-3 gap-4">
          {value.map((item) => (
            <div key={item.id}>
              <Item
                item={item}
                canEdit={canEdit}
                updateSkill={updateSkill}
                removeSkill={removeSkill}
              />
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {(pendingFetch && !pendingFetch.pending && value.length === 0) && (
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
          setShowAdmin={(v) => setShowAdmin(v)}
          addSkill={addSkill}
        />
      )}
    </div>
  );
};

export default Skills;
