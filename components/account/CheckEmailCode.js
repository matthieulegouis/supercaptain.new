import { useEffect, useState } from 'react';
import { Modal, Form, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { X } from 'react-feather';
import ReactCodeInput from 'react-verification-code-input';

import sendEmailCode from '../../utils/functions/agent/sendEmailCode';
import checkEmailCode from '../../utils/functions/utils/checkEmailCode';
import LIMIT_SEND_CODE from '../../utils/consts/limitSendCode';
import LIMIT_CODE_CHECKS from '../../utils/consts/limitCodeChecks';

export default function CheckEmailCode({ email, visibility, setVisibility, save }) {
  const { t } = useTranslation('global');
  const [counterSending, setCounterSending] = useState(0);
  const [counterCheck, setCounterCheck] = useState(0);
  const [code, setCode] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  // Init: sending code
  useEffect(() => {
    sendEmailCode(email)
      .then(() => setCounterSending((c) => c + 1))
      .then(() => message.info('email_sent'));
  }, []);

  // Cancel
  const cancel = () => {
    setVisibility(false);
  };

  // Resend
  const reSend = () => {
    sendEmailCode(email)
      .then(() => setCounterSending((c) => c + 1))
      .then(() => message.info('email_sent'));
  };

  // Submit
  const submit = () => {
    setPending(true);
    setCounterCheck((c) => c + 1);
    checkEmailCode(email, code)
      .then(() => {
        setPending(false);
        setVisibility(false);
        save();
      })
      .catch((err) => {
        setPending(false);
        setError(err.message);
      });
  };

  return (
    <Modal
      title={t('enter_confirmation_code_title')}
      visible={visibility}
      onCancel={cancel}
      footer={null}
      centered
      closeIcon={<X />}
    >
      {error}
      <p>
        {t('enter_confirmation_code_description')} <b>{email}</b>
      </p>
      <Button type="link" onClick={reSend} disabled={counterSending >= LIMIT_SEND_CODE}>
        {t('resend_code')}
      </Button>
      <Form onFinish={submit}>
        <Form.Item>
          <ReactCodeInput className="form-code" value={code} onChange={(value) => setCode(value)} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={pending || counterCheck >= LIMIT_CODE_CHECKS}
          >
            {pending ? '...' : t('ok')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
