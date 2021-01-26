import { useTranslation } from 'react-i18next';
import { Form, Modal, Button, Slider, message } from 'antd';
import { Minus, Plus, X } from 'react-feather';
import { useEffect, useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

import getCroppedAvatar from '../../../utils/functions/utils/cropAvatar';

const AvatarCrop = ({ image, setLoading, createNewImage, showResizeModal, setShowResizeModal }) => {
  const { t } = useTranslation('global');
  const { confirm } = Modal;
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // On Crop Complete
  const onCropComplete = useCallback((croppedArea, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  // Create Image
  const createImage = useCallback(async () => {
    try {
      const newImage = await getCroppedAvatar(image, croppedAreaPixels);
      setShowResizeModal(false);
      createNewImage(newImage);
    } catch (e) {
      message.error(t('update_avatar_failure'));
    }
  }, [croppedAreaPixels]);

  // Handle Cancel
  const handeCancel = () => {
    confirm({
      title: t('discard_changes'),
      content: t('discard_changes_disclaimer'),
      onOk() {
        setShowResizeModal(false);
        setLoading(false);
      },
      centered: true,
      okText: t('discard'),
      cancelButtonProps: { type: 'link' },
    });
  };

  // Handle Scale
  useEffect(() => {
    const min = 1;
    const max = 2;
    const newZoom = (scale * max) / 100 + min;
    setZoom(newZoom);
  }, [scale]);

  return (
    <Modal
      title="Update profile picture"
      visible={showResizeModal}
      width={700}
      footer={null}
      centered
      onCancel={() => handeCancel()}
      closeIcon={<X />}
    >
      <div className="relative h-500">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          zoomWithScroll={false}
          showGrid={false}
        />
      </div>
      <div className="flex items-center justify-between mb-8">
        <Button
          type="link"
          disabled={scale <= 0}
          onClick={() => setScale(scale - 10)}
          icon={<Minus />}
        />
        <Slider value={scale} step={10} onChange={(value) => setScale(value)} className="w-4/5" />
        <Button
          type="link"
          disabled={scale === 100}
          onClick={() => setScale(scale + 10)}
          icon={<Plus />}
        />
      </div>
      <Form.Item className="m-0">
        <Button type="primary" className="w-full" onClick={() => createImage()}>
          {t('save')}
        </Button>
      </Form.Item>
    </Modal>
  );
};

export default AvatarCrop;
