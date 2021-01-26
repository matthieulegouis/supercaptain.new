import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Menu, Button, Modal, Dropdown, Rate, Form } from 'antd';
import { Edit, Trash2, ChevronDown } from 'react-feather';
import FormItem from '../../form/FormItem';

const Item = ({ item, canEdit, updateSkill, removeSkill }) => {
  const { t } = useTranslation('global');
  const { confirm } = Modal;
  const [score, setScore] = useState(item.score);
  const [edit, setEdit] = useState(false);

  // Update score
  const updateScore = () => {
    updateSkill(item.id, score);
    setEdit(false);
  };

  // Delete item
  const removeItem = () => {
    confirm({
      title: t('delete_timeline_item'),
      content: t('delete_timeline_item_disclaimer'),
      onOk() {
        removeSkill(item.id);
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
        <Button type="link" onClick={() => setEdit(true)}>{t('edit')}</Button>
      </Menu.Item>
      <Menu.Item icon={<Trash2 />}>
        <Button danger type="link" onClick={removeItem}>{t('delete')}</Button>
      </Menu.Item>
    </Menu>
  );

  return !edit ? (
    <div className="relative text-center mb-5">
      <Image
        alt=""
        src={item.image}
        width={100}
        height={100}
        className="mb-2"
      />
      <div className="font-bold">{t(item.title)}</div>
      <Rate disabled value={item.score} />
      {canEdit && (
        <Dropdown trigger={['click']} overlay={menuDropdown} placement="bottomRight">
          <Button className="absolute top-0 right-0" shape="circle" icon={<ChevronDown />} />
        </Dropdown>
      )}
    </div>
  ) : (
    <Form onFinish={updateScore}>
      <div className="relative text-center mb-5">
        <Image
          alt=""
          src={item.image}
          width={100}
          height={100}
          className="mb-2"
        />
        <div className="font-bold">{t(item.title)}</div>
        <FormItem>
          <Rate value={score} onChange={(value) => setScore(value)} />
        </FormItem>
        <FormItem ontype="button">
          <div className="text-right">
            <Button type="link" onClick={() => setEdit(false)}>{t('cancel')}</Button>
            <Button className="ml-2" type="primary" htmlType="submit">{t('save')}</Button>
          </div>
        </FormItem>
      </div>
    </Form>
  );
};

export default Item;
