import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { createArticle, getArticleTag } from '../../server/article';
import Layout from '../../components/layouts';
import Image from 'next/image';
import { Button, Modal, Form, Input, Space, message, Select } from 'antd';
import Editor from '../../components/editor';
import { useSelector, useDispatch } from 'react-redux';
import UploadImage from '../../components/upload';

// create
const Create = () => {
    const [editorContent, setEditorContent] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const [selectedIds, setSelectedIds] = useState([]);
    const router = useRouter();
    const token = useSelector((state) => state.auth.token);
    const headers = {
      Authorization: 'Bearer ' + token
    }

    const { Option } = Select;
    const [tagList, tagListSet] = useState([])
    // 只执行一次
    useMemo(() => {
      getArticleTag().then(res => {
        tagListSet(res.data)
      })
    }, [])

    const handleEditorChange = (value) => {
      setEditorContent(value);
    };

    const onFinish = async (value) => {
      value.cover = imageUrl
      value.content = editorContent
      value.tags = selectedIds
      let res = await createArticle(value, headers)
      if(res.code == 200) {
        message.success(res.msg || res)
        router.push('/')
      }else{
        message.error(res.msg || res)
      }
      
    }

    const handleCancel = () => {
      console.log('Cancel');
      router.push('/')
    }

    const normFile = (e) => {
      if (Array.isArray(e)) {
          return e;
      }
      return e && e.fileList;
    };

    const onChangeSelect = (values) => {
      // 获取option的key
      setSelectedIds(values.map(value => {
        const tag = tagList.find(item => item.name === value);
        return tag ? tag.id : null;
      }))
    }

    const onSearch = (val) => {
      console.log('search:', val);
    }

    return (
      <>
        <Layout>
          <div className='blog_content'>
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 1100, minWidth: 900 }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input your Title!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Tag"
                name="tags">
                <Select
                  mode="multiple"
                  placeholder="Select a tag"
                  onChange={onChangeSelect}
                  optionLabelProp="label"
                >
                  {tagList.map((item,index) => (
                    <Option key={item.id} value={item.name} label={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Cover"
                name="cover"
                // 在表单里添加上传组件，需要这些
                valuePropName='fileList'
                getValueFromEvent={normFile}
              > 
                <UploadImage
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  headers={headers}
                ></UploadImage>
              </Form.Item>
              <Form.Item
                label="Content"
              >
                <Editor
                  onChange={handleEditorChange}
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button htmlType="button" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Layout>
        <style>{`
          .blog_content {
            padding: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </>
    )
}

export default Create;