
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { getArticleDetail, getComment, thumbsUp, thumbArticle } from '../../server/article';
import Layout from '../../components/layouts';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import cookie from 'cookie';

const Article = ({ article, comment, headers }) => {
    // const router = useRouter()
    // const { id } = router.query
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(article.is_thumb);
    const [thumbsNum, setThumbsNum] = useState(article.thumbs_num);
    const [commentList, setComment] = useState(comment);
    const [likedComments, setLikedComments] = useState([]);
    const handleImageError = (e) => {
      e.target.src = '/images/empty_avatar.png'
    }

    const changeArticleThumb = async (id) => {
      const result = await thumbArticle({aid: id}, headers)
      if (result.code === 200) {
        if (isLiked) {
          setThumbsNum(thumbsNum - 1);
          setIsLiked(0);
        } else {
          setThumbsNum(thumbsNum + 1);
          setIsLiked(1);
        }
      } else if (result.code === 401) {
        dispatch({ type: 'LOGOUT' });
        message.error(result.msg)
      } else {
        message.error(result.msg)
      }
    }

    const changeCommentThumb = async (id,index) => {
      const result = await thumbsUp({id}, headers)
      if (result.code === 200) {
        // 修改点赞数
        if (commentList[index].is_thumb) {
          commentList[index].is_thumb = 0
          commentList[index].thumbs_num -= 1
        } else {
          commentList[index].is_thumb = 1
          commentList[index].thumbs_num += 1
        }
        setComment([...commentList])
      }else if (result.code === 401) {
        dispatch({ type: 'LOGOUT' });
        message.error(result.msg)
      } else {
        message.error(result.msg)
      }
    }

    return (
      <>
        <Layout>
          <div className='blog_content'>
              <h1 className='blog_title'>{article.title}</h1>
              <div className='blog_head'>
                <div className='blog_time'>
                  <span>{article.create_time}</span>
                </div>
                <div className='blog_author'>
                  <span>{article.author}</span>
                </div>
              </div>
              {article.cover &&
                <div className='blog_photo'>
                  <Image src={article.cover?article.cover:''} alt="article photo" layout="fixed" width={300} height={300} onError={handleImageError}></Image>
                </div>
              }
              <div className='blog_detail' dangerouslySetInnerHTML={{__html: article.content}}></div>
              <div className='blog_info' onClick={() => changeArticleThumb(article.id)}>
                <Image src={isLiked ? '/images/article_like.png' : '/images/article_unlike.png'} width={18} height={15} alt='like'></Image>
                <span className={isLiked ? 'islike' : ''}>{thumbsNum}</span>
              </div>
          </div>
          {commentList.length > 0 && (
          <div className='comment_content'>
            <div className='comment_title'>
              Comment
            </div>
            <div className='comment_list'>
              {commentList.map((item,index) => (
              <div className='comment_item' key={item.id}>
                <div className='item_left'>
                  <div className='item_avatar'>
                    <Image src={item.user.avatar?item.user.avatar:""} width={70} height={70} alt='avatar' objectFit="cover" onError={handleImageError}></Image>
                  </div>
                  <div className='item_info'>
                    <div className='item_username'>
                      { item.user.username }
                    </div>
                    <div className='item_comment'>
                      { item.content }
                    </div>
                  </div>
                </div>
                <div className='item_right'>
                  <div className='item_thumb' onClick={() => changeCommentThumb(item.id, index)}>
                    <Image src={item.is_thumb === 0 ? '/images/thumbed.png' : '/images/thumb.png'} width={18} height={18} alt='like'></Image>
                    <span className={item.is_thumb === 0 ? '' : 'islike'}>{item.thumbs_num}</span>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
          )}
        </Layout>
        <style>{`
          .blog_content {
            padding: 15px;
          }
          .blog_title {
            text-align: center;
            font-size: 30px;
            margin-bottom: 20px;
          }
          .blog_head {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
          }
          .blog_time {
            margin-right: 30px;
          }
          .blog_author {
            margin-left: 30px;
          }
          .blog_photo {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 300px;
          }
          .blog_photo img {
            width: 100%;
            height: 300px;
            object-fit: contain;
          }
          .blog_detail {
            padding: 15px;
            margin-top: 20px;
            list-style: inside;
          }
          .blog_info {
            margin-top: 10px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            cursor: pointer;
          }
          .blog_info img {
            transition: all 0.3s;
          }
          .blog_info span {
            margin-left: 5px;
            color: #999;
          }
          .islike {
            color: #1890ff !important;
          }
          .comment_content {
            padding: 15px;
          }
          .comment_title {
            font-size: 18px;
            font-weight: bold;
            padding: 15px;
          }
          .comment_list {
            padding: 15px;
          }
          .comment_item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
          }
          .item_left {
            display: flex;
            align-items: center;
          }
          .item_right {
            display: flex;
            align-items: center;
          }
          .item_thumb {
            display: flex;
            align-items: center;
            cursor: pointer;
          }
          .item_thumb img {
            transition: all 0.3s;
          }
          .item_thumb span {
            margin-left: 5px;
            color: #999;
          }
          .item_avatar {
            border-radius: 50%;
            overflow: hidden;
            margin-right: 15px;
          }
          .item_info {
            height: 70px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-around;
          }
          .item_username {
            font-size: 16px;
            font-weight: bold;
          }
          .item_comment {
            font-size: 14px;
          }
        `}</style>
      </>
        
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query
    // 获取Cookie
    const cookies = cookie.parse(context.req.headers.cookie || '');
    const token = cookies.token || '';
    let headers = {};
    if (token) {
      headers = {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await getArticleDetail({id}, headers)
    const result = await getComment({aid: id}, headers)
    const comment = result.data
    const article = res.data
    return {
        props: {
            article,
            comment,
            headers
        }
    }
}

export default Article;