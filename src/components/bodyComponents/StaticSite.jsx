import Header from "../Header"
import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import { BsCollection, BsFileExcel, BsFillGeoFill, BsHospital } from "react-icons/bs";
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

// import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx-js-style';
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
          const cleanData1 = assignTotalMCs(cleanData)

          const cleanData2 = hivUntestedAgeGroups(cleanData1)
          const cleanData3 = hivUntestedTotal(cleanData2)
          const cleanData4 = assignFacilityType(cleanData3)

          const cleanData5 = surgicalDisposableTotal(cleanData4)
          const cleanData6 = surgicalReusableTotal(cleanData5)
          const cleanData7 = shangringTotal(cleanData6)

          const cleanData8 = hivPositiveTotal(cleanData7)
          const cleanData9 = hivNegativeTotal(cleanData8)
          const cleanData10 = followUpTotal(cleanData9)
          // console.log("data",cleanData6)
          setMCs(cleanData10);
  
  
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

      window.scrollTo(0, 0);


    },[])

    const hivUntestedAgeGroups = (data) => {
  let array = [];

  for (let mc of data) {
    // Define age groups from 15-19 to 45-49 (inclusive)
    const ageGroups = [
      '15-19', '20-24', '25-29',
      '30-34', '35-39', '40-44', '45-49', '50'
    ];

    for (let group of ageGroups) {
      const totalKey = `mc${group}`;
      const negKey = `hivNegative${group}`;
      const posKey = `hivPositive${group}`;
      const untestedKey = `hivUntested${group}`;

      mc[untestedKey] = (mc[totalKey] || 0) - (mc[negKey] || 0) - (mc[posKey] || 0);
    }

    array.push(mc);
  }

  return array;
};




const hivUntestedTotal = (data) => {
  let array = [];
  for (let mc of data) {
    let total =
      (mc['hivUntested15-19'] || 0) +
      (mc['hivUntested20-24'] || 0) +
      (mc['hivUntested25-29'] || 0) +
      (mc['hivUntested30-34'] || 0) +
      (mc['hivUntested35-39'] || 0) +
      (mc['hivUntested40-44'] || 0) +
      (mc['hivUntested45-49'] || 0) +
      (mc['hivUntested50'] || 0);

    mc['hivUntestedTotal'] = total;

    array.push(mc);
  }
  return array;
};


const hivNegativeTotal = (data) => {
  let array = [];
  for (var mc of data) {
    let total =
      mc['hivNegative15-19']  +
      mc['hivNegative20-24']  +
      mc['hivNegative25-29'] +
      mc['hivNegative30-34']  +
      mc['hivNegative35-39']+
      mc['hivNegative40-44'] +
      mc['hivNegative45-49'] +
      mc['hivNegative50'];

    mc['hivNegativeTotal'] = total;

    array.push(mc);
  }
  return array;
};


const hivPositiveTotal = (data) => {
  let array = [];
  for (var mc of data) {
    let total =
      mc['hivPositive15-19']  +
      mc['hivPositive20-24']  +
      mc['hivPositive25-29'] +
      mc['hivPositive30-34']  +
      mc['hivPositive35-39']+
      mc['hivPositive40-44'] +
      mc['hivPositive45-49'] +
      mc['hivPositive50'];

    mc['hivPositiveTotal'] = total;

    array.push(mc);
  }
  return array;
};


const surgicalDisposableTotal = (data) => {
  let array = [];
  for (var mc of data) {
    let surgicalTotal =
      (mc['sgDisposable15-19'] || 0) +
      (mc['sgDisposable20-24'] || 0) +
      (mc['sgDisposable25-29'] || 0) +
      (mc['sgDisposable30-34'] || 0) +
      (mc['sgDisposable35-39'] || 0) +
      (mc['sgDisposable40-44'] || 0) +
      (mc['sgDisposable45-49'] || 0) +
      (mc['sgDisposable50'] || 0);

    mc['surgicalDisposableTotal'] = surgicalTotal;
    array.push(mc);
  }
  return array;
};


const surgicalReusableTotal = (data) => {
  let array = [];
  for (var mc of data) {
    let surgicalTotal =
      (mc['sgReusable15-19'] || 0) +
      (mc['sgReusable20-24'] || 0) +
      (mc['sgReusable25-29'] || 0) +
      (mc['sgReusable30-34'] || 0) +
      (mc['sgReusable35-39'] || 0) +
      (mc['sgReusable40-44'] || 0) +
      (mc['sgReusable45-49'] || 0) +
      (mc['sgReusable50'] || 0);

    mc['surgicalReusableTotal'] = surgicalTotal;
    array.push(mc);
  }
  return array;
};




const followUpTotal = (data) => {
  return data.map((entry) => {
    const ageGroups = [
      'fu15-19',
      'fu20-24',
      'fu25-29',
      'fu30-34',
      'fu35-39',
      'fu40-44',
      'fu45-49',
      'fu50'
    ];

    entry['followUpTotal'] = ageGroups.reduce((sum, key) => sum + (entry[key] || 0), 0);
    return entry;
  });
};


const shangringTotal = (data) => {
  let array = [];
  for (var mc of data) {
    let total =
      mc['shangring15-19']  +
      mc['shangring20-24']  +
      mc['shangring25-29'] +
      mc['shangring30-34']  +
      mc['shangring35-39']+
      mc['shangring40-44'] +
      mc['shangring45-49'] +
      mc['shangring50'];

    mc['shangringTotal'] = total;

    array.push(mc);
  }
  return array;
};



 



   const assignTotalMCs = (data) => {
  let arrAy =[]
  for (const mc of data) {
    let total = 
      (mc['mc15-19'] || 0) +
      (mc['mc20-24'] || 0) +
      (mc['mc25-29'] || 0) +
      (mc['mc30-34'] || 0) +
      (mc['mc35-39'] || 0) +
      (mc['mc40-44'] || 0) +
      (mc['mc45-49'] || 0) +
      (mc['mc50+']   || 0);

      mc['totalMCs'] = total

      arrAy.push(mc)
  }
  return arrAy
};

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


      const getDistrictFacility = (district) => {
        let array = [];
        for (var site of sites) {
          if (site['district'] == district) {
            for (var facility of site.facilities) {
              array.push(facility);
            }
          }
        }
        return array; // Moved outside the loop
      };
      
      const getFacilityType = (facility, district) => {
        let facilityType = "";
        for (var _facility of getDistrictFacility(district)) {
          if (_facility['facility'] == facility) {
            facilityType = _facility['type'];
            break; // Exit loop early if match found
          }
        }
        return facilityType;
      };
      
      const assignFacilityType = (data) => {
        return data.map(mc => ({
          ...mc,
          facilityType: getFacilityType(mc['facilityName'], mc['District'])
        }));
      };


      const filteredFacilites =()=>{
        let sites =[]

        for(var mc of mcs){
            if(mc['year']==selectedYear && mc['recordingMonth']==selectedMonth && mc['District'] ==district && mc['Site_Name'] ==staticSite){
                if(checkOccurence(mc,'facilityName',sites)==0){
                  if(mc['facilityName']!= 'Masikati' && mc['facilityName']!= 'Murambi'){
                    sites.push(mc)
                }
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
    
      const years = Array.from({ length: 8 }, (_, i) => 2024 + i).map((year) => ({ value: year, label: year }));


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

 const getAES = () => {
  let aes = [];

  for (const mc of getMCsinTimePeriod()) {
    
    if (Array.isArray(mc.matchingAES) && mc.matchingAES.length > 0) {
      aes.push(...mc.matchingAES);
    }
  
}

  return aes;
};



 const getMCsinTimePeriod =()=>{

  let data =[]
  console.log("data", filteredFacilites())

  for(var mc of filteredFacilites()){
    if(mc['year'] ==selectedYear && mc['recordingMonth']==selectedMonth){

      data.push(mc)
    }
  }
  return data
 }



const handleExportClick = () => {
  const data1 = getMCsinTimePeriod();
  const aeData = getAES();

  const data2 = [
    { District: 'Harare', Target: 150 },
    { District: 'Bulawayo', Target: 100 },
  ];

  const ageGroups = ['15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50'];

  const boldStyle = {
    font: { bold: true },
    fill: { patternType: 'solid', fgColor: { rgb: 'CDE6F9' } }
  };

  const sectionHeaderStyle = {
    font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 13 },
    fill: { patternType: 'solid', fgColor: { rgb: '4E6E81' } }
  };

  const greyBoldStyle = {
    font: { bold: true },
    fill: { patternType: 'solid', fgColor: { rgb: 'D1E7DD' } }
  };

  const titleStyle = {
    font: { bold: true, color: { rgb: '000000' }, sz: 16 },
    fill: { patternType: 'solid', fgColor: { rgb: 'C9DBE5' } }
  };

  const sumColumn = (rows, colIndex) => rows.reduce((sum, r) => sum + (r[colIndex] || 0), 0);

  const buildMethodSection = (prefix, totalKey) => {
    const headers = ['District', 'Facility', ...ageGroups.map(age => `${age} yrs`), 'Total'];
    const rows = data1.map(row => [
      row.District,
      row.facilityName,
      ...ageGroups.map(age => row[`${prefix}${age}`]),
      row[totalKey]
    ]).sort((a, b) => a[0].localeCompare(b[0]));

    const totalRow = [
      'Total',
      '',
      ...ageGroups.map((_, i) => sumColumn(rows, i + 2)),
      sumColumn(rows, rows[0].length - 1)
    ];

    return { headers, rows, totalRow };
  };

  const buildLinkageSection = () => {
    const headers = [
      'District', 'Facility', 'Total Linkages to PreP', 'Total Linkages to Care',
      'Total Referral to SRH', 'Total Referral to STI', 'Total'
    ];

    const rows = data1.map(row => {
      const toPrep = row.total_hiv_negative_linked_to_prep || 0;
      const toCare = row.total_hiv_positive_linked_to_care || 0;
      const toSRH = row.total_mcs_referred_for_srh_services || 0;
      const toSTI = row.total_mcs_referred_for_sti_services || 0;
      const total = toPrep + toCare + toSRH + toSTI;
      return [row.District, row.facilityName, toPrep, toCare, toSRH, toSTI, total];
    }).sort((a, b) => a[0].localeCompare(b[0]));

    const totalRow = [
      'Total', '',
      ...[2, 3, 4, 5, 6].map(i => sumColumn(rows, i))
    ];

    return { headers, rows, totalRow };
  };

  const buildAESheet = () => {
    const headers = [
      'District', 'Facility', 'Date of Reporting', 'VMMC Number', 'Client Age',
      'AE Type', 'MC Method', 'AE Severity', 'Circumcising Cadre'
    ];
    const rows = aeData.map(row => [
      row.District, row.AERecordingSite, row.date_ae_identified, row.vmmc_number,
      row.client_age, row.ae_type_code, row.mcMethod, row.ae_classification, row.circumcising_cadre
    ]);
    return { headers, rows };
  };

  // Site-level summary with age group breakdown
  const siteAgeData = data1.reduce((acc, row) => {
    const site = row.Site_Name || 'Unknown Site';
    if (!acc[site]) {
      acc[site] = { total: 0 };
      ageGroups.forEach(age => acc[site][age] = 0);
    }
    acc[site].total += row.totalMCs;
    ageGroups.forEach(age => {
      const key = `mc${age}`;
      acc[site][age] += row[key] || 0;
    });
    return acc;
  }, {});

  const totalPerSite = Object.entries(siteAgeData).map(([site, data]) => [
    site,
    data.total,
    ...ageGroups.map(age => data[age])
  ]);

  const siteTotalRow = [
    'Total',
    totalPerSite.reduce((sum, row) => sum + row[1], 0),
    ...ageGroups.map((_, idx) =>
      totalPerSite.reduce((sum, row) => sum + (row[idx + 2] || 0), 0)
    )
  ];

  const modifiedData1 = data1.map(row => [
    row.District, row.facilityName, row.facilityType, row.totalMCs
  ]).sort((a, b) => a[0].localeCompare(b[0]));

  const facilityTotalRow = ['Total', '', '', sumColumn(modifiedData1, 3)];

  const surgicalDisposable = buildMethodSection('sgDisposable', 'surgicalDisposableTotal');
  const surgicalReusable = buildMethodSection('sgReusable', 'surgicalReusableTotal');
  const shangring = buildMethodSection('shangring', 'shangringTotal');
  const hivNegative = buildMethodSection('hivNegative', 'hivNegativeTotal');
  const hivPositive = buildMethodSection('hivPositive', 'hivPositiveTotal');
  const hivUntested = buildMethodSection('hivUntested', 'hivUntestedTotal');
  const followUp = buildMethodSection('fu', 'followUpTotal');
  const linkages = buildLinkageSection();
  const aeSection = buildAESheet();

  const combinedSheetData = [
    ['VMMC DATA COP 24'],
    [],
    ['Consolidate MCs at Static Site'],
    ['Site Name', 'Total MCs', ...ageGroups.map(age => `${age} yrs`)],
    ...totalPerSite,
    siteTotalRow,
    [],
    ['Facility-Level MCs'],
    ['District', 'Facility', 'Facility Type', 'Total MCs'],
    ...modifiedData1,
    facilityTotalRow,
    [],
    ['MC Method -> Surgical Disposable'],
    surgicalDisposable.headers,
    ...surgicalDisposable.rows,
    surgicalDisposable.totalRow,
    [],
    ['MC Method -> Surgical Reusable'],
    surgicalReusable.headers,
    ...surgicalReusable.rows,
    surgicalReusable.totalRow,
    [],
    ['MC Method -> ShangRing'],
    shangring.headers,
    ...shangring.rows,
    shangring.totalRow,
    [],
    ['MCs -> Follow Up'],
    followUp.headers,
    ...followUp.rows,
    followUp.totalRow,
    [],
    ['HTS -> HIV Negative'],
    hivNegative.headers,
    ...hivNegative.rows,
    hivNegative.totalRow,
    [],
    ['HTS -> HIV Positive'],
    hivPositive.headers,
    ...hivPositive.rows,
    hivPositive.totalRow,
    [],
    ['HTS -> HIV Untested'],
    hivUntested.headers,
    ...hivUntested.rows,
    hivUntested.totalRow,
    [],
    ['Linkages & Referrals'],
    linkages.headers,
    ...linkages.rows,
    linkages.totalRow,
    [],
    ['Adverse Events'],
    aeSection.headers,
    ...aeSection.rows
  ];

  const shiftedData = combinedSheetData.map(row => ['', ...row]);

  const ws1 = XLSX.utils.aoa_to_sheet([[]]);

  ws1['!cols'] = [
    { wch: 2 },
    { wch: 36 },
    { wch: 27 },
    { wch: 18 },
    { wch: 18 },
    { wch: 21 },
    { wch: 21 },
    { wch: 10 },
    { wch: 10 },
    { wch: 16 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
  ];

  XLSX.utils.sheet_add_aoa(ws1, shiftedData, { origin: 'A1' });

  const colLetters = 'BCDEFGHIJKLMN'.split('');
  for (let i = 0; i < shiftedData.length; i++) {
    const row = shiftedData[i];

    if (row[1] === 'VMMC DATA COP 24') {
      ws1[`B${i + 1}`].s = titleStyle;
    } else if (row.length === 2 && typeof row[1] === 'string' && row[1] !== '') {
      ws1[`B${i + 1}`].s = sectionHeaderStyle;
    } else if (row[1] === 'Total') {
      colLetters.forEach(col => {
        const cell = ws1[`${col}${i + 1}`];
        if (cell) cell.s = greyBoldStyle;
      });
    } else if (row[1] === 'District' || row[1] === 'Site Name') {
      colLetters.forEach(col => {
        const cell = ws1[`${col}${i + 1}`];
        if (cell) cell.s = boldStyle;
      });
    }
  }

  ws1['!pane'] = {
    xSplit: 3,
    ySplit: 0,
    topLeftCell: 'D1',
    activePane: 'topRight',
    state: 'frozen'
  };

  const ws2 = XLSX.utils.json_to_sheet(data2);

  const wb = XLSX.utils.book_new();
  const sheetName = `${selectedMonth || 'Month'} ${selectedYear || 'Year'}`;
  XLSX.utils.book_append_sheet(wb, ws1, sheetName);
  XLSX.utils.book_append_sheet(wb, ws2, 'MCs Target');

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array', cellStyles: true });
  const today = new Date().toISOString().split('T')[0];
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${staticSite} Programmatic Report ${today}.xlsx`);
};



     
   
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


             <div style ={{background:"lightgrey", padding:"10px", borderRadius:"12px", width:"fit-content", cursor:'pointer', marginLeft:"12px"}}

  onClick={() => {
 

     handleExportClick()
  }}

          
          >Export to Excel <BsFileExcel size ={20} /></div>

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
      <BiBookmark size ={45} color ="darkgreen" style ={{flex:1}}/> <div style ={{marginLeft:"23px", flex:8, fontSize:"18px", fontWeight:"bold", color:"rgb(11, 74, 96)"}}>Linkages to Care</div>
</div> 
<div style ={{marginTop:"12px"}}>
    <TableCare headings={['District','Site','HIV +ve MCs', 'Linkages to Care']} rowElements={care()}/></div>
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