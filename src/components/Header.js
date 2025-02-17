import './css/header.css'
import { BsBricks, BsInfoSquareFill, BsSnow, BsMagic, BsHouseFill, BsSearch, BsPerson, BsPersonCircle} from'react-icons/bs'

import { useEffect,useState } from 'react';
import { BiHome, BiSolidDashboard } from 'react-icons/bi';
function Header(){

  const [width,setWidth] =useState(window.innerWidth)


  useEffect(()=>{
    setWidth(window.innerWidth)

    console.log(width)
  })
  



    return(

        <div>
          <div className ="header">
           <div className ="content" style ={{ display:"flex"}}>
            <div style={{flex:2, background:"white", padding:"12px"}}>

              <img src = "/logo.png" alt ="logo" style={{height:"96px",width:"auto",background:"transparent",cursor:"pointer"}} />
            </div>

         

           {width>1000?<div style ={{display:'flex',flex:6, padding:"18px"}}>
            <div style ={{flex:6}}>
            <div style ={{textAlign:'left', fontWeight:"bold", fontSize:25, color:'lightgrey'}}>ZAZIC Data Portal </div>
            </div>


             <div style ={{flex:3}}>
            </div>

            <div style ={{flex:2}}>
              <BsPersonCircle  size={30} color ='#ffff'/>
            </div>

            </div>:null}



           
            

            
           </div>

          
          

           
           {width<1000?<div>
           <a href='/' style ={{textDecoration:"none"}}><span style ={{color:"#ffff", fontSize:23, fontWeight:"bold"}}> <BiSolidDashboard/> Home</span></a>
           <a href='/about-us' style ={{textDecoration:"none"}}> <span style ={{color:"#ffff", fontSize:23, fontWeight:"bold", marginLeft:20}}><BsSearch style ={{marginRight:"5px"}}/>Search</span></a>
            </div>:null} 

           </div>
        </div>
    );
}

export default Header;