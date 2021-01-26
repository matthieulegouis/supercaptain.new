import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DraggableCore } from 'react-draggable';
import { Dropdown, Menu, Button, Upload, message, Modal } from 'antd';
import { Trash2, Edit, Move } from 'react-feather';
import Loading from '../layout/Loading';
import getCropped from '../../utils/functions/crop';
import uploadImage from '../../utils/functions/uploadImage';
import deleteImage from '../../utils/functions/deleteImage';

const Cover = ({ value, coverPosition, canEdit, updateCover }) => {
  const { t } = useTranslation('global');
  const { confirm } = Modal;
  const uid = useSelector((state) => state.accountReducer.account.uid);
  const refCover = useRef(null);
  const refImage = useRef(null);
  const [loading, setLoading] = useState(false);
  const [heightCover, setHeightCover] = useState();
  const [widthCover, setwidthCover] = useState();
  const [widthImage, setWidthImage] = useState();
  const [heightImage, setHeightImage] = useState();
  const [repositioning, setRepositioning] = useState(false);
  const [panoramic, setPanoramic] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0});
  const [positionPourcentage, setPositionPourcentage] = useState({x: 0, y: 0});

  useEffect(() => {
    if (value && refImage && refCover) {
      // Set position
      setPositionPourcentage({ x: coverPosition.x, y: coverPosition.y });
      // Determine size of the cover
      setHeightCover(refCover.current.offsetHeight);
      setwidthCover(refCover.current.offsetWidth);
      // Calculate width and height of the image
      const img = new Image();
      img.onload = () => {
        const width = refCover.current.offsetHeight * img.width / img.height;
        const height = refCover.current.offsetWidth * img.height / img.width;
        setWidthImage(width);
        setHeightImage(height);
        setPosition({
          x: width * coverPosition.x / 100,
          y: height * coverPosition.y / 100,
        });
        // Check if the image is panoramic
        if (height < refCover.current.offsetHeight) setPanoramic(true);
        else setPanoramic(false);
      }
      img.src = value;
    }
  }, [value, refCover, refImage]);

  // Save cropped image
  const saveCroppedImage = (croppedImage, fileName) => {
    const previousImage = value || null;
    // Upload the image
    uploadImage(croppedImage, `users/${uid}/cover_${fileName}`)
      // Save in user profile
      .then((cover) => {
        updateCover({ cover, coverPosition: {x: 0, y: 0,} });
      })
      .then(() => {
        setLoading(false);
      })
      // Delete previous image
      .then(() => {
        if (previousImage) deleteImage(previousImage);
      })
      .catch(() => {
        message.error(t('edit_cover_image_failure'));
        setLoading(false);
      });
  };

  // Handle upload
  const handleUpload = async (info) => {
    if (info.file.status !== 'uploading') {
      setLoading(true);
    }
    if (info.file.status === 'done') {
      const newImage = await getCropped(info.file.originFileObj, 1048, null, null);
      saveCroppedImage(newImage, info.file.originFileObj.name);
    } else if (info.file.status === 'error') {
      message.error(t('edit_cover_image_failure'));
      setLoading(false);
    }
  };

  // Delete cover
  const handleDeleteBanner = () => {
    confirm({
      title: t('delete_cover_image'),
      content: t('delete_cover_image_disclaimer'),
      onOk() {
        updateCover({cover: ''});
        updateCover({coverPosition: ''});
      },
      onCancel() {},
      centered: true,
      okText: t('delete'),
      cancelButtonProps: { type: 'link' },
    });
  };

  // Reposition cover
  const handleRepositionCover = () => {
    updateCover({
      coverPosition: {
        x: positionPourcentage.x,
        y: positionPourcentage.y,
      }
    });
    setRepositioning(false);
  };

  // Handle drag
  const handleDrag = (ev, v) => {
    let delta;
    let deltaMax;
    let deltaMin;
    if (panoramic) {
      delta = position.x + v.deltaX;
      deltaMax = (widthImage - widthCover) / 2;
      deltaMin = -(widthImage - widthCover) / 2;
    } else {
      delta = position.y + v.deltaY;
      deltaMax = (heightImage - heightCover) / 2;
      deltaMin = -(heightImage - heightCover) / 2;
    }
    switch (true) {
      case (delta > deltaMax):
        setPosition({x: panoramic ? deltaMax : 0, y: panoramic ? 0 : deltaMax});
        if (panoramic) setPositionPourcentage({ x: deltaMax * 100 / widthImage, y: 0 });
        else setPositionPourcentage({ x: 0, y: deltaMax * 100 / heightImage });
        break;
      case (delta < deltaMin):
        setPosition({x: panoramic ? deltaMin : 0, y: panoramic ? 0 : deltaMin});
        if (panoramic) setPositionPourcentage({ x: deltaMin * 100 / widthImage, y: 0 });
        else setPositionPourcentage({ x: 0, y: deltaMin * 100 / heightImage });
        break;
      default:
        setPosition({x: panoramic ? delta : 0, y: panoramic ? 0 : delta});
        if (panoramic) setPositionPourcentage({ x: delta * 100 / widthImage, y: 0 });
        else setPositionPourcentage({ x: 0, y: delta * 100 / heightImage });
    }
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
          <Button type="link">{t('upload_image')}</Button>
        </Upload>
      </Menu.Item>
      {value && (
        <>
          <Menu.Item icon={<Move />}>
            <Button onClick={() => setRepositioning(true)} type="link">{t('reposition')}</Button>
          </Menu.Item>
          <Menu.Item icon={<Trash2 />}>
            <Button onClick={() => handleDeleteBanner()} type="link">{t('delete')}</Button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <div ref={refCover} className="cover flex justify-between items-center relative overflow-hidden">
      {loading && <Loading fullContainer />}

      {/* The user has a cover */}
      {(!repositioning && value) && (
        <img
          alt=""
          ref={refImage}
          style={{ transform: `translate(${coverPosition.x}%, ${coverPosition.y}%)` }}
          className={`cover-image ${panoramic && 'panoramic'}`}
          src={value}
        />
      )}

      {/* Cover + repositionning mode */}
      {(canEdit && repositioning && value) && (
        <DraggableCore
          axis={panoramic ? "x" : "y"}
          onDrag={handleDrag}
        >
          <img
            alt=""
            ref={refImage}
            draggable="false"
            className={`cover-image ${panoramic && 'panoramic'}`}
            src={value}
            style={{ transform: `translate(${positionPourcentage.x}%, ${positionPourcentage.y}%)` }}
          />
        </DraggableCore>
      )}

      {/* The user does not have a cover */}
      {!value && (
        <img
          alt=""
          ref={refImage}
          className="cover-image"
          src="/cover.jpg"
        />
      )}

      {/* Dropdown menu */}
      {(canEdit && !repositioning) && (
        <Dropdown trigger={['click']} overlay={menuDropdown} placement="bottomRight">
          <div className="absolute bottom-5 right-5">
            <Button ghost>{t('edit_cover_image')}</Button>
          </div>
        </Dropdown>
      )}
      {(canEdit && repositioning) && (
        <div className="absolute bottom-5 right-5">
          <Button ghost onClick={() => setRepositioning(false)}>{t('cancel')}</Button>
          <Button ghost className="ml-2" type="primary" onClick={handleRepositionCover}>{t('save')}</Button>
        </div>
      )}
    </div>
  );
};

export default Cover;
