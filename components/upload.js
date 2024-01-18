import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const UploadImage = ({ imageUrl, setImageUrl, headers }) => {
    const [fileList, fileListSet] = useState([]);

    const beforeUpload = (file) => {
        const isType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        if (!isType) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isType && isLt2M ? true : Upload.LIST_IGNORE;
    }

    const onChange = (info) => {
        const { status } = info.file;
        if (status === 'done') {
            setImageUrl(info.file.response.url);
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        fileListSet(info.fileList);
    }

    return (
        <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            headers={headers}
            action="https://www.gqgwr.cn:3658/api/upload"
            beforeUpload={beforeUpload}
            onChange={onChange}
            fileList={fileList}
        >
        {imageUrl ? (
            <img
            src={imageUrl}
            alt="avatar"
            style={{
                width: '100%',
            }}
            />
        ) : (
            <div>
            <InboxOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        )}
        </Upload>    
    )
}

export default UploadImage;