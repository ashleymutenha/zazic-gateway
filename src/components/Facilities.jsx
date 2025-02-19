import React, { useState } from "react";
import { BiDiamond, BiSolidAlbum, BiSolidCompass, BiX } from "react-icons/bi";
import { BsCollection, BsFillEyeFill, BsSunFill, BsSymmetryVertical } from "react-icons/bs";
import Dashboard from "./Dashboard";
import Site from "./Site";
import StaticSites from "./StaticSites";
import { FaClinicMedical } from "react-icons/fa";
import Header from "./Header";

export default function Facilities({ staticSites,district, facilities, selectedMonth, selectedYear,_staticSite, username }) {
  // const [showDashboard, setShowDashboard] = useState(false);
  const [showFacility, setShowFacility] = useState(false);
  const [selectedFacility, setFacility] = useState({})

  const [showStaticSites, setStatic] = useState(false)
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




  // Reusable facility card component
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
            <BiX size={35} />
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
          <div style={{ display: "flex", marginTop: "20px" }}>
            <div className="_topCard" style={{ flex: 1 }}>
              <div style={{ padding: "12px", borderBottom: "1px solid lightgrey" }}>
                <BsSunFill size={30} color="goldenrod" />
              </div>
              <div style={{ fontWeight: "bold", fontSize: 18, color: "rgb(11, 129, 54)", marginTop: "5px" }}>
                Total MCs
              </div>
              <div style={{ fontSize: 23, color: "black" }}>{totalMCs()}</div>
            </div>

            <div className="_topCard" style={{ flex: 1 }}>
              <div style={{ padding: "12px", borderBottom: "1px solid lightgrey" }}>
                <BiSolidAlbum size={30} color="goldenrod" />
              </div>
              <div style={{ fontWeight: "bold", fontSize: 18, color: "rgb(11, 129, 54)" }}>
                Total Facilities that have Reported
              </div>
              <div style={{ fontSize: 23, color: "black" }}>{facilities.length}</div>
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
              <FacilityCard key={facility.facility} facility={facility} />
            ))}
          </div>
        </div></div>
      ) : showStaticSites === true && showFacility === false ? (
         <StaticSites facilities={facilities} 
               staticSites={staticSites} selectedMonth={selectedMonth} selectedYear={selectedYear} selectedDistrict={district} username ={username}/>

      ) : showFacility === true && showStaticSites === false ? (
        <Site staticSites={staticSites} Details={selectedFacility} district={district} selectedMonth={selectedMonth} selectedYear={selectedYear} facilities={facilities} _staticSite={_staticSite} username ={username}/>
      ) : null}
    </div>
  );
}
