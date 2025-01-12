export default function Card1({icon,value,title,icon2,textColor}){

    return(

         <div className="_topCard" style={{ flex: 1 }}>
                      <div style={{ padding: '12px', borderBottom: '1px solid lightgrey' ,display:"flex"}}>
                        <div>{icon}</div> <div style ={{marginLeft:8}}>{icon2}</div>
                      </div>
                      <div style={{ fontWeight: 'bold', fontSize: 18, color: textColor, marginTop: '5px' }}>{title}</div>
                      <div style={{ fontSize: 23, color: 'black' }}>{value}</div>
                    </div>
    )
}