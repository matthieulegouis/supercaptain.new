import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { Avatar as AvatarIcon, Dropdown, Menu, Button, Upload, message } from 'antd';
import { ChevronDown, Edit } from 'react-feather';

import AvatarCrop from './AvatarCrop';
import getCropped from '../../../utils/functions/utils/crop';
import uploadImage from '../../../utils/functions/utils/uploadImage';
import deleteImage from '../../../utils/functions/utils/deleteImage';
import { uidState } from '../../../lib/account';

const Avatar = ({ value, canEdit, updateAvatar, pendingAction }) => {
  const { t } = useTranslation('global');
  const uid = useRecoilValue(uidState);
  const [showResizeModal, setShowResizeModal] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState();

  // Handle success
  useEffect(() => {
    if (pendingAction && pendingAction.success) {
      setLoading(false);
    }
  }, [pendingAction]);

  // Handle upload
  const handleUpload = async (info) => {
    if (info.file.status !== 'uploading') {
      setImage(null);
      setLoading(true);
    }
    if (info.file.status === 'done') {
      setFileName(info.file.originFileObj.name);
      const newImage = await getCropped(info.file.originFileObj, null, null, null);
      setImage(newImage);
      setShowResizeModal(true);
    } else if (info.file.status === 'error') {
      message.error(t('update_avatar_failure'));
    }
  };

  // Save cropped image
  const saveCroppedImage = (croppedImage) => {
    setLoading(true);
    const previousImage = value || null;
    // Upload the image
    uploadImage(croppedImage, `users/${uid}/avatar_${fileName}`)
      // Save in user profile
      .then((avatar) => {
        updateAvatar(avatar);
      })
      // Delete previous image
      .then(() => {
        if (previousImage) deleteImage(previousImage);
      })
      .catch(() => {
        message.error(t('update_avatar_failure'));
      });
  };

  // Menu for the dropdown
  const menuDropdown = (
    <Menu>
      <Menu.Item icon={<Edit />}>
        <Upload
          name="avatar"
          multiple={false}
          showUploadList={false}
          accept="image/*"
          onChange={(info) => handleUpload(info)}
        >
          <Button type="link">{t('update_avatar')}</Button>
        </Upload>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="relative items-center justify-center border-4 border-white rounded-full z-1 w-180 h-180">
      {loading && <div>Loading...</div>}
      <AvatarIcon size={180} src={value || '/avatar.jpg'} />
      {canEdit && (
        <>
          <Dropdown trigger={['click']} overlay={menuDropdown} placement="bottomRight">
            <Button
              className="absolute bottom-0 right-0 z-50"
              shape="circle"
              icon={<ChevronDown />}
            />
          </Dropdown>
          <AvatarCrop
            image={image}
            setLoading={setLoading}
            createNewImage={(newImage) => saveCroppedImage(newImage)}
            showResizeModal={showResizeModal}
            setShowResizeModal={setShowResizeModal}
          />
        </>
      )}
    </div>
  );
};

export default Avatar;
