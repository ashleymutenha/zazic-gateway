import React, { useEffect, useState } from 'react';
import {BiMapPin, BiMinusCircle, BiSolidDashboard, BiTrash } from 'react-icons/bi';
import {  BsFillGeoFill, BsGlobe,  BsSun } from 'react-icons/bs';
import Select from 'react-select';
import './css/dashboard.css';
import StaticSites from './StaticSites';
import Card1 from './bodyComponents/Card1';
import { FiAlertTriangle } from 'react-icons/fi';
import { PiPlusCircle, PiStrategyThin } from 'react-icons/pi';
import { FaCalculator, FaCut, FaHospitalUser, FaRing } from 'react-icons/fa';
import { FaRecycle } from 'react-icons/fa6';
import { TbRibbonHealth } from 'react-icons/tb';
import Header from './Header';
import { GiUncertainty } from 'react-icons/gi';

import Card from './bodyComponents/Card';
import { SlUserFollowing } from 'react-icons/sl';
import {districtByPartner, sites} from './bodyComponents/sites'
import ProgressBar from './bodyComponents/ProgressBar';
import { partnerDistricts } from './bodyComponents/sites';
import LoginCard from './Login';
import App from '../App';
import CustomChart from './bodyComponents/Chart';
import CustomChart2 from './bodyComponents/Chart2';
import { users } from './appresources/users';




export default function Dashboard({ _selectedMonth, _selectedYear,username }) {
  const [mcs, setMCs] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(_selectedMonth || '');
  const [selectedYear, setSelectedYear] = useState(_selectedYear || '');
  const [showStaticSites, setStaticSites] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districtSites, setDistrictSites] = useState([]);
  const [userPriviledge, setUserPriviledges] = useState([])
  const [userDomain, setUserDomain] = useState([])
  

  const [showLoginPage, setLogin] =useState(false)
  
  // const login = useGoogleLogin({
  //   onSuccess: tokenResponse => console.log(tokenResponse),
  // });
 

  useEffect(() => {
    if(getUserInformation().length>0){
    setUserPriviledges(loggedUser().userLevel)
    setUserDomain(loggedUser().domain)

    const fetchData = async () => {
      try {
        const timestamp = new Date().getTime();
        const response = await fetch(`https://ashleymutenha.github.io/zazic-commcareManipulation/data.json?_=${timestamp}`);
        if (!response.ok) throw new Error('Failed to fetch data.');

        const rawData = await response.text();
        const cleanData = JSON.parse(rawData.replace(/\bNaN\b/g, 'null'));

        console.log("data",cleanData)
        setMCs(cleanData);

        if (_selectedMonth != undefined && _selectedYear != undefined) {
          setSelectedMonth(_selectedMonth);
          setSelectedYear(_selectedYear);
        }

        if (_selectedMonth == undefined  && _selectedYear == undefined) {
          const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          const today = new Date()

          let __selectedMonth = monthNames[today.getMonth()]

          if(__selectedMonth =="January"){
            setSelectedYear(today.getFullYear()-1)
            setSelectedMonth(monthNames[11])
          }

          else{
            setSelectedYear(today.getFullYear())
            setSelectedMonth(monthNames[today.getMonth()-1])
          }

          
        
        }
       

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData()
  }
   
 
  },[]);

const getUserInformation =()=>{
  let userInfo =  []
  for(var user of users){
    if(user.username ==username)
    userInfo.push(user)
  }
  return userInfo
}


const loggedUser = () =>{

  return getUserInformation()[0]
}
  const checkSelectedMonth = ()=>{
    let month =""
    if(_selectedMonth ==undefined){
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

    }
    else {
      month = selectedMonth
    }

    return month
  }

  const checkSelectedYear = ()=>{
    let year =0
    if(_selectedYear ==undefined){
      const today = new Date()

     let currentyear = today.getFullYear()
     let currentMonth = localStorage.getItem('currentMonth')
     if(currentMonth =="January"){
      year = currentyear-1
     }

     else{
      year =currentyear
     }

    }
    else {
      year = _selectedYear
    }

    return year
  }

  const getUniqueSites =()=>{
   let sites =[]

   for(var site of mcs){
     if(checkSiteOccurence(sites,site) ==0){
      sites.push(site)
     }
   }
   return sites
  }

  const checkSiteOccurence =(array,element)=>{
    let count =0
    for(var site of array){
      if(site['facilityName'] ==element['facilityName'] && site['recordingMonth']==selectedMonth && site['year'] ==selectedYear){
        count+=1
      }
    }
    return count
  }

  const getTotalMCs = () => {
    let sum =0
    for(var mc of getUniqueSites()){
      if(userPriviledge =='partner'){
       if(mc['Partner']==userDomain){
      if(mc['year']==selectedYear && mc['recordingMonth']==selectedMonth){
        sum+=mc['totalMCs']
      }
    }
  }

  if(userPriviledge =='super'){
    if(mc['year']==selectedYear && mc['recordingMonth']==selectedMonth){
      sum+=mc['totalMCs']
    }
  }
  }
    return sum;
  };


  const aes = () => {
    return getUniqueSites().reduce((totalAES, mc) => {
      const isMatchingMonthYear = mc['recordingMonth'] === selectedMonth && mc['year'] === selectedYear;
  
      if (
        (userPriviledge === 'partner' && mc['Partner'] === userDomain && isMatchingMonthYear) ||
        (userPriviledge === 'super' && isMatchingMonthYear)
      ) {
        return totalAES + mc['matchingAES'].length;
      }
  
      return totalAES;
    }, 0);
  };

  const aesBYDistrict = (district) => {
    return getUniqueSites().reduce((totalAES, mc) => {
      const isMatchingMonthYear = mc['recordingMonth'] === selectedMonth && mc['year'] === selectedYear;
  
      if (
        (userPriviledge === 'partner' && mc['Partner'] === userDomain && isMatchingMonthYear && mc['District'] ==district) ||
        (userPriviledge === 'super' && isMatchingMonthYear && mc['District'] ==district) 
      ) {
        return totalAES + mc['matchingAES'].length;
      }
  
      return totalAES;
    }, 0);
  };
  

  const surgicalDisposable = () => {
    const calculateSum = (mc) => {
      return mc["sgDisposable15-19"] + mc["sgDisposable20-24"] + mc["sgDisposable25-29"] +
             mc["sgDisposable30-34"] + mc["sgDisposable35-39"] + mc["sgDisposable40-44"] +
             mc["sgDisposable45-49"] + mc["sgDisposable50"];
    };
  
    return getUniqueSites().reduce((sum, mc) => {
      const isMatchingMonthYear = mc['recordingMonth'] === selectedMonth && mc['year'] === selectedYear;
  
      if (userPriviledge === 'partner' && mc['Partner'] === userDomain && isMatchingMonthYear) {
        return sum + calculateSum(mc);
      }
  
      if (userPriviledge === 'super' && isMatchingMonthYear) {
        return sum + calculateSum(mc);
      }
  
      return sum;
    }, 0);
  };
  
const staticSiteReportRate =(district)=>{
  return ((getRecordedDistrictStaticSites(district).length/ getDistrictStaticSites(district))*100).toFixed(0)
}
  const surgicalReusable =()=>{

    const calculateSum =(mc)=>{
      return mc["sgReusable15-19"]+mc["sgReusable20-24"]+mc["sgReusable25-29"]+mc["sgReusable30-34"]+
      mc["sgReusable35-39"]+mc["sgReusable40-44"]+mc["sgReusable45-49"]+mc["sgReusable50"]
    }

    return getUniqueSites().reduce((sum,mc)=>{
      const isMatchingMonthYear = mc['recordingMonth'] === selectedMonth && mc['year'] === selectedYear;

      if (userPriviledge === 'partner' && mc['Partner'] === userDomain && isMatchingMonthYear) {
        return sum + calculateSum(mc);
      }
  
      if (userPriviledge === 'super' && isMatchingMonthYear) {
        return sum + calculateSum(mc);
      }
    return sum
    },0)
  }

  
  const shangring =()=>{

    const calculateSum  =(mc)=>{
      return mc["shangring15-19"]+mc["shangring20-24"]+mc["shangring25-29"]+mc["shangring30-34"]+
      mc["shangring35-39"]+mc["shangring40-44"]+mc["shangring45-49"]+mc["shangring50"]
    }
    

    return getUniqueSites().reduce((sum,mc)=>{
      const isMatchingMonthYear =  mc['recordingMonth'] === selectedMonth && mc['year'] === selectedYear;
      if (userPriviledge === 'partner' && mc['Partner'] === userDomain && isMatchingMonthYear) {
        return sum + calculateSum(mc);
      }
  
      if (userPriviledge === 'super' && isMatchingMonthYear) {
        return sum + calculateSum(mc);
      }
    return sum
    },0)
    
  }



  const getDistricts =()=>{
     
    var districts =[]
    for (var data of mcs) {
        if (checkCountofDistrict(districts, data['District']) ==0 && data['year']==selectedYear && data['recordingMonth']==selectedMonth) {
          if(userPriviledge =='partner'){
            if(data['Partner'] ==userDomain){
              
              districts.push(data['District']);
            }
          }
          if(userPriviledge =='super'){
            districts.push(data['District']);
          }
        }  
    }
    
    return districts;
 }




 const checkCountofDistrict =(array, element)=>{
  let counter =0;

  for(var i of array){

      if(i ==element){
          counter+=1;
      }
  }

  return counter;
}

const getPartnerDistrict = ()=>{
  let array =[]
  for( var element of districtByPartner){
    if(userPriviledge =='partner'){
    if(element['partner']==userDomain){
      array.push(element)
    }
  }

  if(userPriviledge =='super'){
    array.push(element)
  }
}
return array
}

const getStaticSites = () => {
  let sites = [];
  for (var data of mcs) {
    if (
      checkCountofDistrict(sites, data['Site_Name']) == 0 &&
      data['year'] == selectedYear &&
      data['recordingMonth'] == selectedMonth &&
      data['District'] == selectedDistrict
    ) {
      sites.push(data['Site_Name']);
    }
  }
  return sites; // Move return statement outside the loop
};

const getTotalMCsByStaticSites =(Site)=>{
  let sum =0
  for(var mc of mcs){
    if(mc['year']==selectedYear && mc['recordingMonth']==selectedMonth && mc['Site_Name'] ==Site){
      sum+=mc['totalMCs']
    }
  }
  return sum
}

const getDistrictStaticSites = (district) => 
  sites.filter(site => site.district === district).length;

const getRecordedDistrictStaticSites =(district)=>{
  let staticSites =[]
  mcs.map((mc)=>{
    if(String(mc.year) ==String(selectedYear) && String(mc.recordingMonth) ==String(selectedMonth)){
      if(mc.District ==district){
        if(checkOccurenceinArray(staticSites, mc['Site_Name'])==0){
          staticSites.push(mc['Site_Name'])
        }
      }
    }
  })
  return staticSites
}

const district_staticSiteReportingRate = (district)=>{
  return (getRecordedDistrictStaticSites(district).length/getDistrictStaticSites(district))*100
}



const checkOccurenceinArray =(array, element)=>{
  let count =0
 for(var i of array){
  if(i==element)
  count+=1
 }
 return count
}
  const handleFacilitiesSelection = (district) => {
    const facilities = getUniqueSites().filter(
      (item) =>
        String(item.District).toLowerCase() === String(district).toLowerCase() &&
        String(item.year) === String(selectedYear) &&
        String(item.recordingMonth).toLowerCase() === String(selectedMonth).toLowerCase()
    );
    console.log("facilities",facilities)
    setDistrictSites(facilities);
    setSelectedDistrict(district);
    setStaticSites(true);

    console.log("facilities", facilities)
    // console.log("change", showFacilities)
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ].map((month) => ({ value: month, label: month }));

  const years = Array.from({ length: 7 }, (_, i) => 2024 + i).map((year) => ({ value: year, label: year }));

  const calculateSum = (mc, type) => {
    // Dynamically calculate based on the type (hivPositive or hivNegative)
    return (
      mc[`${type}15-19`] +
      mc[`${type}20-24`] +
      mc[`${type}25-29`] +
      mc[`${type}30-34`] +
      mc[`${type}35-39`] +
      mc[`${type}40-44`] +
      mc[`${type}45-49`] +
      mc[`${type}50`]
    );
  };
  
  const hivPositive = () => {
    return getUniqueSites().reduce((sum, mc) => {
      const isMatchingMonthYear =
        mc["recordingMonth"] === selectedMonth && mc["year"] === selectedYear;
  
      if (
        (userPriviledge === "partner" && mc["Partner"] === userDomain && isMatchingMonthYear) ||
        (userPriviledge === "super" && isMatchingMonthYear)
      ) {
        return sum + calculateSum(mc, "hivPositive");
      }
  
      return sum;
    }, 0);
  };
  
  const hivNegative = () => {
    return getUniqueSites().reduce((sum, mc) => {
      const isMatchingMonthYear =
        mc["recordingMonth"] === selectedMonth && mc["year"] === selectedYear;
  
      if (
        (userPriviledge === "partner" && mc["Partner"] === userDomain && isMatchingMonthYear) ||
        (userPriviledge === "super" && isMatchingMonthYear)
      ) {
        return sum + calculateSum(mc, "hivNegative");
      }
  
      return sum;
    }, 0);
  };
  
  const hivUntested = () => {
    const totalMCs = getTotalMCs(); // Ensure this function provides the correct total
    const positive = hivPositive();
    const negative = hivNegative();
  
    return totalMCs - (positive + negative);
  };
  

 function getTotalMCByDistrict(district){
   let sum =0
  for(var mc of getUniqueSites()){
    if(mc['year']==selectedYear && mc['recordingMonth']==selectedMonth && mc['District'] ==district){
      sum+=mc['totalMCs']
    }
  }
  return sum
  }


  const getTotalFollowUp =()=>{
    let total =0
    for(var mc of getUniqueSites()){
      if(userPriviledge =='partner'){
        if(mc['Partner']==userDomain){
      if(mc['recordingMonth']==selectedMonth && mc['year']==selectedYear){
      let totalFollowUp = mc['fu15-19']+ mc['fu20-24']+ mc['fu25-29']+mc['fu30-34']+mc['fu35-39']+mc['fu40-44']+mc['fu45-49']+mc['fu50']
      total+=totalFollowUp
    }}}

    if(userPriviledge =='super'){
      if(mc['recordingMonth']==selectedMonth && mc['year']==selectedYear){
        let totalFollowUp = mc['fu15-19']+ mc['fu20-24']+ mc['fu25-29']+mc['fu30-34']+mc['fu35-39']+mc['fu40-44']+mc['fu45-49']+mc['fu50']
        total+=totalFollowUp
      }
    }
  }
    return total
  }

  const followUpRate =()=>{
    return String(parseFloat(getTotalFollowUp()/getTotalMCs()*100).toFixed(2)) +"%"
  }

  const districtSubmissionRate = ()=>{
    let districtSubmitted = getDistricts().length

    let partnerDistricts = getPartnerDistrict().length

    let submissionRate = districtSubmitted/partnerDistricts *100

    return submissionRate
  }
 



  return (
    <div>
    {showLoginPage ===false?<div>
            

           {getUserInformation().length==0? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "40px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "30rem",
          }}
        >
          <div style={{flex:2, background:"white", padding:"12px"}}>

</div>
          <h2>User not Found !</h2>

          <div style ={{padding:12, borderRadius:"12px", background:"darkgreen", color:"#ffff"}}

          onClick={()=>{
            setLogin(true)
          }}
          
          >
            Login 
          </div>
         
        </div>
      </div>:
     

            <div>

      {showStaticSites ===false ? (
        <div>
                                  <Header />

        <div style = {{display:"flex"}}>
          <div style ={{flex:7}}>
          <div style={{ display: 'flex' }}>
            <div className="topCard" style={{ flex: 5 }}>
              <div style={{ display: 'flex', marginTop: '10px' }}>
                <BiSolidDashboard size={45} color="rgb(51, 103, 96)" />
                <div style={{ fontSize: 23, color: 'rgb(83, 94, 83)', fontWeight: 'bold', marginLeft: '10px' }}>DASHBOARD</div>
              </div>
            </div>
            <div style={{ flex: 5 }}>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <Select
                  options={months}
                  defaultValue={months.find((m) => m.value === checkSelectedMonth())}
                  placeholder="Select Month"
                  onChange={(option) => setSelectedMonth(option.value)}
                />
                <Select
                  options={years}
                  defaultValue={years.find((y) => y.value === checkSelectedYear())}
                  placeholder="Select Year"
                  onChange={(option) => setSelectedYear(option.value)}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', marginTop: '20px' }}>
            <div className="_topCard" style={{ flex: 1 ,height:'fit-content'}}>
              <div style={{ padding: '12px', borderBottom: '1px solid lightgrey' }}>
                <BsSun size={30} color="rgb(157, 157, 141)" />
              </div>
              <div style={{ fontWeight: 'bold', fontSize: 18, color: 'rgb(39, 126, 157)', marginTop: '5px' }}>Total MC(S)</div>
              <div style ={{color:"rgb(39, 126, 157)", fontSize:"23px", fontWeight:"bold"}} >{getTotalMCs()}</div>
            </div>

            <div className="_topCard" style={{ flex: 1, height:'fit-content' }}>
              <div style={{ padding: '12px', borderBottom: '1px solid lightgrey' }}>
                <BsFillGeoFill size={30} color="rgb(137, 166, 177)" />
              </div>
              <div style={{ fontWeight: 'bold', fontSize: 18, color: 'rgb(39, 126, 157)' }}>Total District(s) that have Reported</div>

              <div 
  style={{
    color: "rgb(39, 126, 157)",
    fontSize: "23px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    flexDirection: "row", // Ensure the children stay in a row
  }}
>
  <div>
    {getDistricts().length} {"/"} {getPartnerDistrict().length}
  </div>
  <div
    style={{
      marginLeft: "10px",
      background: "rgb(236, 248, 207)",
      padding: "5px",
      borderRadius: "12px",
      color: "black",
      fontSize:"20px"
    }}
  >
    {districtSubmissionRate().toFixed(0)} {"%"}
  </div>
</div>



              <div style ={{marginTop:"12px"}}><ProgressBar bgcolor='rgb(29, 82, 99)' completed={districtSubmissionRate()} containerColor="rgb(232, 238, 240)" /></div>
             { getDistricts() != getPartnerDistrict()? <div style ={{margin:8, padding:"12px",background:"rgb(13, 116, 150)", color:'#ffff', borderRadius:'12px'}}>
             View District(s) that have not yet submitted
        </div>:null}
            </div>
          </div>

          <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center',background:"#ececec", width:'fit-content', paddingRight:"4px" }}>
            <BsGlobe size={30} color="#FFFF" style={{ marginRight: '10px', background: 'rgb(8, 75, 62)', padding: '14px' }} />
            <div style={{ fontSize: 34,display:"flex"  }}> <div>ZAZIC DISTRICTS</div>
            {loggedUser().userLevel=='partner'?<div style ={{marginLeft:"5px"}}> {"->"} {loggedUser().domain}</div>:null}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {getDistricts().map((district) => (
              <div
                key={district}
                className="___topCard"
                style={{ width: '300px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' ,background:'rgb(8, 75, 62)', borderTopLeftRadius:"12px",borderTopRightRadius:"12px", margin:9}}
              >
                <div style ={{padding: '1rem', padding:12, background:"#ffff", borderTopLeftRadius:"12px", borderTopRightRadius:"12px", border:"1px solid lightgrey"}}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <BiMapPin size={45} color="rgb(51, 103, 96)" />
                  <div style={{ fontSize: 23, color: 'rgb(83, 94, 83)', marginLeft: '10px' }}>{district}</div>
                </div>
                <div
                  style={{ padding: '12px', background: 'beige', borderRadius: '12px', textAlign: 'center', cursor: 'pointer' }}
                  onClick={() =>
                     {
                      handleFacilitiesSelection(district)
                      setStaticSites(true)

                     }}
                >
                  View Facilities
                </div>
                <div style={{display:"flex"}}>
                <div style ={{background:'rgb(239, 237, 237)', padding:'10px', width:'fit-content', marginTop:"6px", borderRadius:"12px"}}>
                  <FaCalculator style ={{marginRight:"3px", marginTop:"8px"}} color ="rgb(56, 141, 117)"/>
                  <span style ={{color:"rgb(39, 126, 157)", fontSize:"18px", fontWeight:"bold"}}>{getTotalMCByDistrict(district)}  {"MC(S)"}</span>
                </div>

               {aesBYDistrict(district)>0? <div style ={{background:'white', padding:'10px', width:'fit-content',  marginTop:"6px", marginLeft:"6px"}}>
                  <FiAlertTriangle size ={26} style ={{marginRight:"3px", marginTop:"8px"}} color ="rgb(219, 15, 15)"/>
                  <span style ={{color:"grey", fontSize:"16px", fontWeight:"bold"}}>{aesBYDistrict(district)}  {"AE(S)"}</span>
                </div>:null}

                </div>
                </div>

                

                <div style ={{ marginTop:"9px",marginLeft:0, padding:12}}>
                  <div style = {{fontWeight:"bold", fontSize:"20px", color:"white", marginBottom:"3px"}}>Static Site(s)</div>
                <div style = {{color:"white", display:"flex"}}> 
                  <div style ={{marginTop:'8px'}}>Submission Rate   {getRecordedDistrictStaticSites(district).length}/ {getDistrictStaticSites(district)}  </div>
                  <div style ={{marginLeft:12, padding:"8px", borderRadius:"12px", width:'fit-content', background:"white", color:"darkgreen"}}>{staticSiteReportRate(district)} {"%"}</div> </div>

                <div style ={{marginTop:"12px"}}><ProgressBar bgcolor='beige' completed={district_staticSiteReportingRate(district)} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{flex:5, padding:"10px", borderLeft:"1px solid lightgrey", height:'3450px'}}>

          <Card1 value ={aes()} title={"Adverse Events"} icon = {<FiAlertTriangle size ={30} color ="red"/>} textColor="rgb(11, 74, 96)"/>

          <div style = {{padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px"}}>
            <div style ={{padding:6, background:"white", borderRadius:"12px", display:"flex"}}>
                <PiStrategyThin size ={45} color ="rgb(11, 74, 96)" style ={{flex:3}}/>  <div style ={{marginLeft:"23px", flex:8, fontSize:"18px", fontWeight:"bold", color:"rgb(11, 74, 96)"}}>MCs By Method</div>
            </div>

            <div style = {{display:"flex"}}> 

              <Card1 value = {surgicalDisposable()} title = {"Surgical Disposable"} textColor='rgb(11, 74, 96)'
               icon = {<FaCut size ={25} color ="lightgrey"/>} icon2={<BiTrash size ={25} color ="goldenrod"/>}/>

              

<Card1 value = {surgicalReusable()} title = {"Surgical Reusable"} textColor='rgb(11, 74, 96)'
              icon = {<FaCut size ={25} color ="lightgrey"/>}
              icon2 ={<FaRecycle size ={25} color ="goldenrod"/>}
              />

<Card1 value = {shangring()} title = {"Device"} textColor='rgb(11, 74, 96)'
              icon = {<FaRing size ={25} color ="lightgrey"/>}
              />


            </div>


            <CustomChart 
  labels={['Surgical Disposable', 'Surgical Re-usable', 'Shangring']} 
  data={[surgicalDisposable(), surgicalReusable(), shangring()]} 
  backgroundColors={['rgb(26, 86, 54)', 'rgb(42, 120, 127)', 'rgb(207, 209, 226)']} 
  borderColors={['rgb(26, 86, 54)', 'rgb(42, 120, 127)', 'rgb(207, 209, 226)']} 
  charttype={"bar"} 
/>


          </div>

          
          <div style = {{padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px", marginTop:'2rem'}}>
            <div style ={{padding:6, background:"white", borderRadius:"12px", display:"flex"}}>
                <TbRibbonHealth size ={45} color ="red" style ={{flex:3}}/>  <div style ={{marginLeft:"23px", flex:8, fontSize:"18px", fontWeight:"bold", color:"rgb(11, 74, 96)"}}>HIV Testing Statistics</div>
            </div>

            <div style = {{display:"flex"}}> 

              <Card1 value = {hivNegative()} title = {"HIV Negative"} textColor='rgb(11, 74, 96)'
               icon = {<BiMinusCircle size ={25} color ="rgb(11, 74, 96)"/>} />

              

<Card1 value = {hivPositive()} title = {"HIV Positive"} textColor='rgb(231, 17, 17)'
              icon = {<PiPlusCircle size ={25} color ="red"/>}
              />

<Card1 value = {hivUntested()} title = {"HIV Untested"} textColor='rgb(11, 74, 96)'
              icon = {<GiUncertainty size ={25} color ="brown"/>}

              />


            </div>

            <CustomChart2 
  labels={['HIV Negative', 'HIV Positive', 'HIV Untested']} 
  data={[hivNegative(), hivPositive(), hivUntested()]} 
  backgroundColors={['rgb(27, 93, 98)', 'rgb(246, 37, 33)', 'rgb(215, 216, 235)']} 
  borderColors={['rgb(27, 93, 98)', 'rgb(246, 37, 33)', 'rgb(215, 216, 235)']} 
  charttype={"pie"} 
/>

<div></div>





          </div>

          <div style = {{padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px", marginTop:'2rem'}}>
            <div style ={{padding:6, background:"white", borderRadius:"12px", display:"flex" , color:"darkgreen"}}>
                <FaHospitalUser size ={40} color ="rgb(11, 74, 96)" style ={{flex:3}}/>
                <div style ={{marginLeft:"23px", flex:8, fontSize:"18px", fontWeight:"bold", color:"rgb(11, 74, 96)"}}>Client Follow-up Rate</div>
            </div>

            <div style = {{display:"flex"}}> 
              <div>
              <Card value = {getTotalFollowUp()} value2={followUpRate()} title = {"Total Follow-up"} textColor='rgb(16, 143, 63)'
               icon = {<SlUserFollowing size ={25} color ="green" />}  style ={{flex:3}}/>
               </div>

            

            </div>


          </div>

        </div>
        
        </div></div>)
       : (
        <StaticSites facilities={districtSites} 
        staticSites={getStaticSites()} selectedMonth={selectedMonth} selectedYear={selectedYear} selectedDistrict={selectedDistrict} username ={username}/>
       )
        
      }
      </div>}
    </div>:<App/>}
    </div>
  );
}
