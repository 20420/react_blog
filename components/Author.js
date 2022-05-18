import React from "react"
import Router from 'next/router'
// Avatar是头像组件  Divider分割线组件
import {Avatar,Divider} from 'antd'
import {WechatOutlined,QqOutlined,GithubOutlined} from "@ant-design/icons"


const Author =()=>{
   
   const github = ()=>{
       Router.push("https://github.com/20420")
   }

   return (
     <div className = 'author-div comm-box'>
       <div>
         <Avatar size = {100} src='/xlh.jpg' ></Avatar>
       </div>
       <div className="author-introduction" >
         我是一棵西兰花，积极向上，爱阳光，不定时给大家分享我的日常，喜欢的请关注我呀！
         {/* 分割线组件 */}
         <Divider>社交账号</Divider>
         {/* 头像图标组件 */}
         {/* 添加点击事件 */}
         <Avatar size={28} icon={<GithubOutlined/>} className="account" onClick = {github}/>
         <Avatar size={28} icon={<WechatOutlined/>} className="account" />
         <Avatar size={28} icon={<QqOutlined/>}  className="account" />
       </div>
     </div>
   )
}

export default Author