export default function SectionHeader({heading, icon, icon2,color, textColor}){

    return(

        <div style={{ display: "flex", marginBottom: "0 rem", marginTop:'1rem' }}>
                                  <div className="topCard" style={{ flex: 8 ,backgroundColor:color, padding:'5px'}}>
                                    <div style={{ display: "flex", marginTop: "10px" }}>
                                      <div style = {{display:'flex'}}><div style ={{flex:3}}>{icon}</div>  <div style ={{flex:3}}>{icon2}</div></div>
                                      <div
                                        style={{
                                          fontSize: 19,
                                          color: textColor,
                                          fontWeight: "bold",
                                          marginLeft: "10px",
                                        }}
                                      >
                                       {heading}
                                      </div>
                                    </div>
                                  </div>
                                  <div style={{ flex: 4 }}></div>
                                </div>
    )
}