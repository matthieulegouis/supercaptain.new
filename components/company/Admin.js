import { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';

import searchAgent from '../../utils/functions/search/searchAgent';

export default function Admin() {
  const { t } = useTranslation('global');
  const [results, setResults] = useState([]);
  const [toBeAdded, setToBeAdded] = useState([]);
  const [freeSearch, setFreeSearch] = useState('');

  const handleSearch = (e) => {
    setFreeSearch(e.target.value);
    searchAgent(e.target.value).then((data) => {
      data.map((item) => {
        if (results.find((i) => i.id === item.id)) return null;
        return setResults((prev) => [...prev, item]);
      });
    });
  };

  const handleCheckbox = (member, boolean) => {
    const array = [];
    if (boolean) {
      array.push({
        id: member.id,
        username: member.username,
      });
      setToBeAdded(array);
    }
  };

  const onFinish = () => { };

  return (
    <div>
      <div>Member</div>
      <Button>{t('add_member')}</Button>
      <Form onFinish={onFinish}>
        <Input onChange={handleSearch} />
        {toBeAdded.map((item) => (
          <span key={item.id}>{item.username} - </span>
        ))}
        {results
          .map((item) => (
            <div key={item.id} username={item.username}>
              <Checkbox onChange={(e) => handleCheckbox(item, e.target.checked)} />
              {item.username}
            </div>
          ))
          .filter((a) => {
            if (String(a.props.username).replace(/\s/g, '').toLowerCase().includes(freeSearch))
              return a;
            return null;
          })}
        <Button disabled={!toBeAdded.length} htmlType="submit">
          {t('save')}
        </Button>
      </Form>
    </div>
  );
}
