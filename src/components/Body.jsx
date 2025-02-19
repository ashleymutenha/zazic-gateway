import Dashboard from "./Dashboard";
import Site from "./Site";
import LoginCard from "./Login";
import { useState } from "react";
import { useEffect } from "react";
import Facilities from "./Facilities";
import StaticSite from "./bodyComponents/StaticSite";
import { users } from "./appresources/users";
export default function Body({email}){


     const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status
      const [userEmail, setUserEmail] = useState(null); // Store user's email

      const [userPriviledge, setUserPriviledge] = useState('')
      const [userDistrict, setUserDistrict] = useState('')
      const[userStaticSite , setUserStaticSite] =useState('')

      

     console.log("users", users)
      const handleLogin = (status, email = null) => {
        setIsLoggedIn(status); // Update login status
        if (status) {
          setUserEmail(email); // Store email on successful login
        }

        for(var user of users){
            if(user.username == userEmail){
               setUserPriviledge(user.userLevel)
            }
        }
      };


      useEffect(()=>{
         getUserPriviledge()
         getUserDistrict()
         getUserStaticSite()
      })


      const getUserPriviledge = () =>{

        for(var user of users){
            if(user.username == email){
              console.log("user",user)

               setUserPriviledge(user.userLevel)
            }
        }

      }

      const getUserDistrict = () =>{

        for(var user of users){
            if(user.username ==email){
                setUserDistrict(user.District)
            }
        }
      }

      const getUserStaticSite = () =>{

        for(var user of users){
            if(user.username ==email){
                setUserStaticSite(user.staticSite)
            }
        }
      }



      const checkSelectedMonth = ()=>{
        let month =""
      
          const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          const today = new Date()
          
          let currentMonth = monthNames[today.getMonth()]
    
          localStorage.setItem('currentMonth',currentMonth)
    
          if(currentMonth =="January"){
            month ="December"
          }
    
          else{
            month = monthNames[today.getMonth()-1]
          }
    
        return month
      }
    
      const checkSelectedYear = ()=>{
        let year =0
      
          const today = new Date()
    
         let currentyear = today.getFullYear()
         let currentMonth = localStorage.getItem('currentMonth')
         if(currentMonth =="January"){
          year = currentyear-1
         }
    
         else{
          year =currentyear
         }
    
        return year
      }



    return(
            <div>
            
            {userPriviledge==='partner'|| userPriviledge ==='super'?<Dashboard username={email}/>:
            userPriviledge==='site'?<StaticSite district ={userDistrict} staticSite ={userStaticSite}/>:null
            // <Facilities
            //           district={userDistrict}
            //           facilities={filterFacilities()}
            //           selectedMonth={checkSelectedMonth()}
            //           selectedYear={checkSelectedYear()}
            //           _staticSite ={userStaticSite}
            //           username ={email}
            // />
            }
            </div>
    )
}