import Head  from 'next/head'
import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import Header from '../components/Header.js'
import Author from '../components/Author.js'
import {Row,Col,List,Breadcrumb} from 'antd'
import Icon,{CalendarOutlined,FolderOutlined,FireOutlined} from '@ant-design/icons'
import Advert from '../components/Advert.js'
import Footer from '../components/Footer.js'
import axios from 'axios'
import servicePath from '../config/apiUrl.js'

import marked from 'marked'
import hljs from 'highlight.js'


function MyList(list) {

  const [mylist,setMylist] = useState(list.data)

  // 每次页面刷新 都重新将Mylist的值赋值
  // 这样就可以只刷新变化的位置 不变的位置不会重新刷新
  // 注意要把第二个参数去掉 
  //  切换菜单的时候得到数据了 但是mylist却没有改变 所以要用下面的语句让它变化 
  useEffect(()=>{
     setMylist(list.data)
  })
 

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

   
      <Row className = "comm-main" type="flex" justify='center'>
         {/* 左栏 */}
         <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14} >
            {/* 面包屑 */}
            <div className="bread-div">
               <Breadcrumb>
                <Breadcrumb.Item>
                 <Link href="/">
                   <a>首页</a>
                 </Link>
                </Breadcrumb.Item>
                  <Breadcrumb.Item>视频分享</Breadcrumb.Item>
               </Breadcrumb>
            </div>

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

MyList.getInitialProps = async (context) =>{
  const id = context.query.id
  return await new Promise((resolve)=>{
     axios.get(servicePath.getListById + id).then(
       res=>{
         resolve(res.data)
       }
     )
  })
}

export default MyList
