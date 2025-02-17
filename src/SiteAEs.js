import { FaManatSign, FaTriangleExclamation } from "react-icons/fa6"
import { useState} from "react"
import Site from "./components/Site"
import { FaAmbulance } from "react-icons/fa"
import { BiX } from "react-icons/bi"
import TableAEs from "./components/bodyComponents/TableAEs"
import { LuHospital } from "react-icons/lu"
import { IoManOutline } from "react-icons/io5"
import Header from "./components/Header"
export default function SiteAes({aes, district, facility,_staticSite,Details,facilities, selectedMonth, selectedYear, staticSites, username}){
    const ageGroupHeadings = ['VMMC Number', 'Client Age', 'MC Method', 'Date AE Reported', 'AE Classification', 'AE Code', 'Circumcising Cadre', 'AE Management']

    const [showSite, setShowSite] = useState(false)
    return(

        <div>

             {showSite===false?

             <div>
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
                                          setShowSite(true);
                                        }}
                                      >
                                        <BiX size={35} />
                                      </div>

             <div style={{ display: "flex", marginBottom: "1rem" }}>
                                              <div className="topCard" style={{ flex: 12, padding:"12px" }}>
                                                <div style={{ display: "flex", marginTop: "10px" }}>
                                                  <IoManOutline size ={45} color ="rgb(53, 106, 65)"/>
                                                  <div style ={{marginLeft:"1px"}}><FaTriangleExclamation size={30} color="rgb(226, 24, 24)"/></div>
                                                  <div
                                                    style={{
                                                      fontSize: 18,
                                                      color: "rgb(83, 94, 83)",
                                                      fontWeight: "bold",
                                                      marginLeft: "10px",
                                                    }}
                                                  >
                                                    {district} {'>'} {_staticSite} {'>'} {facility} {'>'} Adverse Events
                                                  </div>
                                                </div>
                                              </div>
                                              <div style={{ flex: 5 }}></div>
                                              </div>

                                             <div style ={{margin:25}}>   <TableAEs  headings = {ageGroupHeadings} rowElements={aes}/></div>
                                            </div>:<Site staticSites={staticSites} Details={Details} district={district} selectedMonth={selectedMonth} selectedYear={selectedYear} facilities={facilities} _staticSite={_staticSite} username ={username}/>}


        </div>
    )
}