import Head  from 'next/head'
import React from 'react'
import Link from 'next/link'
//引入Header组件
import Header from '../components/Header'
import {Row,Col,Breadcrumb,Affix} from "antd"
import Icon,{CalendarOutlined,FolderOutlined,FireOutlined} from "@ant-design/icons"
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

// 用这个MarkDown  有弊端 所以改用 marked+hightlight.js
// MarkDown  
// import ReactMarkdown from 'react-markdown'
// import MarkNav from 'markdown-navbar';   // 导航目录+ 自带的css

// marked的版本要1.1.1  否则会报错
import marked from 'marked'
import hljs from 'highlight.js'
import Tocify from "../components/tocify.tsx"

import axios from 'axios'

//引入路径文件  便于统一管理
import servicePath from '../config/apiUrl'


// props是从数据库中取过来的文章详细内容
function Detailed(props) {

    // 使用marked必须要用的
    const renderer = new marked.Renderer()

  // 先new一个tocity
  // const tocify = new Tocify()
   const tocify = new Tocify()
  // 现在这个目录不带锚链接的功能 所以要自己设置
  renderer.heading = function(text,level,raw){
    const anchor = tocify.add(text,level)
    return `<a id ="${anchor}" href = "#${anchor}" class = "anchor-fix"><h${level}>${text}</h${level}></a>\n `  
  }
  

  // 配置一下marked 表明要如何解析markDown
  marked.setOptions({
    renderer:renderer,
    gfmt:true,
    pedantic:false,
    sanitize:false,
    tables:true,
    breaks:false,
    smartLists:true,
    smartypants: false,
    // 高亮配置
    highlight:function(code){
        return hljs.highlightAuto(code).value
    }
  })
  
  // 利用配置好的marked方法 对从数据库中得到的article_content进行渲染
  // 注意html还不能直接使用  要用dangerouslySetInnerHTML={{__html:html}}对html进行解析
  let html = marked(props.article_content)


  return (
    <div>
      <Head>
        <title>羊驼西兰花的博客</title>
      </Head>

      <Header/>
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
            <div>
              {/* 面包屑 */}
              <div className="bread-div">
                 <Breadcrumb>
                   <Breadcrumb.Item> <Link href='/'><a>首页</a></Link> </Breadcrumb.Item>
                   <Breadcrumb.Item> <Link href='/list'><a>视频分享</a></Link> </Breadcrumb.Item>
                   <Breadcrumb.Item>详情页</Breadcrumb.Item>
                 </Breadcrumb>
              </div>
               {/* 标题 */}
               <div>
                 <div className="detailed-title">
                    西兰花的视频日常
                 </div>
                 <div className='list-icon center'>
                    <span> <Icon component={CalendarOutlined}/>2020-5-2</span>
                    <span> <Icon component={FolderOutlined}/>视频教程</span>
                    <span> <Icon component={FireOutlined}/>3333人</span>
                 </div>
                 <div className="detailed-content" 
                   // 此处应用markdown
                    dangerouslySetInnerHTML={{__html:html}}
                 > 
                 </div>
               </div>
            </div> 
        </Col>  

        <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
           <Author/>
           <Advert/>

            {/* 固钉效果 */}
            <Affix offsetTop={5}>
              <div className="detailed-nav comm-box">
                  <div className="nav-title">文章目录</div>
                  {tocify && tocify.render()}
              </div>
            </Affix>

        </Col>  
      </Row>

      <Footer/>
    </div>
  )
}
 
 // 从数据库获得数据
 // 为什莫要传递上下文context 因为要接收前台传过来的id 凭借着id去要数据
 Detailed.getInitialProps = async(context) =>{
   console.log(context.query.id)

   let id = context.query.id
   
   return await new Promise((resolve)=>{
     // egg设置了安全机制 不允许跨域访问
     // 如何解决 在sevice中解决:安装egg-cors 然后去config里面进行配置
     axios.get( servicePath.getArticleById + id).then((res)=>{
         resolve(res.data.data[0])
     })
   })
   
 }

export default Detailed
