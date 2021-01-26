import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';
import { X } from 'react-feather';
import { Modal, Form, AutoComplete, Rate, Button } from 'antd';
import { searchSkills } from '../../../store/skills/action';
import FormItem from '../../form/FormItem';

const Admin = ({ showAdmin, setShowAdmin, addSkill }) => {
  const { t } = useTranslation('global');
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.accountReducer.skills);
  const results = useSelector((state) => state.skillsReducer.results);
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [skillId, setSkillId] = useState();
  const [options, setOptions] = useState();
  const [score, setScore] = useState(2);
  const [freeText, setFreeText] = useState();
  const debounceDelay = 300;
  const [debouncedFreeText] = useDebounce(freeText, debounceDelay);

  // Reset
  const reset = () => {
    setTitle();
    setImage();
    setSkillId();
    setOptions();
    setScore(2);
  };

  // Check if email is available
  useEffect(() => {
    if (debouncedFreeText) {
      dispatch(searchSkills(debouncedFreeText));
    }
  }, [debouncedFreeText]);

  // Handle results
  useEffect(() => {
    const array = [];
    results.map((result) => {
      if (skills.findIndex((e) => e.skillId === result.id) < 0) {
        return array.push({ label: result.title, value: result.title });
      }
      return false;
    });
    setOptions(array);
  }, [results]);

  // Handle submit
  const handleSubmit = () => {
    const values = { skillId, title, image, score };
    addSkill(skillId, values);
    setShowAdmin(false);
    reset();
  };

  // Handle change
  const onChange = (value) => {
    reset();
    setTitle(value);
  };

  // Handle select
  const onSelect = (value) => {
    setTitle(value);
    const selection = results.find((element) => element.title === value);
    setSkillId(selection.id);
    setImage(selection.image);
  };

  return (
    <Modal
      title={t('add_skill')}
      visible={showAdmin}
      onCancel={() => setShowAdmin(false)}
      footer={null}
      centered
      closeIcon={<X />}
    >
      <Form onFinish={handleSubmit}>
        {/* TITLE */}
        <FormItem
          type="autocomplete"
          value={title}
          label={t('skill')}
        >
          <AutoComplete
            allowClear
            value={title}
            options={options}
            onSelect={onSelect}
            onSearch={(value) => setFreeText(value)}
            onChange={onChange}
            placeholder={t('choose_skill')}
          />
        </FormItem>
        <FormItem>
          <Rate
            value={score}
            onChange={(value) => setScore(value)}
          />
        </FormItem>
        <FormItem className="m-0">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            disabled={!skillId}
          >
            {t('add')}
          </Button>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default Admin;
