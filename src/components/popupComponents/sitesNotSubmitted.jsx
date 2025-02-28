import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Card1 from '../bodyComponents/Card1';
import { FiMapPin } from 'react-icons/fi';
import { BiCopy, BiMapPin } from 'react-icons/bi';
import Card from '../bodyComponents/Card';
import { CgClose } from 'react-icons/cg';

export default function SitesNotSubmitted({sites, sitesTotal}){

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width:"60%",
          height:'50%'
        },
      };
     console.log("sites",sites)

      let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const DistrictsList = ({ sites }) => {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {sites.map((district, index) => (
          <div key={index} style={{ flex: "1 1 calc(33.33% - 10px)", boxSizing: "border-box" }}>
            <Card icon={<BiMapPin  size ={27} color ={"purple"}/>} title={district.facilityName}/>
          </div>))}
          </div>)}
        

  return (
    <div>
        <div onClick={openModal} style ={{margin:8, padding:"12px",background:"rgb(13, 116, 150)", color:'#ffff', borderRadius:'12px', cursor:'pointer'}}>
             View Site(s) that have not yet submitted
        </div>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
    
      >
        <button style ={{background:"rgb(11, 94, 105)", border:"0px", height:"60", width:"60", padding:"12px"}}><CgClose style ={{color:"#ffff"}}  size ={30} onClick={closeModal}/></button>
        
        <div style ={{display:"flex"}}>
        <div >
        <h2 style ={{color:"rgb(17, 121, 131)"}}>Sites Not Yet Submitted</h2>
        </div>
        </div>
        <DistrictsList sites={sites}/>
        {/* <div style ={{display:'flex'}}>
      {districts.map((district)=>
      <Card icon ={<BiMapPin/>} title ={district.district}/>)}

      </div> */}
   
      </Modal>
    </div>
  );

}