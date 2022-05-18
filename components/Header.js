import React,{useEffect,useState} from "react"
import {Row,Col,Menu,Popover,Input,Button} from 'antd'
import Icon,{HomeOutlined,VideoCameraOutlined,SmileOutlined} from '@ant-design/icons'
// import * as Icon from '@ant-design/icons'
// 用来跳转
import Router from "next/router"
// import Link from 'next/link'

import axios from 'axios'

import servicePath from "../config/apiUrl"


const Header = ()=>{

  // // 这里用来获取header右侧的信息 但是由于图标组件原因 获取了也不行
  // const [navArray,setNavArray] = useState([])
 
  // // 利用useEffect来得到header所需的数据  跟之前的getInitialProps一样的功能 但getInitialProps只能在父组件中使用，不能在子组件中使用
  // useEffect(()=>{
  //   const fetchData = async()=>{
  //     const result = await axios(servicePath.getTypeInfo).then(
  //       res => {
  //         // 这里必须return 才能被result接收到
  //         return res.data.data
  //       }
  //     )
  //     // 把result的值赋给navArray
  //     setNavArray(result)
  //   } 
  //   // 让上述方法执行
  //   fetchData()
  // },[])


  // 跳转的方法
  const handleClick = (e)=>{
    // 这里是写0  还写home呢 一会来看看
     if(e.key == '0'){
        Router.push('/')
     } else {
       Router.push('/list?id='+e.key)
     }
  }


  return (
    <div className='header'>
        {/* flex布局 主轴排列方式为居中 */}
        <Row type="flex" justify="center" >
          <Col xs={24} sm={24} md={10} lg={15} xl={12}>
             {/* 存放logo的地方 */}
             <span className = "header-logo">羊驼西兰花</span>
             {/* 存放文字描述的地方 */}
             <span className = "header-txt">记录日常生活和学习！</span>          
          </Col>
          
          {/* 搜索位置 */}
          <Col xs={4} sm={4} md={4} lg={4} xl={4} >
            <div style={{ marginTop: 5 }}>
              <Popover placement="bottom"  trigger="click">
                <Button shape="circle" ></Button>
              </Popover>
            </div>
          
          </Col>
          
          
          {/* 导航部分 */}
          <Col xs={0} sm={0} md={14} lg={8} xl={6}>
             {/* 菜单类型为横向 */}
             <Menu mode = 'horizontal' onClick={handleClick}>
                {/* key是item的唯一标识 */}
                <Menu.Item key = '0' >
                    <Icon component={HomeOutlined}></Icon>
                    &nbsp;
                    博客首页
                </Menu.Item>

                <Menu.Item key = '1'>
                    <Icon component={VideoCameraOutlined}></Icon>
                    &nbsp;
                    视频分享
                </Menu.Item>

                <Menu.Item key = '2'>
                    <Icon component={SmileOutlined}></Icon>
                    &nbsp;
                    生活点滴
                </Menu.Item>

             </Menu>
          </Col>
        </Row>
    </div>
  )
}

export default Header