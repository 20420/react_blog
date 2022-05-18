

// // 这里是全静态的编写 不需要连接到数据库 因为这里的信息一般不会变
// // 如果要接入数据库 会给数据库造成不必要的压力
// const Advert = ()=>{
//     return(
//       // 搞个轮播图
//       <div className="ad-div common-box">
//       <div>
//          <img src= "/1.jpg" width='100%'/>
//       </div>
//       <div>
//          <img src= "/2.jpg" width='100%'/>
//       </div>
//       <div>
//          <img src= "/3.jpg" width='100%'/>
//       </div>
//       <div>
//          <img src= "/4.jpg" width='100%'/>
//       </div>

//    </div>
//     )
// }

// export default Advert

import { Carousel } from 'antd';



const Advert =() => {
  return (
    <div className="ad-div common-box">
    <Carousel autoplay >
    <div>
      <img src= "/1.jpg" width='100%' />
    </div>
    <div>
      <img src= "/2.jpg" width='100%'/>
    </div>
    <div>
      <img src= "/3.jpg" width='100%'/>
    </div>
    <div>
      <img src= "/4.jpg" width='100%'/>
    </div>
  </Carousel>
  </div>
  )
}
 


export default Advert