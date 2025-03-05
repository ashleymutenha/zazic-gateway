import Header from "../Header"
import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import { BsCollection, BsFillGeoFill, BsHospital } from "react-icons/bs";
import { FaBookMedical, FaClinicMedical, FaCut, FaHandshake, FaHospitalUser, FaRibbon, FaRing } from "react-icons/fa";
import { GiMedicalDrip, GiMedicalPack, GiMedicalThermometer } from "react-icons/gi";
import Card1 from "./Card1";
import { FiAlertTriangle } from "react-icons/fi";
import { PiStrategyThin } from "react-icons/pi";
import { BiBookmark, BiInjection, BiMale, BiTrash } from "react-icons/bi";
import CustomChart from "./Chart";
import { GoNumber } from "react-icons/go";
import Facility from "../staticSiteComponents/Facility";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css'; 
import '../css/staticSite.css'
import { IoRibbon } from "react-icons/io5";
import { FaKitMedical } from "react-icons/fa6";
import { CgDanger } from "react-icons/cg";
import { TbAlertTriangle, TbRibbonHealth } from "react-icons/tb";
import Card from "./Card";
import { SlUserFollowing } from "react-icons/sl";
import HTS from "../staticSiteComponents/HTS";
import { RiToolsLine } from "react-icons/ri";
import { MdMedicalServices, MdMedicationLiquid } from "react-icons/md";
import TableAEs from "./TableAEs";
import { sites } from "./sites";
import TablePreP from "./TablePreP";
import TableCare from "./TableCare";
import TableOther from "./TableOther";
import TableSTI from "./TableSTI";
import TableSRH from "./TableSRH";
import ProgressBar from "./ProgressBar";
import SitesNotSubmitted from "../popupComponents/sitesNotSubmitted";
// Import default styles


// All custom elements should pass through other props

export default function StaticSite ({username, district, staticSite,_selectedYear, _selectedMonth}){
    const [mcs, setMCs] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const [shownSection, setShownSection] = useState('mc Method')
    const [facility,setFacility] = useState()
    const [showFacility, setShowFacility] = useState(false)

    const [linkagesShownSection , setLinkageSection] = useState('prep')

    const CustomTab = ({ children, ...otherProps }) => (
      <Tab {...otherProps} style ={{padding:0, margin:0}}>
        <h4>{children}</h4>
      </Tab>
    );
   
    const ageGroupHeadings = ['District','Site','VMMC Number', 'Client Age', 'MC Method', 'Date AE Reported', 'AE Classification', 'AE Code', 'Circumcising Cadre', 'AE Management']


    useEffect( ()=>{

    const fetchData = async () => {
        try {
          const timestamp = new Date().getTime();
          const response = await fetch(`https://ashleymutenha.github.io/zazic-commcareManipulation/data.json?_=${timestamp}`);
          if (!response.ok) throw new Error('Failed to fetch data.');
  
          const rawData = await response.text();
          const cleanData = JSON.parse(rawData.replace(/\bNaN\b/g, 'null'));
  
          console.log("data",cleanData)
          setMCs(cleanData);
  
  
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

          else{

          
              setSelectedMonth(_selectedMonth);
              setSelectedYear(_selectedYear);
          
          }


         
  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData()


    },[])


    const _aes =()=>{
      let aes =[]
      for(let mc of filteredFacilites() ){
        if(mc['recordingMonth'] ==selectedMonth && mc['year']==selectedYear){
          mc['matchingAES'].map((ae)=>{
            ae.district = mc['District']
            ae.site = mc['facilityName']
            aes.push(ae)
          })
        }
      }
     return aes
    }


    const hivPositiveByFacility =(facility)=>{
      let sum =0
      
          const calculateSum = (mc) => {
              return mc["hivPositive15-19"] + mc["hivPositive20-24"] + mc["hivPositive25-29"] +
                     mc["hivPositive30-34"] + mc["hivPositive35-39"] + mc["hivPositive40-44"] +
                     mc["hivPositive45-49"] + mc["hivPositive50"];
            };
      
   filteredFacilites().map((mc)=>{
         if(mc['facilityName'] ==facility){
          sum +=calculateSum(mc);
         } 
      },0)
      return sum
    }

    const hivPositiveNCByFacility =(facility)=>{
      let sum =0
      
          const calculateSum = (mc) => {
              return mc["hivPositiveNC15-19"] + mc["hivPositiveNC20-24"] + mc["hivPositiveNC25-29"] +
                     mc["hivPositiveNC30-34"] + mc["hivPositiveNC35-39"] + mc["hivPositiveNC40-44"] +
                     mc["hivPositiveNC45-49"] + mc["hivPositiveNC50"]
            };
      
   filteredFacilites().map((mc)=>{
         if(mc['facilityName'] ==facility){
          sum +=calculateSum(mc);
         } 
      },0)
      return sum
    }

    const hivNegativeByFacility =(facility)=>{
      let sum =0
      const calculateSum = (mc) => {
          return mc["hivNegative15-19"] + mc["hivNegative20-24"] + mc["hivNegative25-29"] +
                 mc["hivNegative30-34"] + mc["hivNegative35-39"] + mc["hivNegative40-44"] +
                 mc["hivNegative45-49"] + mc["hivNegative50"];
        };
      
      filteredFacilites().map((mc)=>{
         if(mc['facilityName']==facility){
          sum +=calculateSum(mc);
         }
      },0)
      return sum
    }

    const prep =()=>{
        let array =[]

        for(let mc of filteredFacilites()){
          let object ={
            'district':mc['District'],
            'site':mc['facilityName'],
            'hivNegative':hivNegativeByFacility(mc['facilityName']),
            'hivPreP':mc['total_hiv_negative_linked_to_prep']
          }

          array.push(object)
        }
      return array
    }

    const care =()=>{
      let array =[]

      for(let mc of filteredFacilites()){
        let object ={
          'district':mc['District'],
          'site':mc['facilityName'],
          'hivPositive':hivPositiveByFacility(mc['facilityName']),
          'hivPositiveUC':hivPositiveNCByFacility(mc['facilityName']),
          'hivCare':mc['total_hiv_positive_linked_to_care']
        }

        array.push(object)
      }
    return array
  }
 

  const otherServices =()=>{
   let array =[]
    for(let mc of filteredFacilites()){

      mc.otherReferrals.map((referral)=>{
        array.push(referral)
      })
    }
    return array
  }


  const stiServices =()=>{
    let array =[]
    for(let mc of filteredFacilites()){
      
      let object ={
        "district":mc['District'],
        "site":mc['facilityName'],
        "stiReferrals":mc['total_mcs_referred_for_sti_services']
      }
      array.push(object)  
    }
    return array
  }


  const srhServices =()=>{
    let array =[]
    for(let mc of filteredFacilites()){
      
      let object ={
        "district":mc['District'],
        "site":mc['facilityName'],
        "stiReferrals":mc['total_mcs_referred_for_srh_services']
      }
      array.push(object)  
    }
    return array
  }


  const getFacilitiesByStatic =() =>{
    let _facilities =[]
     for(var site of sites){
       if(site.staticSite ==staticSite){
        for(var _site of site.facilities){
          _facilities.push(_site)
        }
       }
     }

     return _facilities
  }


  const SiteReportingRate = ()=>{
    return (filteredFacilites().length/getFacilitiesByStatic().length)*100
  }

  const getSitesNotReported = () => {
    let districts = [];
    for (let district of getFacilitiesByStatic()) {
        // Normalize facility name: convert to lowercase and remove ' clinic' if present
        let normalizedFacility = district['facility'].toLowerCase().replace(/\s+clinic$/, '');

        let count = filteredFacilites().filter(site => {
            let normalizedSiteName = site['facilityName'].toLowerCase().replace(/\s+clinic$/, '');
            return normalizedSiteName === normalizedFacility;
        }).length;
        
        if (count === 0) { 
            districts.push(district);
        }
    }
  
    return districts;
};



  



     const FacilityCard = ({ facility }) => (
        <div
          className="__topCard"
          style={{
            flex: "1 1 300px",
            maxWidth: "300px",
            marginLeft: "6rem",
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
           
            // justifyContent: "space-between",
            // alignItems:"center"
          }}
        >
          <div style ={{alignItems:"center", justifyContent: "space-between", display: "flex",
            flexDirection: "column",}}>
          <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
            <FaClinicMedical size={45} color="rgb(51, 103, 96)" />
            <div style={{ fontSize: 23, color: "rgb(83, 94, 83)", marginLeft: "10px" }}>
              {facility.facilityName}
            </div>
          </div>
    
          <div
            style={{
              padding: "12px",
              background: "beige",
              borderRadius: "12px",
              display: "flex",
              marginTop:"5px",
              alignItems: "center",
              gap: "8px",
              cursor:'pointer',
              alignItems: "center",
              width:"fit-content"
    
            }}
            onClick={() => {
            setFacility(facility)
            setShowFacility(true)
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: "500" }}>View Details</span>
            {/* <BsFillEyeFill size={30} color="rgb(8, 75, 62)" /> */}
          </div>
          </div>
          
                <div style ={{background:'rgb(239, 237, 237)', padding:'10px', width:'fit-content', marginTop:"3px", borderRadius:"12px", alignContent:'left'}}>
                                  <BsCollection style ={{marginRight:"3px"}}/>
                                  {getFacilityTotalMCs(facility.facilityName)}
                                </div>
        </div>
      );


    const checkOccurence =(element,parameter,array)=>{
        let count =0
  
        for(var i of array){
          if(i[parameter]==element[parameter]){
            count+=1
          }
        }
      return count
      }


      const filteredFacilites =()=>{
        let sites =[]

        for(var mc of mcs){
            if(mc['year']==selectedYear && mc['recordingMonth']==selectedMonth && mc['District'] ==district && mc['Site_Name'] ==staticSite){
                if(checkOccurence(mc,'facilityName',sites)==0){
                    sites.push(mc)
                }
            }
        }

        return sites
      }


      const totalMCs = () => {
        let sum = 0;
        for (var facility of filteredFacilites()) {
          sum += facility["totalMCs"];
        }
        return sum;
      };
    
    
      const getFacilityTotalMCs =(facilityName)=>{
        let sum =0
        for (var facility of filteredFacilites()){
          if(facility['facilityName']==facilityName){
            sum+=facility['totalMCs']
          }
        }
        return sum
    
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


      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ].map((month) => ({ value: month, label: month }));
    
      const years = Array.from({ length: 7 }, (_, i) => 2024 + i).map((year) => ({ value: year, label: year }));


      const aes = () => {
        let totalAEs = 0
       filteredFacilites().map((site)=>{
        
        totalAEs+=site['matchingAES'].length
       })
       return totalAEs

      };

    


    const surgicalReusable =()=>{
        let sum =0
        const calculateSum =(mc)=>{
          return mc["sgReusable15-19"]+mc["sgReusable20-24"]+mc["sgReusable25-29"]+mc["sgReusable30-34"]+
          mc["sgReusable35-39"]+mc["sgReusable40-44"]+mc["sgReusable45-49"]+mc["sgReusable50"]
        }
        
        filteredFacilites().map((mc)=>{
           
            sum +=calculateSum(mc);
            
        },0)
        return sum
      }

      const surgicalDisposable =()=>{
        let sum =0
        const calculateSum = (mc) => {
                  return mc["sgDisposable15-19"] + mc["sgDisposable20-24"] + mc["sgDisposable25-29"] +
                         mc["sgDisposable30-34"] + mc["sgDisposable35-39"] + mc["sgDisposable40-44"] +
                         mc["sgDisposable45-49"] + mc["sgDisposable50"];
                };
        
        filteredFacilites().map((mc)=>{
           
            sum +=calculateSum(mc);
            
        },0)
        return sum
      }

      const shangring =()=>{
        let sum =0
        const calculateSum = (mc) => {
                  return mc["shangring15-19"]+mc["shangring20-24"]+mc["shangring25-29"]+mc["shangring30-34"]+
                            mc["shangring35-39"]+mc["shangring40-44"]+mc["shangring45-49"]+mc["shangring50"]
                };
        
        filteredFacilites().map((mc)=>{
           
            sum +=calculateSum(mc);
            
        },0)
        return sum
      }

      const getTotalMCs = () => {
        let sum =0
        
           for(var mc of filteredFacilites()){
          if(mc['year']==selectedYear && mc['recordingMonth']==selectedMonth){
            sum+=mc['totalMCs']
          }
        
        }
        return sum;
      };


      const getTotalFollowUp =()=>{
        let total =0
        for(var mc of filteredFacilites()){
          
          if(mc['recordingMonth']==selectedMonth && mc['year']==selectedYear){
          let totalFollowUp = mc['fu15-19']+ mc['fu20-24']+ mc['fu25-29']+mc['fu30-34']+mc['fu35-39']+mc['fu40-44']+mc['fu45-49']+mc['fu50']
          total+=totalFollowUp
        }
      }
        return total
      }

      const followUpRate =()=>{
        return String(parseFloat(getTotalFollowUp()/getTotalMCs()*100).toFixed(2)) +"%"
      }





     
   
    return (
      <div>
         {showFacility===false?<div>

            <Header/>


               {/* Header Section */}    <div style ={{display:"flex"}}>
                                            <div style={{ display: "flex", marginBottom: "1rem", flex:10 }}>
                                              <div className="topCard" style={{ flex: 9, padding:"12px" }}>
                                                <div style={{ display: "flex", marginTop: "10px" }}>
                                                  <GiMedicalPack size={45} color="rgb(51, 103, 96)" />
                                                  <div
                                                    style={{
                                                      fontSize: 18,
                                                      color: "rgb(83, 94, 83)",
                                                      fontWeight: "bold",
                                                      marginLeft: "10px",
                                                    }}
                                                  >
                                                    {district} {'>'} {staticSite} 
                                                  </div>
                                                </div>
                                              </div>
                                              <div style={{ flex: 7 }}></div>
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
            </div></div>

            <div style ={{display:"flex"}}>
            <div style={{flex:4,padding:"10px", borderLeft:"1px solid lightgrey"}}>
                      <div style ={{display:"flex"}}>
                      <Card1 value ={totalMCs()} title={"Total MCs"} icon = {<div
  style={{
    background: "rgb(11, 74, 96)",
    borderRadius: "50%",
    width: 60,
    height: 60,
    display: "flex", // Enables flexbox
    alignItems: "center", // Centers vertically
    justifyContent: "center", // Centers horizontally
  }}
>
  <GoNumber size={30} color="#ffff" />
</div>} textColor="rgb(11, 74, 96)"/>

                      <Card1 value ={aes()} title={"Adverse Events"} icon = {
                        <div
                        style={{
                          background: "rgb(246, 225, 234)",
                          borderRadius: "50%",
                          width: 60,
                          height: 60,
                          display: "flex", // Enables flexbox
                          alignItems: "center", // Centers vertically
                          justifyContent: "center", // Centers horizontally
                        }}
                      >
                        <FiAlertTriangle size ={30} color ="red"/></div>} textColor="rgb(11, 74, 96)"/>

                      
                        
                        
                        </div>

                        <div className="_topCard" style={{ flex: 1, height:'fit-content' }}>
              <div style={{ padding: '12px', borderBottom: '1px solid lightgrey' }}>
                <BsFillGeoFill size={30} color="rgb(137, 166, 177)" />
              </div>
              <div style={{ fontWeight: 'bold', fontSize: 18, color: 'rgb(39, 126, 157)' }}>Total Facilities that have Reported</div>


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
    {filteredFacilites().length} {"/"} {getFacilitiesByStatic().length}
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
    {SiteReportingRate().toFixed(0)} {"%"}
  </div>
</div>



              <div style ={{marginTop:"12px"}}><ProgressBar bgcolor='rgb(29, 82, 99)' completed={SiteReportingRate()} containerColor="rgb(232, 238, 240)" /></div>
              <SitesNotSubmitted sites ={getSitesNotReported()}/>
             {/* { getDistricts() != getPartnerDistrict()? <DistrictsNotSubmitted districts={getDistrictsNotReported()} partnerDistrictTotal ={getPartnerDistrict().length}/>:null} */}
            </div>


                        <div style = {{padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px", marginTop:'2rem'}}>
                                                                  <div style ={{padding:6, background:"white", borderRadius:"12px", display:"flex" , color:"darkgreen"}}>
                                                                      <FaHospitalUser size ={40} color ="green" style ={{flex:3}}/>
                                                                      <div style ={{marginLeft:"23px", flex:8, fontSize:"18px", fontWeight:"bold"}}>Client Follow-up Rate</div>
                                                                  </div>
                                                      
                                                                  <div style = {{display:"flex"}}> 
                                                                    <div>
                                                                    <Card value = {getTotalFollowUp()} value2={followUpRate()} title = {"Total Follow-up"} textColor='rgb(16, 143, 63)'
                                                                     icon = {<SlUserFollowing size ={25} color ="green" />}  style ={{flex:3}}/>
                                                                     </div>
                                                      
                                                                  
                                                      
                                                                  </div>
                                                      
                                                      
                                                                </div>

            
                      </div>
 <div style = {{flex:6, padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px", margin:6}}>
                      <Tabs>
    <TabList>
      <CustomTab style ={{marginRight:0}}>
        <div style ={{display:"flex"}}>
        <div style ={{background:"darkgreen", padding:'12px', color:'#ffff'}}
        onClick={()=>{
          setShownSection('mc Method')
        }}
        >MC Method <FaKitMedical size ={20}/></div>
      <div style ={{background:"green", padding:'12px', color:'#ffff'}}

onClick={()=>{
  setShownSection('HTS')
}}
      
      >HTS <FaRibbon size ={20}/></div>
      <div style ={{background:"rgb(54, 75, 64)", padding:'12px', color:'#ffff'}}

onClick={()=>{
  setShownSection('linkages')
}}
      
      >Linkages & Referrals <FaHandshake size ={20}/></div>


<div style ={{background:"rgb(19, 90, 53)", padding:'12px', color:'#ffff'}}

onClick={()=>{
  setShownSection('aes')
}}
      
      >AE(s) <TbAlertTriangle size ={20}/></div>
      </div>
      </CustomTab>
      <CustomTab style ={{marginLeft:0}}></CustomTab>
    </TabList>
    <TabPanel>
    {shownSection ==='mc Method' && shownSection !=='HTS' && shownSection!=='aes' && shownSection!='linkages'?<div> <div style = {{flex:8, padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px", margin:6}}>
                        <div style ={{padding:6, background:"white", borderRadius:"12px", display:"flex"}}>
                            <RiToolsLine size ={45} color ="rgb(11, 74, 96)" style ={{flex:1}}/> <MdMedicalServices size ={45} color ="rgb(20, 61, 22)" style ={{flex:1 ,margin:0}}/>   <div style ={{marginLeft:"23px", flex:8, fontSize:"18px", fontWeight:"bold", color:"rgb(11, 74, 96)"}}>MCs By Method</div>
                        </div>

                        <div style = {{display:"flex"}}> 
                          <div style ={{flex:4}}>
                          <Card1 value = {surgicalDisposable()} title = {"Surgical Disposable"} textColor='rgb(11, 74, 96)'
                        
                           icon = {<FaCut size ={25} color ="lightgrey"/>} icon2={<BiTrash size ={25} color ="goldenrod"/>}/>

                           </div>

                           <div style ={{flex:4}}>
                          <Card1 value = {surgicalReusable()} title = {"Surgical Reusable"} textColor='rgb(11, 74, 96)'
                        
                           icon = {<FaCut size ={25} color ="lightgrey"/>} icon2={<BiTrash size ={25} color ="goldenrod"/>}/>

                           </div>


                           
                           <div style ={{flex:4}}>
                          <Card1 value = {shangring()} title = {"Shangring"} textColor='rgb(11, 74, 96)'
                        
                           icon = {<FaBookMedical size ={25} color ="lightgrey"/>} icon2={<FaRing size ={25} color ="goldenrod"/>}/>

                           </div>
                           
                           
                           </div>

                           <CustomChart
  labels={['Surgical Disposable', 'Surgical Re-usable', 'Shangring']} 
  data={[surgicalDisposable(), surgicalReusable(), shangring()]} 
  backgroundColors={['rgb(26, 86, 54)', 'rgb(42, 120, 127)', 'rgb(207, 209, 226)']} 
  borderColors={['rgb(26, 86, 54)', 'rgb(42, 120, 127)', 'rgb(207, 209, 226)']} 
  charttype={"bar"} 
/>
                        </div></div>:shownSection ==='HTS' && shownSection!=='mcMethod' && shownSection!=='aes' && shownSection!='linkages'?
                        <div>
                         <div style ={{padding:6, background:"white", borderRadius:"12px", display:"flex"}}>
                         <TbRibbonHealth size ={45} color ="rgb(214, 15, 15)" style ={{flex:3}}/>  <div style ={{marginLeft:"23px", flex:8, fontSize:"18px", fontWeight:"bold", color:"rgb(11, 74, 96)"}}>HIV Testing Statistics</div>
                     </div>
                        <HTS facilities={filteredFacilites()} totalMCs={totalMCs()}/></div>:
                        shownSection ==='aes'&&shownSection!=='HTS' && shownSection!=='mcMethod' && shownSection!='linkages'?
                                                      
                                                      <div style = {{padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px", marginTop:'2rem'}}>
                                                      <div style ={{padding:6, background:"white", borderRadius:"12px", display:"flex"}}>
                                                          <BiMale size ={45} color ="green" style ={{flex:1}}/>  <FiAlertTriangle size ={45} color ="red" style ={{flex:1}}/> <div style ={{marginLeft:"23px", flex:8, fontSize:"18px", fontWeight:"bold", color:"rgb(11, 74, 96)"}}>Adverse Events</div>
                                                      </div>    
                                                              <div style ={{marginTop:"10px"}}>
                                                                <TableAEs rowElements ={_aes()} headings={ageGroupHeadings} />
                                                                </div>
                                                                </div>:<div>

                                                                <div style ={{display:"flex"}}>
        <div style ={{background:"rgb(206, 218, 206)", padding:'12px', color:'black', cursor:"pointer"}}
        onClick={()=>{
          setLinkageSection('prep')
        }}
        >Linkage to PreP <GiMedicalDrip size ={20}/></div>
      <div style ={{background:"rgb(199, 214, 213)", padding:'12px', color:'black', cursor:"pointer"}}

onClick={()=>{
  setLinkageSection('care')
}}
      
      >Linkage to Care  <BiInjection size ={20}/></div>
      <div style ={{background:"rgb(166, 177, 172)", padding:'12px', color:'black', cursor:"pointer"}}

onClick={()=>{
  setLinkageSection('other')
}}
      
      >Referral to Other Services  <FaHandshake size ={20}/></div>


<div style ={{background:"rgb(222, 231, 227)", padding:'12px', color:'black', cursor:"pointer"}}

onClick={()=>{
  setLinkageSection('sti')
}}
      
      >Referral to STI Services <FaClinicMedical size ={20}/></div>

<div style ={{background:"rgb(208, 218, 214)", padding:'12px', color:'black', cursor:"pointer"}}

onClick={()=>{
  setLinkageSection('srh')
}}
      
      >Referral to SRH Services <MdMedicationLiquid size ={20}/></div>


      </div>
  
  {linkagesShownSection =='prep'&& linkagesShownSection!='care' && linkagesShownSection!='other' && 
  linkagesShownSection !='sti' &&  linkagesShownSection !='srh'?<div style = {{padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px", marginTop:'2rem'}}>
  <div style ={{padding:6, background:"white", borderRadius:"12px", display:"flex"}}>
        <BiBookmark size ={45} color ="darkgreen" style ={{flex:1}}/> <div style ={{marginLeft:"23px", flex:8, fontSize:"18px", fontWeight:"bold", color:"rgb(11, 74, 96)"}}>Linkages to PreP</div>
  </div> 
  <div style ={{marginTop:"12px"}}>
      <TablePreP headings={['District','Site','HIV -ve MCs', 'Linkages to PreP']} rowElements={prep()}/></div>
      </div>:linkagesShownSection =='care'&& linkagesShownSection!='prep' && linkagesShownSection !='other' && 
      linkagesShownSection !='sti' &&  linkagesShownSection !='srh'?

<div style = {{padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px", marginTop:'2rem'}}>
<div style ={{padding:6, background:"white", borderRadius:"12px", display:"flex"}}>
      <BiBookmark size ={45} color ="darkgreen" style ={{flex:1}}/> <div style ={{marginLeft:"23px", flex:8, fontSize:"18px", fontWeight:"bold", color:"rgb(11, 74, 96)"}}>Linkages to PreP</div>
</div> 
<div style ={{marginTop:"12px"}}>
    <TableCare headings={['District','Site','HIV +ve MCs','Uncircumcised HIV +ve', 'Linkages to ART']} rowElements={care()}/></div>
    </div>:linkagesShownSection =='other'&& linkagesShownSection!='care' && 
    linkagesShownSection !='prep' && linkagesShownSection !='sti' &&  linkagesShownSection !='srh'?

<div style = {{padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px", marginTop:'2rem'}}>
<div style ={{padding:6, background:"white", borderRadius:"12px", display:"flex"}}>
      <BiBookmark size ={45} color ="darkgreen" style ={{flex:1}}/> <div style ={{marginLeft:"23px", flex:8, fontSize:"18px", fontWeight:"bold", color:"rgb(11, 74, 96)"}}>Referrals to Other Services</div>
</div> 
<div style ={{marginTop:"12px"}}>
    <TableOther headings={['District','Site','Service Referred','Reason']} rowElements={otherServices()}/></div>
    </div>:linkagesShownSection =='sti'&& linkagesShownSection!='care' && linkagesShownSection !='prep' && 
    linkagesShownSection !='other' &&  linkagesShownSection !='srh'
    ?

<div style = {{padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px", marginTop:'2rem'}}>
<div style ={{padding:6, background:"white", borderRadius:"12px", display:"flex"}}>
      <BiBookmark size ={45} color ="darkgreen" style ={{flex:1}}/> <div style ={{marginLeft:"23px", flex:8, fontSize:"18px", fontWeight:"bold", color:"rgb(11, 74, 96)"}}>Referrals to STI Services</div>
</div> 
<div style ={{marginTop:"12px"}}>
    <TableSTI headings={['District','Site','Total Referrals to STI Services']} rowElements={stiServices()}/></div>
    </div>:linkagesShownSection =='srh'&& linkagesShownSection!='care' && linkagesShownSection !='prep' && 
    linkagesShownSection !='other' &&  linkagesShownSection !='sti'?

    <div style = {{padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px", marginTop:'2rem'}}>
<div style ={{padding:6, background:"white", borderRadius:"12px", display:"flex"}}>
      <BiBookmark size ={45} color ="darkgreen" style ={{flex:1}}/> <div style ={{marginLeft:"23px", flex:8, fontSize:"18px", fontWeight:"bold", color:"rgb(11, 74, 96)"}}>Referrals to SRH Services</div>
</div> 
<div style ={{marginTop:"12px"}}>
    <TableSRH headings={['District','Site','Total Referrals to SRH Services']} rowElements={srhServices()}/></div>
    </div>:null
      
    }
                                                                </div>
                        
                      }
    </TabPanel>
    <TabPanel>
      <div>Panel 2</div>
    </TabPanel>
  </Tabs>
 </div>           
                       </div>


<div style={{ margin: '10px', display: 'flex', alignItems: 'center',background:"#ececec", width:'fit-content', paddingRight:"4px" }}>
            <BsHospital size={30} color="#FFFF" style={{ marginRight: '10px', background: 'rgb(8, 75, 62)', padding: '14px' }} />
            <div style={{ fontSize: 34,display:"flex"  }}> <div>Facilities</div>
          
            </div>
          </div>

            <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {filteredFacilites().map((facility) => (
              <FacilityCard key={facility.facility} facility={facility} />
            ))}
          </div>

        </div>:<Facility Details ={facility} district ={district} username={username} 
        _staticSite={staticSite} _selectedMonth ={selectedMonth} _selectedYear={selectedYear}/>}
        
        </div>
    )
}