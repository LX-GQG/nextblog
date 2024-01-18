import Link from "next/link";
import Image from "next/image";
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Dropdown, Modal, Form, Input, Space, message, Upload } from 'antd';
import { login } from '../server/login'
import UploadImage from "./upload";
import { setCookie, removeCookie } from '../static/utils/cookies'

export default function Header() {
  const emptyImg = "/images/123.jpg"
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const headers = {
    Authorization: 'Bearer ' + token
  }
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    removeCookie("token");
  }
  const [Personal, setPersonal] = useState(false);
  const [imageUrl, setImageUrl] = useState(user?.avatar || '');
  const [username, setUsername] = useState(user?.username || '');

  const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
  };

  const handlePersonal = () => {
    setPersonal(true);
  }

  const handleOkPersonal = (value) => {
    value.avatar = imageUrl
    setPersonal(false);
  }

  const handleCancelPersonal = () => {
    setPersonal(false);
  }

  const items = [
    {
      key: '1',
      label: (
        <>
          <div onClick={handlePersonal}>Personal</div>
        </>
      )
    },
    { 
      key: '2',
      label: (
        <>
          <div onClick={handleLogout}>Logout</div>
        </>
      )
    },
    
  ]

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const handleLogin = async () => {
    setOpen(true);
  }

  const onFinish = async (value) => {
    let res = await login(value)
    if(res.code == 200) {
      dispatch({ type: 'LOGIN', payload: res.data.userinfo, token: res.data.token });
      // 设置Cookie
      setCookie('token', res.data.token, { maxAge: 60 * 60 * 24 * 7 })
      setImageUrl(res.data.userinfo.avatar?res.data.userinfo.avatar:'')
      message.success(res.msg);
      setOpen(false);
    }else{
      message.error(res.msg);
    }
  }

  return (
    <header>
      <p className="logo">
        <Link href="/">
          Only Blog
        </Link>
      </p>
        {isLogin ? (
        <div className="header-right">
          <div className="header-box">
            {/* 创建文章 */}
            <Link className="header-create" href="/create">
              <Image src="/images/create.png" alt="create" width={30} height={28} layout="fixed" />
            </Link>
          </div>
          <Dropdown menu={{items}} placement="bottom" arrow>
            <div className="header-info">
              <Image className="user_avatar" src={imageUrl} alt="avatar" width={40} height={40} layout="fixed" />
              <span className="name">{username}</span>
            </div>
          </Dropdown>
        </div>) : (
        <>
          <Button onClick={handleLogin} className="login">
            Login
          </Button>
        </>)}
        <Modal
          title="Login"
          open={open}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={handleCancel}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
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
        </Modal>
        <Modal
          title="Personal"
          open={Personal}
          onCancel={handleCancelPersonal}
          footer={null}
        >
          <Form
            name="personal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={handleOkPersonal}
            onFinishFailed={handleCancelPersonal}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Avatar"
              name="avatar"
              // 在表单里添加上传组件，需要这些
              valuePropName='fileList'
              getValueFromEvent={normFile}
            >
              <UploadImage
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                headers={headers}
                >
              </UploadImage>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={handleCancelPersonal}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
        <style>{`
            header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 45px;
                padding: 1rem;
                background: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .logo {
                font-weight: bold;
                font-size: 1.5rem;
            }
            .logo a {
                color: #333;
                text-decoration: none;
            }
            .header-right {
                display: flex;
                align-items: center;
            }
            .header-box {
                margin-right: 20px;
            }
            .header-info {
                display: flex;
                align-items: center;
            }
            .header-info .user_avatar {
                border-radius: 50%;
                object-fit: cover;
            }
            .header-info .name {
                margin-left: 10px;
                max-width: 80px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .header-info .login {
                color: #333;
                cursor: pointer;
                text-decoration: none;
            }
        `}</style>
    </header>
  );
}
