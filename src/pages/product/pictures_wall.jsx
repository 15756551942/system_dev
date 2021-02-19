import React, { useState } from 'react';
import { Upload,message } from 'antd';
import ImgCrop from 'antd-img-crop';

const PictureWall = () => {
  const [fileList, setFileList] = useState([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ]);

  const onChange = ({ file,fileList: newFileList }) => {
    console.log(file,fileList.length)
    if(file.status === 'done'){
      const result = file.response
      if(result.status === 0){
        message.success('上传图片成功！')
        const {name,url} = result.data
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
      }else{
        message.error('上传图片失败！')
      }
    }
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotate>
      <Upload
        action="http://120.55.193.14:5000/manage/img/upload"
        accept='image/*'
        name='image'
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default PictureWall