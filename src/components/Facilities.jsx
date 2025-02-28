import React, { useState } from "react";
import { BiArrowBack, BiBookmark, BiDiamond, BiInjection, BiMale, BiMinusCircle, BiSolidAlbum, BiSolidCompass, BiTrash, BiX } from "react-icons/bi";
import { BsBack, BsBackspace, BsCollection, BsFillEyeFill, BsHospital, BsSunFill, BsSymmetryVertical } from "react-icons/bs";
import Dashboard from "./Dashboard";
import Site from "./Site";
import StaticSites from "./StaticSites";
import { FaClinicMedical, FaCut } from "react-icons/fa";
import Header from "./Header";
import { SlUserFollowing } from "react-icons/sl";
import Card from "./bodyComponents/Card";
import { FaHandshake, FaHospitalUser, FaRecycle, FaRing } from "react-icons/fa6";
import CustomChart2 from "./bodyComponents/Chart2";
import { GiMedicalDrip, GiUncertainty } from "react-icons/gi";
import Card1 from "./bodyComponents/Card1";
import { PiPlusCircle, PiStrategyThin } from "react-icons/pi";
import { TbRibbonHealth } from "react-icons/tb";
import { FiAlertTriangle } from "react-icons/fi";
import { GrTools } from "react-icons/gr";
import CustomChart from "./bodyComponents/Chart";
import { MdMedicationLiquid } from "react-icons/md";
import TablePreP from "./bodyComponents/TablePreP";
import TableCare from "./bodyComponents/TableCare";
import TableOther from "./bodyComponents/TableOther";
import TableSTI from "./bodyComponents/TableSTI";
import TableSRH from "./bodyComponents/TableSRH";
import TableAEs from "./bodyComponents/TableAEs";

export default function Facilities({ staticSites,district, facilities, selectedMonth, selectedYear,_staticSite, username, districtSites }) {
  // const [showDashboard, setShowDashboard] = useState(false);
  const [showFacility, setShowFacility] = useState(false);
  const [selectedFacility, setFacility] = useState({})

  const [shownSection , setShownSection] = useState('mcMethod')


  const [showStaticSites, setStatic] = useState(false)

  const ageGroupHeadings = ['District','Site','VMMC Number', 'Client Age', 'MC Method', 'Date AE Reported', 'AE Classification', 'AE Code', 'Circumcising Cadre', 'AE Management']


  const [linkagesShownSection , setLinkageSection] = useState('prep')

  // Filter facilities by the selected period
  const filterByPeriod = () => {
    return facilities
      .filter(
        (facility) =>
          String(facility.recordingMonth).toLowerCase() === String(selectedMonth).toLowerCase() &&
          String(facility.year).toLowerCase() === String(selectedYear).toLowerCase()
      )
     
  };
  
  const checkOccurence =(element,array)=>{
    let count =0
    for(var i of array){
      if(i.facilityName == element.facilityName){
        count+=1
      }
    }
    return count
  }

  const allSites =()=>{
    let sites =[]
    for(var site of filterByPeriod()){
      if(checkOccurence(site,sites)==0){
        sites.push(site)
      }
    }
    return sites
  }


  console.log("facilities",filterByPeriod())

 

 

  const totalMCs = () => {
    let sum = 0;
    for (var facility of facilities) {
      sum += facility["totalMCs"];
    }
    return sum;
  };


  const getFacilityTotalMCs =(facilityName)=>{
    let sum =0
    for (var facility of facilities){
      if(facility['facilityName']==facilityName){
        sum+=facility['totalMCs']
      }
    }
    return sum

  }


  const aes = () => {
    let totalAEs = 0
   facilities.map((site)=>{
    
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
    
    facilities.map((mc)=>{
       
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
    
  facilities.map((mc)=>{
       
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
    
    facilities.map((mc)=>{
       
        sum +=calculateSum(mc);
        
    },0)
    return sum
  }

  const getTotalMCs = () => {
    let sum =0
    
       for(var mc of facilities){
      if(mc['year']==selectedYear && mc['recordingMonth']==selectedMonth){
        sum+=mc['totalMCs']
      }
    
    }
    return sum;
  };


  const getTotalFollowUp =()=>{
    let total =0
    for(var mc of facilities){
      
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

  const hivPositive =()=>{

    let sum =0
    for(var mc of facilities){
     
      if(mc['recordingMonth']==selectedMonth && mc['year']==selectedYear){

        let _sum = mc["hivPositive15-19"]+mc["hivPositive20-24"]+mc["hivPositive25-29"]+mc["hivPositive30-34"]+
        mc["hivPositive35-39"]+mc["hivPositive40-44"]+mc["hivPositive45-49"]+mc["hivPositive50"]
      sum+=_sum
      }
  }
    return sum
  }

  const hivNegative =()=>{

    let sum =0
    for(var mc of facilities){
   
      if(mc['recordingMonth']==selectedMonth && mc['year']==selectedYear){

        let _sum = mc["hivNegative15-19"]+mc["hivNegative20-24"]+mc["hivNegative25-29"]+mc["hivNegative30-34"]+
        mc["hivNegative35-39"]+mc["hivNegative40-44"]+mc["hivNegative45-49"]+mc["hivNegative50"]
      sum+=_sum
      }
  }
    return sum
  }


  const hivUntested = ()=>{
    return getTotalMCs()-(hivNegative()+hivPositive())
  }


  // Reusable facility card component
  const FacilityCard = ({ facility }) => (
    <div
      className="__topCard"
      style={{
        flex: "1 1 300px",
        maxWidth: "300px",
        marginLeft: "1rem",
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
          setShowFacility(true);
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


  const prep =()=>{
    let array =[]

    for(let mc of facilities){
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

  for(let mc of facilities){
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
for(let mc of facilities){

  mc.otherReferrals.map((referral)=>{
    array.push(referral)
  })
}
return array
}


const stiServices =()=>{
let array =[]
for(let mc of facilities){
  
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
for(let mc of facilities){
  
  let object ={
    "district":mc['District'],
    "site":mc['facilityName'],
    "stiReferrals":mc['total_mcs_referred_for_srh_services']
  }
  array.push(object)  
}
return array
}


        const hivPositiveByFacility =(facility)=>{
          let sum =0
          
              const calculateSum = (mc) => {
                  return mc["hivPositive15-19"] + mc["hivPositive20-24"] + mc["hivPositive25-29"] +
                        mc["hivPositive30-34"] + mc["hivPositive35-39"] + mc["hivPositive40-44"] +
                        mc["hivPositive45-49"] + mc["hivPositive50"];
                };
          
        facilities.map((mc)=>{
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
          
        facilities.map((mc)=>{
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
          
          facilities.map((mc)=>{
            if(mc['facilityName']==facility){
              sum +=calculateSum(mc);
            }
          },0)
          return sum
        }

        const _aes =()=>{
          let aes =[]
          for(let mc of facilities ){
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

  return (
    <div>
      {showStaticSites === false && showFacility === false ? (
        <div>
          <Header/>
        <div>
          {/* Toggle Dashboard Button */}
          <div
            style={{
              padding: "12px",
              background: "beige",
              width: "fit-content",
              margin: "12px",
              cursor: "pointer",
            }}
            onClick={() => {
              setStatic(true);
            }}
          >
            <BiArrowBack size={35} />
          </div>


           {/* Header Section */}
           <div style={{ display: "flex", marginBottom: "1rem" }}>
            <div className="topCard" style={{ flex: 9 }}>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <BiSolidCompass size={45} color="rgb(51, 103, 96)" />
                <div
                  style={{
                    fontSize: 18,
                    color: "rgb(83, 94, 83)",
                    fontWeight: "bold",
                    marginLeft: "10px",
                  }}
                >
                  {district} DISTRICT {'>'} {_staticSite} {'>'} Facilities
                </div>
              </div>
            </div>
            <div style={{ flex: 7 }}></div>
          </div>

          {/* Total MCs and Total Facilities Reporting */}
          <div style ={{display:"flex", borderTop:"1px solid lightgrey", padding :"0px"}}>
            <div style={{flex:6, padding:"4px", borderRight:"1px solid lightgrey"}}>
          <div style={{ display: "flex", marginTop: "20px" }}>
            <div className="_topCard" style={{ flex: 1 }}>
              <div style={{ padding: "12px", borderBottom: "1px solid lightgrey" }}>
                <BsSunFill size={30} color="rgb(22, 103, 109)" />
              </div>
              <div style={{ fontWeight: "bold", fontSize: 18, color: "rgb(11, 129, 54)", marginTop: "5px" }}>
                Total MCs
              </div>
              <div style={{ fontSize: 23, color: "black" }}>{totalMCs()}</div>
            </div>

            <div className="_topCard" style={{ flex: 1 }}>
              <div style={{ padding: "12px", borderBottom: "1px solid lightgrey" }}>
                <BsBack size={30} color="rgb(64, 86, 79)" />
              </div>
              <div style={{ fontWeight: "bold", fontSize: 18, color: "rgb(11, 129, 54)" }}>
                Facility Reporting Rate
              </div>
              <div style={{ fontSize: 23, color: "black" }}>{facilities.length}</div>
            </div>

            <div className="_topCard" style={{ flex: 1 }}>
              <div style={{ padding: "12px", borderBottom: "1px solid lightgrey" }}>
                <FiAlertTriangle size={30} color="red" />
              </div>
              <div style={{ fontWeight: "bold", fontSize: 18, color: "rgb(11, 129, 54)" }}>
                AE(S)
              </div>
              <div style={{ fontSize: 23, color: "black" }}>{aes()}</div>
            </div>
          </div>

          <div style={{ margin: '6px', display: 'flex', alignItems: 'center',background:"#ececec", width:'fit-content', paddingRight:"4px" }}>
                      <BsHospital size={30} color="#FFFF" style={{ marginRight: '10px', background: 'rgb(8, 75, 62)', padding: '14px' }} />
                      <div style={{ fontSize: 34,display:"flex"  }}> <div>Facilities</div>
                    
                      </div>
                    </div>



         

          {/* Facility Cards Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {allSites().map((facility) => (
              <FacilityCard key={facility.facility} facility={facility}  style ={{flex:6}}/>
            ))}
          </div></div>

          <div style ={{flex:6}}>

          <div style ={{display:'flex', margin:5}}>
          
          <div style ={{padding:10, background:"rgb(12, 80, 36)", color:"#ffff", width:'fit-content', cursor:'pointer'}}
          onClick={()=>{
            setShownSection('mcMethod')
          }}
          >MC Method <GrTools size ={23}/></div>
          <div style ={{padding:10, background:"rgb(35, 53, 41)", color:"#ffff", width:'fit-content', cursor:'pointer'}}

          onClick={()=>{
            setShownSection('HTS')
          }}
          
          >HTS <TbRibbonHealth size ={23}/></div>

          <div style ={{background:"rgb(54, 75, 64)", padding:'12px', color:'#ffff'}}
                                            
                                            onClick={()=>{
                                              setShownSection('linkages')
                                            }}
                                                  
                                                  >Linkages & Referrals <FaHandshake size ={20}/></div>

          <div style ={{padding:10, background:"rgb(12, 97, 110)", color:"#ffff", width:'fit-content', cursor:'pointer'}}

            onClick={()=>{
              setShownSection('aes')
            }}
          
          >AE(s) <FiAlertTriangle size ={23}/></div>


         </div>
<div style ={{padding:"12px"}}>

{shownSection =='mcMethod' && shownSection!='HTS' && shownSection!='aes'?<div style = {{padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px"}}>
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


          <CustomChart
labels={['Surgical Disposable', 'Surgical Re-usable', 'Shangring']} 
data={[surgicalDisposable(), surgicalReusable(), shangring()]} 
backgroundColors={['rgb(26, 86, 54)', 'rgb(42, 120, 127)', 'rgb(207, 209, 226)']} 
borderColors={['rgb(26, 86, 54)', 'rgb(42, 120, 127)', 'rgb(207, 209, 226)']} 
charttype={"bar"} 
/>


        </div>:null}

        {shownSection =='HTS' && shownSection!='mcMethod' && shownSection!= 'aes'?<div style = {{padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px", marginTop:'2rem'}}>
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

                    <CustomChart2
labels={['HIV Negative', 'HIV Positive', 'HIV Untested']} 
data={[hivNegative(), hivPositive(), hivUntested()]} 
backgroundColors={['rgb(27, 93, 98)', 'rgb(246, 37, 33)', 'rgb(215, 216, 235)']} 
borderColors={['rgb(27, 93, 98)', 'rgb(246, 37, 33)', 'rgb(215, 216, 235)']} 
charttype={"pie"} 
/>
        
        
                  </div>:null}


                      {shownSection ==='aes'&&shownSection!=='HTS' && shownSection!=='mcMethod' && shownSection!='linkages'?
                                                
                                                <div style = {{padding:"8px", background:"rgb(240, 241, 244)", borderRadius:"12px", marginTop:'2rem'}}>
                                                <div style ={{padding:6, background:"white", borderRadius:"12px", display:"flex"}}>
                                                    <BiMale size ={45} color ="green" style ={{flex:1}}/>  <FiAlertTriangle size ={45} color ="red" style ={{flex:1}}/> <div style ={{marginLeft:"23px", flex:8, fontSize:"18px", fontWeight:"bold", color:"rgb(11, 74, 96)"}}>Adverse Events</div>
                                                </div>    
                                                        <div style ={{marginTop:"10px"}}>
                                                          <TableAEs rowElements ={_aes()} headings={ageGroupHeadings} />
                                                          </div>
                                                          </div>:null}




                  {shownSection ==='linkages'&&shownSection!=='HTS' && shownSection!=='mcMethod' && shownSection!=='aes'?<div>
                                                                    
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
                                                                          
                                                                          </div>:null}


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


          </div>
          
          </div>
        </div></div>
      ) : showStaticSites === true && showFacility === false ? (
         <StaticSites  facilities ={districtSites}
               districtSites ={districtSites}
               staticSites={staticSites} selectedMonth={selectedMonth} selectedYear={selectedYear} selectedDistrict={district} username ={username}/>

      ) : showFacility === true && showStaticSites === false ? (
        <Site districtSites={districtSites} staticSites={staticSites} Details={selectedFacility} district={district} selectedMonth={selectedMonth} selectedYear={selectedYear} facilities={facilities} _staticSite={_staticSite} username ={username}/>
      ) : null}
    </div>
  );
}
