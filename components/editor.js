import 'react-quill/dist/quill.snow.css'; // 根据你选择的主题导入对应的样式
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// 使用 dynamic 导入 Quill 编辑器以确保只在客户端渲染
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false, // 关闭服务器端渲染
});

export default function MyEditor(props) {
  const [value, setValue] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const handleChange = (value) => {
    setValue(value);
    // 将编辑器的值传递给父组件的回调函数
    if (props.onChange) {
      props.onChange(value);
    }
  }

  return (
    <div style={{ height: '400px', overflowY: 'auto' }}>
      <ReactQuill 
        theme="snow"
        modules={modules}
        formats={formats}
        value={value} 
        onChange={handleChange}
        style={{ maxHeight: 'calc(100% - 40px)', height: '350px' }}
      />
    </div>
    
  );
}