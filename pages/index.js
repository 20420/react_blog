import Head  from 'next/head'
import React,{useState} from 'react'
import Header from '../components/Header.js'
import Author from '../components/Author.js'
import {Row,Col,List} from 'antd'
import Icon,{CalendarOutlined,FolderOutlined,FireOutlined} from '@ant-design/icons'
import Advert from '../components/Advert.js'
import Footer from '../components/Footer.js'
import axios from 'axios'
import Link from 'next/link'

import marked from 'marked'
import hljs from 'highlight.js'

//引入路径文件  便于统一管理
import servicePath from '../config/apiUrl'

// list是从数据库中获取来的数据
// 通过Home.getStaticProps获取的
function Home(list) {

  const [mylist,setMylist] = useState(list.data)

  const renderer = new marked.Renderer()

  marked.setOptions({
    renderer:renderer,
    gfmt:true,
    pedantic:false,
    sanitize:false,
    tables:true,
    breaks:false,
    smartLists:true,
    // 高亮配置
    highlight:function(code){
      return hljs.highlightAuto(code).value
    }
  })

  return (
    <div >
      <Head>
        <title>羊驼西兰花的博客</title>
      </Head>
    
      <Header></Header>

      {/* 可能其他页面的两栏布局和现在这个不一样，所以我们不能单独做一个组件了 */}
      <Row className = "comm-main" type="flex" justify='center'>
         {/* 左栏 */}
         <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14} >
            {/* 这里用了List列表组件 */}
             <List
               header={<div>最新日志</div>}
              //  竖排显示 默认横排
               itemLayout='vertical'
               dataSource={mylist}
               renderItem = {item=>(
                <List.Item >
                  <div className="list-title">
                    <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                       <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className='list-icon'>
                      <span> <Icon component={CalendarOutlined}/>{item.addTime}</span>
                      <span> <Icon component={FolderOutlined}/>{item.typeName}</span>
                      <span> <Icon component={FireOutlined}/>{item.view_count}</span>
                  </div>
                  <div className="list-context"
                   dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                  ></div>
                </List.Item>
               )}
             />

             
         </Col>
         {/* 右栏 */}
         <Col className='comm-right' xs={0} sm={0} md={8} lg={6} xl={4} >
            <Author/>
            <Advert/>
          </Col>
      </Row>

      <Footer/>
    
    </div>
  )
}

// 向下述地址发出请求获得数据
Home.getInitialProps = async () =>{
 
  return await new Promise((resolve)=>{
     axios.get(servicePath.getArticleList).then(
       res=>{
         resolve(res.data)
       }
     )
  })
}

export default Home
