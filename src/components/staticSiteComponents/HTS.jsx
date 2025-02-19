import { GiUncertainty } from "react-icons/gi";
import Card1 from "../bodyComponents/Card1";
import CustomChart2 from "../bodyComponents/Chart2";
import { PiPlusCircle } from "react-icons/pi";
import { BiMinusCircle } from "react-icons/bi";

export default function HTS({facilities, totalMCs}){

    const hivPositive =()=>{
        let sum =0
        
            const calculateSum = (mc) => {
                return mc["hivPositive15-19"] + mc["hivPositive20-24"] + mc["hivPositive25-29"] +
                       mc["hivPositive30-34"] + mc["hivPositive35-39"] + mc["hivPositive40-44"] +
                       mc["hivPositive45-49"] + mc["hivPositive50"];
              };
        
        facilities.map((mc)=>{
           
            sum +=calculateSum(mc);
            
        },0)
        return sum
      }

      const hivNegative =()=>{
        let sum =0
        const calculateSum = (mc) => {
            return mc["hivNegative15-19"] + mc["hivNegative20-24"] + mc["hivNegative25-29"] +
                   mc["hivNegative30-34"] + mc["hivNegative35-39"] + mc["hivNegative40-44"] +
                   mc["hivNegative45-49"] + mc["hivNegative50"];
          };
        
        facilities.map((mc)=>{
           
            sum +=calculateSum(mc);
            
        },0)
        return sum
      }

      const hivUntested = totalMCs-(hivNegative()+hivPositive())

    return(
        <div>
             <div style = {{display:"flex"}}> 
            
                          <Card1 value = {hivNegative()} title = {"HIV Negative"} textColor='rgb(11, 74, 96)'
                           icon = {<BiMinusCircle size ={25} color ="rgb(11, 74, 96)"/>} />
            
                          
            
            <Card1 value = {hivPositive()} title = {"HIV Positive"} textColor='rgb(231, 17, 17)'
                          icon = {<PiPlusCircle size ={25} color ="red"/>}
                          />
            
            <Card1 value = {hivUntested} title = {"HIV Untested"} textColor='rgb(11, 74, 96)'
                          icon = {<GiUncertainty size ={25} color ="brown"/>}
            
                          />
            
            
                        </div>
                    
            <CustomChart2
  labels={['HIV Negative', 'HIV Positive', 'HIV Untested']} 
  data={[hivNegative(), hivPositive(), hivUntested]} 
  backgroundColors={['rgb(27, 93, 98)', 'rgb(246, 37, 33)', 'rgb(215, 216, 235)']} 
  borderColors={['rgb(27, 93, 98)', 'rgb(246, 37, 33)', 'rgb(215, 216, 235)']} 
  charttype={"pie"} 
/>
        </div>
    )
}