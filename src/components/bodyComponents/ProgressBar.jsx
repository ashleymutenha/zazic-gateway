const ProgressBar = (props) => {
    const { bgcolor, completed, containerColor } = props;
  
    const containerStyles = {
      height: 5,
      width: '100%',
      backgroundColor:containerColor,
      borderRadius: 50,
      margin: 3
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right',
      fontSize:'10px'
      
    }
  
    const labelStyles = {
      padding: 1,
      color: 'white',
      fontWeight: 'bold',
      fontSize:'13px',
    
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          {/* <div style={labelStyles}>{`${completed}%`}</div> */}
        </div>
      </div>
    );
  };
  
  export default ProgressBar;