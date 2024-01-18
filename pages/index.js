import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../components/layouts';
import Pagination from '../components/pagination';
import { getArticle } from '../server/article';
import { parseDate, formatDateToMonthAndTime } from '../static/utils/utils'

export async function getServerSideProps() {
  let res = await getArticle({pageNo:1,pageSize:10})
  let result = res.data
  return {
      props: {
        result
      }
  }
}

export default function Home({ result }) {
    const emptyImg = "/images/empty_new.png"
    const [searchResult, setSearchResult] = useState(result.rows)
    const [searchCount, setSearchCount] = useState(result.count)
    const [searchText, searchTextSet] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalPages = Math.ceil(searchCount / pageSize);

    const handleSearchTitle = async () => {
      let data = await getArticle({title: searchText?searchText:''})
        setSearchResult(data.data.rows)
        setSearchCount(data.data.count)
    }

    const handlePageChange = async (newPage) => {
      let data = await getArticle({title: searchText?searchText:'',pageNo: newPage, pageSize: pageSize})
      setSearchResult(data.data.rows)
      setCurrentPage(newPage);
    }

    const handleImageError = (e) => {
      e.target.src = '/images/empty_new.png'
    }

    return (
      <>
        <Layout>
          <div>
            <div className="search-container">
              <div className="search-content">
                <input type="text" placeholder="Search.." name="search" value={searchText} onChange={(e) => searchTextSet(e.target.value)}/>
                <div className="button" onClick={handleSearchTitle}>Search</div>
              </div>
            </div>
            <div className='blog_list'>
              {searchResult.map((item) => (
                <Link className='blog_item' href={`/article/${item.id}`} key={item.id}>
                    <div className='blog_item_cover'>
                      <Image src={item.cover?item.cover:emptyImg} alt="article photo" layout="fill" objectFit="cover"></Image>
                    </div>
                    <div className='blog_item_info'>
                      <div className='blog_item_title'>
                        <span>{item.title}</span>
                      </div>
                      <div className='blog_item_tag'>
                        <span>{item.tags.map((item) => (
                          <span className='tag_item' key={item.id}>{item.name}</span>
                        ))}</span>
                      </div>
                      <div className='blog_bottom'>
                        <div className='blog_item_left'>
                          <div className='blog_item_author'>
                            <span>{item.author}</span>
                          </div>
                          <div className='blog_item_time'>
                            <span>{formatDateToMonthAndTime(parseDate(item.create_time))}</span>
                          </div>
                        </div>
                        <div className='blog_item_right'>
                          <Image src="/images/arrow-right.png" alt="arrow right" width={30} height={30} ></Image>
                        </div>
                      </div>
                    </div>
                </Link>
              ))}
            </div>
            {searchCount > 10 &&
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                >
              </Pagination>
            }
          </div>
          <style>{`
            .search-container {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 20px 0;
            }
            .search-content {
                background: #ededf2;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 60%;
                border-radius: 5px;
            }
            .search-container input[type=text] {
                padding: 10px;
                font-size: 15px;
                border: none;
                outline: none;
                background: transparent;
                padding-left: 15px;
                width: 88%;
            }
            .search-container input[type=text]::placeholder {
                color: #999;
            }
            .search-container .button {
                padding: 10px;
                color: #fff;
                font-size: 15px;
                border: none;
                cursor: pointer;
                border-radius: 4px;
                background: #5374ff;
            }
            .blog_list {
                width: 1100px;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                padding: 15px;
                align-items: center;
            }
            .blog_item {
                width: calc(100% / 2.08);
                box-sizing: border-box;
                border-radius: 5px;
                position: relative;
                margin-bottom: 25px;
                margin-right: 30px;
                overflow: hidden;
                text-decoration: none;
                box-shadow: 0 3px 8px rgba(20, 5, 20, 0.3);
            }
            .blog_item:hover .blog_item_cover img {
                transform: scale(1.1);
                transition: all 0.5s ease;
            }
            .blog_item:hover .blog_item_right img {
                transform: translateX(5px);
                transition: all 0.5s ease;
            }
            .blog_item:nth-child(2n) {
                margin-right: 0;
            }
            .blog_item_cover {
                position: relative;
                width: 100%;
                height: 230px;
                overflow: hidden;
            }
            .blog_item_cover img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: all 0.5s ease;
            }
            .blog_item_info {
                padding: 20px;
                background-color: #fff;
            }
            .blog_item_title {
                color: #000;
                font-size: 1.1rem;
            }
            .blog_item_tag {
                height: 26px;
                margin-top: 10px;
                color: #666;
                font-size: 0.9rem;
            }
            .tag_item {
                font-size: 0.8rem;
                display: inline-block;
                margin-right: 10px;
                padding: 2px 5px;
                border-radius: 5px;
                background-color: #eee;
            }
            .blog_bottom {
                box-sizing: border-box;
                margin-top: 20px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .blog_item_right {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .blog_item_right img {
                width: 30px;
                height: 30px;
                object-fit: contain;
                transition: all 0.5s ease;
            }
            .blog_item_time {
                font-size: 0.8rem;
                color: #666;
            }
            .blog_item_author {
                font-size: 0.8rem;
                font-weight: bold;
                color: #000;
                margin-bottom: 5px;
            }
          `}</style>
          {/* <p>Find out more<Link href="/article" legacyBehavior><a>Article</a></Link></p> */}
        </Layout>
      </>
    );
}