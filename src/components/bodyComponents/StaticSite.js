import Header from "../Header"
import { useEffect } from "react";
import { useState } from "react";
import Select from "react-dropdown-select";
import { BsCollection } from "react-icons/bs";
import { FaClinicMedical } from "react-icons/fa";
import { GiMedicalPack, GiMedicalThermometer } from "react-icons/gi";
export default function StaticSite ({username, district, staticSite,_selectedYear, _selectedMonth}){
    const [mcs, setMCs] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

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
         
  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData()
    },[])


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
            //   setFacility(facility)
            //   setShowFacility(true);
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
        // if(_selectedMonth ==undefined){
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
    
        // }
        // else {
        //   month = selectedMonth
        // }
    
        return month
      }



      const checkSelectedYear = ()=>{
        let year =0
        // if(_selectedYear ==undefined){
          const today = new Date()
    
         let currentyear = today.getFullYear()
         let currentMonth = localStorage.getItem('currentMonth')
         if(currentMonth =="January"){
          year = currentyear-1
         }
    
         else{
          year =currentyear
         }
    
        // }
        // else {
        //   year = _selectedYear
        // }
    
        return year
      }


      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ].map((month) => ({ value: month, label: month }));
    
      const years = Array.from({ length: 7 }, (_, i) => 2024 + i).map((year) => ({ value: year, label: year }));
     
   
    return (

        <div>

            <Header/>


               {/* Header Section */}    <div style ={{display:"flex"}}>
                                            <div style={{ display: "flex", marginBottom: "1rem", flex:6 }}>
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
                  onChange={(option) =>{ 
                    console.log("month", option[0].value)
                    setSelectedMonth(option[0].value)
                }}
                />
                <Select
                  options={years}
                  defaultValue={years.find((y) => y.value === checkSelectedYear())}
                  placeholder="Select Year"
                  onChange={(option) => {
                    console.log("year", option[0].value)
                    setSelectedYear(option[0].value)}}
                />
              </div>
            </div></div>



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

        </div>
    )
}