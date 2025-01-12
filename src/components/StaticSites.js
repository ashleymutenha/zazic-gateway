import { FaLocationPin } from "react-icons/fa6";
import { GiCalculator, GiHospital, GiMedicalThermometer } from "react-icons/gi";
import { RiHospitalFill } from "react-icons/ri";
import { useState } from "react";
import Facilities from "./Facilities";
import { BiSolidAlbum, BiX } from "react-icons/bi";
import Dashboard from "./Dashboard";
import { BsCalculator, BsCollection, BsSunFill } from "react-icons/bs";
import Card from "./bodyComponents/Card";
import { FiAlertTriangle } from "react-icons/fi";
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdNumbers } from "react-icons/md";
import { FaCalculator, FaHospitalAlt } from "react-icons/fa";

export default function StaticSites({staticSites, facilities, selectedMonth, selectedYear, selectedDistrict}){
  const[selectedSite, setSite] = useState("")
  const [showFacilities, setShowFacilities] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  

  console.log("staticsites", staticSites)

    const filterFacilities = ()=>{
        let _facilities =[]
        facilities.map((facility)=>{
          if(facility['Site_Name']===selectedSite){
            _facilities.push(facility)
        }})
      return _facilities
    }


    const getStaticSiteTotalMCs =(staticSite)=>{
      let sum =0
      for (var facility of facilities){
        if(facility['Site_Name']==staticSite){
          sum+=facility['totalMCs']
        }
      }
      return sum

    }

    const totalMCs = () => {
      let sum = 0;
      for (var facility of facilities) {
        sum += facility["totalMCs"];
      }
      return sum;
    };

    const aes =()=>{
      let totalAEs = 0

      for(var facility of facilities){
        totalAEs+=facility['matchingAES'].length
      }
     return totalAEs
    }

    
    return(
    <div>
    {showFacilities===false && showDashboard==false ?(<div>

       <div
                  style={{
                    padding: "12px",
                    background: "beige",
                    width: "fit-content",
                    margin: "30px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setShowDashboard(true);
                  }}
                >
                  <BiX size={35} />
                </div>

                  <div style={{ display: "flex", marginTop: "20px" }}>
                            <div className="_topCard" style={{ flex: 1 }}>
                              <div style={{ padding: "12px", borderBottom: "1px solid lightgrey" }}>
                                <BsSunFill size={30} color="rgb(39, 126, 157)" />
                              </div>
                              <div style={{ fontWeight: "bold", fontSize: 18, color: "rgb(11, 129, 54)", marginTop: "5px" }}>
                                Total MCs
                              </div>
                              <div style={{ fontSize: "23px", color: "rgb(39, 126, 157)", fontWeight:"bold"}}>{totalMCs()}</div>
                            </div>

                            <div className="_topCard" style={{ flex: 1 }}>
                              <div style={{ padding: "12px", borderBottom: "1px solid lightgrey" }}>
                              <FiAlertTriangle size ={30} color ="red"/>
                              </div>
                              <div style={{ fontWeight: "bold", fontSize: 18, color: "rgb(20, 126, 36)", marginTop: "5px" }}>
                                Adverse Events
                              </div>
                              <div style={{ fontSize: "23px", color: "rgb(39, 126, 157)", fontWeight:"bold"}}>{aes()}</div>
                            </div>

                
                            <div className="_topCard" style={{ flex: 1 }}>
                              <div style={{ padding: "12px", borderBottom: "1px solid lightgrey" }}>
                                <FaHospitalAlt size={30} color="rgb(39, 126, 157)" />
                              </div>
                              <div style={{ fontWeight: "bold", fontSize: 18, color: "rgb(11, 129, 54)" }}>
                                Total Static Sites that have reported
                              </div>
                              <div style={{ fontSize: "23px", color: "rgb(39, 126, 157)", fontWeight:"bold"}}>{StaticSites.length}</div>
                            </div>
                          </div>

      {/* Header Section */}
                <div style={{ display: "flex", marginBottom: "1rem" }}>
                  <div className="topCard" style={{ flex: 5 }}>
                    <div style={{ display: "flex", marginTop: "10px" }}>
                      <RiHospitalFill size={45} color="rgb(51, 103, 96)" />
                      <div
                        style={{
                          fontSize: 23,
                          color: "rgb(83, 94, 83)",
                          fontWeight: "bold",
                          marginLeft: "10px",
                        }}
                      >
                       {selectedDistrict} {'>'} Static Sites
                      </div>
                    </div>
                  </div>
                  <div style={{ flex: 7 }}></div>
                </div> 
<div style ={{display:"flex"}}>
     {staticSites.map((site)=>(

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

}}
>
  <div style ={{  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",}}>
<div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
  <RiHospitalFill size ={50} color ="brown"/>
  <div style={{ fontSize: 23, color: "rgb(83, 94, 83)", marginLeft: "10px" }}>
    {site}
  </div>
</div>

 <div
        style={{
          padding: "8px",
          background: "beige",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor:'pointer'
        }}

        onClick={()=>{

            setSite(site)
            setShowFacilities(true)
        }}
       
      >
        <span style={{ fontSize: "15px", fontWeight: "500", color:"black" }}>View Facilites</span>
        
      </div></div>


      <div style ={{background:'rgb(239, 237, 237)', padding:'10px', width:'fit-content', marginTop:"3px", borderRadius:"12px"}}>
                        <FaCalculator style ={{marginRight:"3px"}} color ="rgb(56, 141, 117)"/>
                        <span style ={{color:"rgb(39, 126, 157)", fontSize:"23px", fontWeight:"bold"}}>{getStaticSiteTotalMCs(site)}</span>
                      </div>

</div>


        


     ))}
        </div>
    </div>):
        showFacilities===true && showDashboard===false ?(<Facilities
          district={selectedDistrict}
          facilities={filterFacilities()}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          staticSites={staticSites}
          _staticSite ={selectedSite}
/>):showFacilities===false && showDashboard===true ?(<Dashboard _selectedMonth={selectedMonth} _selectedYear={selectedYear} />):null}
</div>)
}
