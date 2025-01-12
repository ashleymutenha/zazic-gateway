import React, { useEffect, useState } from 'react';
import { BiDevices, BiMapPin, BiMinusCircle, BiSolidDashboard, BiSolidNews, BiTrash } from 'react-icons/bi';
import { BsCollection, BsFillGeoFill, BsGlobe, BsGraphUpArrow, BsSun, BsSunrise } from 'react-icons/bs';
import Select from 'react-select';
import Facilities from './Facilities';
import './css/dashboard.css';
import StaticSites from './StaticSites';
import Card1 from './bodyComponents/Card1';
import { FiAlertTriangle } from 'react-icons/fi';
import { HiListBullet } from 'react-icons/hi2';
import { PiPlusCircle, PiStrategyThin } from 'react-icons/pi';
import { FaCalculator, FaCut, FaHospitalUser, FaRing } from 'react-icons/fa';
import { FaChartGantt, FaRecycle, FaRibbon } from 'react-icons/fa6';
import { TbRibbonHealth, TbTopologyRing } from 'react-icons/tb';
import { SiRevolut, SiRing } from 'react-icons/si';
import { info} from './data';
import { IoAnalytics, IoRibbon } from 'react-icons/io5';
import { GiUncertainty } from 'react-icons/gi';
import { ImSortNumericAsc } from 'react-icons/im';
import { FcNumericalSorting12, FcStatistics } from 'react-icons/fc';
import { AiOutlineNumber } from 'react-icons/ai';
import { RiChatFollowUpLine } from 'react-icons/ri';
import { CiMedicalCross } from 'react-icons/ci';
import Card from './bodyComponents/Card';
import { SlUserFollowing } from 'react-icons/sl';
import { useGoogleLogin } from '@react-oauth/google';
import {sites} from './bodyComponents/sites'
import ProgressBar from './bodyComponents/ProgressBar';
import { partnerDistricts } from './bodyComponents/sites';

export default function Dashboard({ _selectedMonth, _selectedYear }) {
  const [mcs, setMCs] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(_selectedMonth || '');
  const [selectedYear, setSelectedYear] = useState(_selectedYear || '');
  const [showStaticSites, setStaticSites] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districtSites, setDistrictSites] = useState([]);
  const [userPriviledge, setUserPriviledges] = useState([])
  const [userDomain, setUserDomain] = useState([])

  
  // const login = useGoogleLogin({
  //   onSuccess: tokenResponse => console.log(tokenResponse),
  // });
 

  useEffect(() => {

    setUserPriviledges('partner')
    setUserDomain('ZICHIRE')

    const fetchData = async () => {
      try {
        const response = await fetch('https://ashleymutenha.github.io/zazic-commcareManipulation/data.json');
        if (!response.ok) throw new Error('Failed to fetch data.');

        const rawData = await response.text();
        const cleanData = JSON.parse(rawData.replace(/\bNaN\b/g, 'null'));
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
    // const intervalId = setInterval(() => {
    //   fetchData();
    // }, 5000); 

    // return () => clearInterval(intervalId);
 
  },[]);



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


  const getTotalMCs = () => {
    let sum =0
    for(var mc of mcs){
      if(userPriviledge =='partner'){
       if(mc['Partner']==userDomain){
      if(mc['year']==selectedYear && mc['recordingMonth']==selectedMonth){
        sum+=mc['totalMCs']
      }
    }
  }
  }
    return sum;
  };


  const aes =()=>{

    let _aes  =0
    for(var mc of mcs){
      if(userPriviledge =='partner'){
        if(mc['Partner']==userDomain){
      if(mc['recordingMonth']==selectedMonth && mc['year']==selectedYear){
      _aes+=mc['matchingAES'].length
      }
    }
  }}
    return _aes
  }

  const surgicalDisposable =()=>{
    let sum =0
    for(var mc of mcs){
      if(userPriviledge =='partner'){
        if(mc['Partner']==userDomain){
      if(mc['recordingMonth']==selectedMonth && mc['year']==selectedYear){

        let _sum = mc["sgDisposable15-19"]+mc["sgDisposable20-24"]+mc["sgDisposable25-29"]+mc["sgDisposable30-34"]+
        mc["sgDisposable35-39"]+mc["sgDisposable40-44"]+mc["sgDisposable45-49"]+mc["sgDisposable50"]
      sum+=_sum
      }
    }
  }}
    return sum
  }

  const surgicalReusable =()=>{
    let sum =0
    for(var mc of mcs){
      if(userPriviledge =='partner'){
        if(mc['Partner']==userDomain){
      if(mc['recordingMonth']==selectedMonth && mc['year']==selectedYear){

        let _sum = mc["sgReusable15-19"]+mc["sgReusable20-24"]+mc["sgReusable25-29"]+mc["sgReusable30-34"]+
        mc["sgReusable35-39"]+mc["sgReusable40-44"]+mc["sgReusable45-49"]+mc["sgReusable50"]
      sum+=_sum
      }
    }}}
    return sum
  }

  
  const shangring =()=>{
    let sum =0
    for(var mc of mcs){
      if(userPriviledge =='partner'){
        if(mc['Partner']==userDomain){
      if(mc['recordingMonth']==selectedMonth && mc['year']==selectedYear){

        let _sum = mc["shangring15-19"]+mc["shangring20-24"]+mc["shangring25-29"]+mc["shangring30-34"]+
        mc["shangring35-39"]+mc["shangring40-44"]+mc["shangring45-49"]+mc["shangring50"]
      sum+=_sum
      }
    }}}
    return sum
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
  for( var element of partnerDistricts){
    if(element['partner']==userDomain){
      array = element['districts']
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
    const facilities = mcs.filter(
      (item) =>
        String(item.District).toLowerCase() === String(district).toLowerCase() &&
        String(item.year) === String(selectedYear) &&
        String(item.recordingMonth).toLowerCase() === String(selectedMonth).toLowerCase()
    );
    
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

  const hivPositive =()=>{

    let sum =0
    for(var mc of mcs){
      if(userPriviledge =='partner'){
        if(mc['Partner']==userDomain){
      if(mc['recordingMonth']==selectedMonth && mc['year']==selectedYear){

        let _sum = mc["hivPositive15-19"]+mc["hivPositive20-24"]+mc["hivPositive25-29"]+mc["hivPositive30-34"]+
        mc["hivPositive35-39"]+mc["hivPositive40-44"]+mc["hivPositive45-49"]+mc["hivPositive50"]
      sum+=_sum
      }
    }}}
    return sum
  }

  const hivNegative =()=>{

    let sum =0
    for(var mc of mcs){
      if(userPriviledge =='partner'){
        if(mc['Partner']==userDomain){
      if(mc['recordingMonth']==selectedMonth && mc['year']==selectedYear){

        let _sum = mc["hivNegative15-19"]+mc["hivNegative20-24"]+mc["hivNegative25-29"]+mc["hivNegative30-34"]+
        mc["hivNegative35-39"]+mc["hivNegative40-44"]+mc["hivNegative45-49"]+mc["hivNegative50"]
      sum+=_sum
      }
    }}}
    return sum
  }

  const hivUntested = ()=>{
    return getTotalMCs()-(hivNegative()+hivPositive())
  }

 function getTotalMCByDistrict(district){
   let sum =0
  for(var mc of mcs){
    if(mc['year']==selectedYear && mc['recordingMonth']==selectedMonth && mc['District'] ==district){
      sum+=mc['totalMCs']
    }
  }
  return sum
  }

  const getTotalFollowUp =()=>{
    let total =0
    for(var mc of mcs){
      if(userPriviledge =='partner'){
        if(mc['Partner']==userDomain){
      if(mc['recordingMonth']==selectedMonth && mc['year']==selectedYear){
      let totalFollowUp = mc['fu15-19']+ mc['fu20-24']+ mc['fu25-29']+mc['fu30-34']+mc['fu35-39']+mc['fu40-44']+mc['fu45-49']+mc['fu50']
      total+=totalFollowUp
    }}}
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
            

      {showStaticSites ===false ? (
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
            <div className="_topCard" style={{ flex: 1 }}>
              <div style={{ padding: '12px', borderBottom: '1px solid lightgrey' }}>
                <BsSun size={30} color="rgb(157, 157, 141)" />
              </div>
              <div style={{ fontWeight: 'bold', fontSize: 18, color: 'rgb(11, 129, 54)', marginTop: '5px' }}>Total MCs</div>
              <div style ={{color:"rgb(39, 126, 157)", fontSize:"23px", fontWeight:"bold"}} >{getTotalMCs()}</div>
            </div>

            <div className="_topCard" style={{ flex: 1 }}>
              <div style={{ padding: '12px', borderBottom: '1px solid lightgrey' }}>
                <BsFillGeoFill size={30} color="rgb(137, 166, 177)" />
              </div>
              <div style={{ fontWeight: 'bold', fontSize: 18, color: 'rgb(11, 129, 54)' }}>Total District that have Reported</div>
              <div style ={{color:"rgb(39, 126, 157)", fontSize:"23px", fontWeight:"bold"}}>{getDistricts().length} {"/"} {getPartnerDistrict().length}</div>


              <div style ={{marginTop:"12px"}}><ProgressBar bgcolor='rgb(29, 82, 99)' completed={districtSubmissionRate()} containerColor="rgb(232, 238, 240)" /></div>
            </div>
          </div>

          <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center',background:"#ececec", width:'fit-content', paddingRight:"4px" }}>
            <BsGlobe size={30} color="#FFFF" style={{ marginRight: '10px', background: 'rgb(8, 75, 62)', padding: '14px' }} />
            <div style={{ fontSize: 34,  }}>ZAZIC DISTRICTS</div>
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

                <div style ={{background:'rgb(239, 237, 237)', padding:'10px', width:'fit-content', marginTop:"6px", borderRadius:"12px"}}>
                  <FaCalculator style ={{marginRight:"3px", marginTop:"8px"}} color ="rgb(56, 141, 117)"/>
                  <span style ={{color:"rgb(39, 126, 157)", fontSize:"23px", fontWeight:"bold"}}>{getTotalMCByDistrict(district)}  {"MC(S)"}</span>
                </div>
                </div>

                <div style ={{ marginTop:"9px",marginLeft:0, padding:12}}>
                  <div style = {{fontWeight:"bold", fontSize:"20px", color:"beige"}}>Static Site(s)</div>
                <div style = {{color:"white"}}> Submission Rate   {getRecordedDistrictStaticSites(district).length}/ {getDistrictStaticSites(district)}</div>

                <div style ={{marginTop:"12px"}}><ProgressBar bgcolor='beige' completed={district_staticSiteReportingRate(district)} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{flex:5, padding:"10px", borderLeft:"1px solid lightgrey", height:'3450px'}}>

          <Card1 value ={aes()} title={"Adverse Events"} icon = {<FiAlertTriangle size ={30} color ="red"/>} textColor="rgb(39, 126, 157)"/>

          <div style = {{padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px"}}>
            <div style ={{padding:6, background:"white", borderRadius:"12px", display:"flex"}}>
                <PiStrategyThin size ={45} color ="navy" style ={{flex:3}}/>  <div style ={{marginLeft:"23px", flex:8, fontSize:"18px"}}>MCs By Method</div>
            </div>

            <div style = {{display:"flex"}}> 

              <Card1 value = {surgicalDisposable()} title = {"Surgical Disposable"} textColor='rgb(11, 129, 54)'
               icon = {<FaCut size ={25} color ="lightgrey"/>} icon2={<BiTrash size ={25} color ="goldenrod"/>}/>

              

<Card1 value = {surgicalReusable()} title = {"Surgical Reusable"} textColor='rgb(11, 129, 54)'
              icon = {<FaCut size ={25} color ="lightgrey"/>}
              icon2 ={<FaRecycle size ={25} color ="goldenrod"/>}
              />

<Card1 value = {shangring()} title = {"Device"} textColor='rgb(11, 129, 54)'
              icon = {<FaRing size ={25} color ="lightgrey"/>}
              icon2 ={<FaRecycle size ={25} color ="goldenrod"/>}
              />


            </div>


          </div>

          
          <div style = {{padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px", marginTop:'2rem'}}>
            <div style ={{padding:6, background:"white", borderRadius:"12px", display:"flex"}}>
                <TbRibbonHealth size ={45} color ="red" style ={{flex:3}}/>  <div style ={{marginLeft:"23px", flex:8, fontSize:"18px"}}>HIV Testing Statistics</div>
            </div>

            <div style = {{display:"flex"}}> 

              <Card1 value = {hivNegative()} title = {"HIV Negative"} textColor='rgb(16, 143, 63)'
               icon = {<BiMinusCircle size ={25} color ="green"/>} />

              

<Card1 value = {hivPositive()} title = {"HIV Positive"} textColor='rgb(231, 17, 17)'
              icon = {<PiPlusCircle size ={25} color ="red"/>}
              />

<Card1 value = {hivUntested()} title = {"HIV Untested"} textColor='rgb(110, 119, 69)'
              icon = {<GiUncertainty size ={25} color ="brown"/>}

              />


            </div>


          </div>

          <div style = {{padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px", marginTop:'2rem'}}>
            <div style ={{padding:6, background:"white", borderRadius:"12px", display:"flex"}}>
                <FaHospitalUser size ={40} color ="green" style ={{flex:3}}/>
                <div style ={{marginLeft:"23px", flex:8, fontSize:"18px"}}>Client Follow-up Rate</div>
            </div>

            <div style = {{display:"flex"}}> 
              <div>
              <Card value = {getTotalFollowUp()} value2={followUpRate()} title = {"Total Follow-up"} textColor='rgb(16, 143, 63)'
               icon = {<SlUserFollowing size ={25} color ="green" />}  style ={{flex:3}}/>
               </div>

            

            </div>


          </div>

        </div>
        
        </div>)
       : (
        <StaticSites facilities={districtSites} 
        staticSites={getStaticSites()} selectedMonth={selectedMonth} selectedYear={selectedYear} selectedDistrict={selectedDistrict}/>
       )
        
      }
    </div>
  );
}
