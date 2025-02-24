import { styled } from '@mui/material/styles';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { BiCut, BiFolder, BiRecycle, BiSolidAmbulance, BiSun, BiTrash, BiX } from 'react-icons/bi';
import TableComponent from '../bodyComponents/Table';
import SectionHeader from '../bodyComponents/SectionHeader';
import {GiHealthNormal, GiMedicalPack, GiRibbon, GiUncertainty } from 'react-icons/gi';
import Card from '../bodyComponents/Card';
import { FiAlertTriangle } from 'react-icons/fi';
import { TiTick } from 'react-icons/ti';

import Card1 from '../bodyComponents/Card1';
import { TbRibbonHealth } from 'react-icons/tb';
import { FaHandshakeSimple, FaKitMedical } from 'react-icons/fa6';
import Header from '../Header';
import StaticSite from '../bodyComponents/StaticSite';
import { useEffect } from 'react';

export default function Facility({district ,Details,_staticSite, username, _selectedMonth, _selectedYear }){


    useEffect(()=>{
        console.log("details",Details)
    })


    const [showStaticSite, setStaticSite] = useState(false)

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: 'rgb(8, 75, 62)',
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      const ageGroupHeadings = ['15-19 yrs', '20-24 yrs', '25-29 yrs', '30-34 yrs', '35-39 yrs', '40-44 yrs', '45-49 yrs', '50+ yrs']
      const ageGroupsMCs = [Details['mc15-19'], Details['mc20-24'], 
      Details['mc25-29'], Details['mc30-34'], Details['mc35-39'], Details['mc40-44'], Details['mc45-49'], Details['mc50']]

      const sgDisposable = [Details['sgDisposable15-19'], Details['sgDisposable20-24'], 
      Details['sgDisposable25-29'], Details['sgDisposable30-34'], Details['sgDisposable35-39'], Details['sgDisposable40-44'], Details['sgDisposable45-49'], Details['sgDisposable50']]
     
      
      const sgReusable = [Details['sgReusable15-19'], Details['sgReusable20-24'], 
      Details['sgReusable25-29'], Details['sgReusable30-34'], Details['sgReusable35-39'], Details['sgReusable40-44'], Details['sgReusable45-49'], Details['sgReusable50']]

      const shangring = [Details['shangring15-19'], Details['shangring20-24'], 
      Details['shangring25-29'], Details['shangring30-34'], Details['shangring35-39'], Details['shangring40-44'], Details['shangring45-49'], Details['shangring50']]

      const hivPositive = [Details['hivPositive15-19'], Details['hivPositive20-24'], 
      Details['hivPositive25-29'], Details['hivPositive30-34'], Details['hivPositive35-39'], Details['hivPositive40-44'], Details['hivPositive45-49'], Details['hivPositive50']]

      const hivNegative = [Details['hivNegative15-19'], Details['hivNegative20-24'], 
      Details['hivNegative25-29'], Details['hivNegative30-34'], Details['hivNegative35-39'], Details['hivNegative40-44'], Details['hivNegative45-49'], Details['hivNegative50']]
      
      const hivTested = ()=>{
        const hivStats = hivNegative.concat(hivPositive)
        let sum =0
        for(var e of hivStats){
          sum+=e
        }
        return sum
      }

      const hivUntested =()=>{
        return Details['totalMCs']- hivTested()
      }

      function showAEs(){
        setAEs(true)
      }


      const determineIfAEsPresent =()=>{

        let returnedValue =false

        if(Details['matchingAES'].length !=0){
          returnedValue =true
        }
        return returnedValue
      }



       return(
         <div>
             {showStaticSite==false?(<div >
              <Header/>
            <div
                        style={{
                          background: "beige",
                          width: "fit-content",
                          padding:12,
                          margin:12,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setStaticSite(true);
                        }}
                      >
                        <BiX size={35} />
                      </div>


                      {/* Header Section */}
                                <div style={{ display: "flex", marginBottom: "1rem" }}>
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
                                        {district} {'>'} {_staticSite} {'>'} {Details.facilityName}
                                      </div>
                                    </div>
                                  </div>
                                  <div style={{ flex: 7 }}></div>
                                </div>
                                <div style = {{display:"flex"}}>
                                  <Card icon={<BiSun size={45} color="rgb(51, 103, 96)" />} 
                                  title ="Total MCs" value ={Details['totalMCs']}  decoratorColor={"beige"} decoratorTextColor={"black"}/>

                                  <Card icon={<FiAlertTriangle size={45} color="rgb(237, 15, 41)" />} 
                                  title ="Adverse Events" value ={Details['matchingAES'].length}  
                                  decoratorColor={"beige"} decoratorTextColor={"black"} showDetailsBtn={determineIfAEsPresent()} callBackFunction={showAEs}/>

                                </div>

           <div style ={{display:"flex",padding:'2rem'}}>
             <div style ={{flex:6, borderRight:'1px solid lightgrey', paddingRight:"12px", borderTop:'1px solid lightgrey', borderLeft:'1px solid lightgrey', paddingLeft:'12px'}}>
             <SectionHeader heading ="Recorded MCs" color ="#e5e4e2" textColor ="rgb(6, 116, 100)" icon  ={<BiFolder size={30} color="rgb(46, 93, 52)" />}/>

           <TableComponent rowElements={ageGroupsMCs} headings = {ageGroupHeadings}/>


           <SectionHeader heading ="MCs By Surgical Disposable Method" color ="rgb(240, 241, 244)" textColor ="black"
            icon  ={<BiCut size={30} color="rgb(51, 103, 96)" />} icon2  ={<BiTrash size={30} color="rgb(224, 49, 10)" />}/>

           <TableComponent rowElements={sgDisposable} headings = {ageGroupHeadings}/>

           <SectionHeader heading ="MCs By Surgical Reusable Method"  color ="rgb(240, 241, 244)" textColor ="black"
            icon  ={<BiCut size={30} color="rgb(51, 103, 96)" />} icon2  ={<BiRecycle size={30} color="rgb(40, 18, 180)" />}/>
            <TableComponent rowElements={sgReusable} headings = {ageGroupHeadings}/>

            <SectionHeader heading ="MCs By Device  Method"  color ="rgb(240, 241, 244)" textColor ="black"
            icon  ={<BiCut size={30} color="rgb(51, 103, 96)" />} icon2  ={<BiRecycle size={30} color="rgb(40, 18, 180)" />}/>

                     <TableComponent rowElements={shangring} headings = {ageGroupHeadings}/>

                     </div>



                     <div style ={{flex:10, borderRight:'1px solid lightgrey', padding:12, borderTop:'1px solid lightgrey'}}>
                     <SectionHeader heading ="HIV Testing Analysis By Age Disaggregations" color ="#e5e4e2" textColor ="rgb(6, 116, 100)" icon  ={<BiFolder size={30} color="rgb(46, 93, 52)" />}/>



           <SectionHeader heading ="HIV Negative" color ="rgb(240, 241, 244)" textColor ="black"
            icon  ={<GiRibbon size={30} color="rgb(51, 103, 96)" />} icon2  ={<BiSolidAmbulance size={30} color="rgb(39, 11, 218)" />}/>

           <TableComponent rowElements={hivNegative} headings = {ageGroupHeadings}/>

           <SectionHeader heading ="HIV Positive"  color ="rgb(240, 241, 244)" textColor ="black"
            icon  ={<GiRibbon size={30} color="rgb(227, 15, 46)" />} icon2  ={<BiSolidAmbulance size={30} color="rgb(39, 11, 218)" />}/>
            <TableComponent rowElements={hivPositive} headings = {ageGroupHeadings}/>


              <div style ={{display:"flex"}}>
               <div className="topCard" style={{ height:'fit-content', width:'fit-content'}}>
                                <div style={{marginTop: "10px" }}>
                                 <div style ={{display:"flex",fontSize: "20px",fontWeight: "bold",color:'rgb(23, 141, 125)'}}> <TiTick size={45} color="rgb(23, 141, 125)" /> <div>HIV Tested</div></div>
                                   
                                  <div
                                    style={{
                                      fontSize: "23px",
                                      color: "rgb(37, 71, 107)",
                                      fontWeight: "bold",
                                      marginLeft: "10px",
                                      fontWeight:"bold"
                                    }}
                                  >
                                   {hivTested()}
                                  </div>
                                </div>
                              </div>


                              <div className="topCard" style={{ height:'fit-content', width:'fit-content', background:"beige"}}>
                                <div style={{marginTop: "10px" }}>
                                 <div style ={{display:"flex",fontSize: "20px",fontWeight: "bold",color:'rgb(23, 25, 25)'}}> <GiUncertainty size={40} color="rgb(105, 63, 30)" /> <div style ={{marginLeft:"3px"}}>HIV Untested</div></div>
                                   
                                  <div
                                    style={{
                                      fontSize: "23px",
                                      color: "rgb(37, 71, 107)",
                                      fontWeight: "bold",
                                      marginLeft: "10px",
                                      fontWeight:"bold"
                                    }}
                                  >
                                   {hivUntested()}
                                  </div>
                                </div>
                              </div>
                              
                              </div>

                              <SectionHeader heading ="Linkages /referrals to other services"  color ="rgb(240, 241, 244)" textColor ="black"
             icon2  ={<FaHandshakeSimple size={30} color="rgb(12, 135, 139)" />}/>

                              <div style ={{display:"flex"}}>

                           
        
                              <Card1 value = {Details['total_hiv_negative_linked_to_prep']}  title = {"Total HIV -ve Client Linked to PreP"} textColor='rgb(16, 143, 63)'
                                               icon = {<GiMedicalPack size ={25} color ="green" />}  style ={{flex:3}}/>

<Card1 value = {Details['total_hiv_positive_linked_to_care']}  title = {"Total HIV +ve Client Linked to ART"} textColor='rgb(228, 17, 34)'
                                               icon = {<TbRibbonHealth size ={25} color ="red" />}  style ={{flex:3}}/>


                                               </div>



<div style ={{display:"flex"}}>

<Card1 value = {Details['total_hiv_negative_linked_to_prep']}  title = {"Total MCs referred for STI Services"} textColor='rgb(49, 87, 63)'
                 icon = {<FaKitMedical size ={25} color ="rgb(49, 87, 63)" />}  style ={{flex:3}}/>

<Card1 value = {Details['total_hiv_positive_linked_to_care']}  title = {"Total MCs referred for SRH Services"} textColor='rgb(49, 87, 63)'
                 icon = {<GiHealthNormal size ={25} color ="rgb(49, 87, 63)" />}  style ={{flex:3}}/>


                 </div>

                              

          

                     </div>
           </div>
          </div>):<StaticSite username ={username} district={district} 
          staticSite={_staticSite} _selectedMonth={_selectedMonth}  _selectedYear={_selectedYear}/>
          }
          </div>
        );
      }

  
