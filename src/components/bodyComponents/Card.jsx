

export default function Card({icon,value,value2,title ,decoratorColor,
   decoratorTextColor, showDetailsBtn,showsecondValue, callBackFunction, titleIcon, title2}){
 
    return(

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
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                              }}
                                            >
                                              <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                                                {icon}
                                                <div style={{ fontSize: 23, color: "rgb(83, 94, 83)", marginLeft: "10px" }}>
                                                 {title}
                                                </div>

                                              </div>
                                              
                                              <div style ={{display:"flex", marginTop:"8px"}}>
                                               <div
                                                      style={{
                                                        padding: "8px",
                                                        background: decoratorColor,
                                                        borderRadius: "12px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "8px",
                                                        cursor:'pointer'
                                                      }}
                                                     
                                                    >
                                                      <div style ={{display:"flex"}}>
                                                      <div style ={{flex:2}}><span style={{ fontSize: "20px", fontWeight: "500", color:decoratorTextColor }}>{value}</span></div>
                                                      <div style ={{flex:2}}><div style={{ fontSize: "20px", fontWeight: "400", color:"grey", marginLeft:"5px" }}>{value2}</div></div>
                                                      </div>
                                                    </div>

                                                    {showDetailsBtn==true?<div
                                                      style={{
                                                        padding: "8px",
                                                        background: 'rgb(42, 91, 116)',
                                                        borderRadius: "12px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "8px",
                                                        cursor:'pointer',
                                                        marginLeft:"18px",
                                                        color:"#ffff"
                                                      }}
                                                 
                                                    >
                                                      <button onClick={callBackFunction} style={{ fontSize: "15px", fontWeight: "500",background: 'rgb(42, 91, 116)',color:"#ffff", border:'0px' }}>Show Details</button>
                                                      
                                                    </div>:null}
                                                   </div>
                                             
                                            </div>
    )
}