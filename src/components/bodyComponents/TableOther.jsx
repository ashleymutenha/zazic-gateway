import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { LuBellRing } from 'react-icons/lu';

export default function TableOther({headings, rowElements}){

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: 'rgb(35, 116, 129)',
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


    return (
        <div style ={{}}>

           {rowElements.length === 0 ?
                      <div style={{
                        padding: '16px',
                        border: '1px solid lightgrey',
                        margin: '16px',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '8px',
                        backgroundColor: '#f9f9f9',
                        color: '#555'
                      }}>
                        <div style={{ padding: '8px' }}>
                          <LuBellRing size={36} color="#888" />
                        </div>
                        <div style={{ marginLeft: '12px' }}>
                          No Data to Display
                        </div>
                      </div>:null
                    }

      {rowElements.length >0 ?  <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
            {headings.map((heading)=>(
                              <StyledTableCell style ={{fontSize:"13px"}}>{heading}</StyledTableCell>

            ))}
            </TableRow>
          </TableHead>
          <TableBody>
            
          {rowElements.map((element)=>(<StyledTableRow > 
                 <StyledTableCell>{element['District']}</StyledTableCell>
                 <StyledTableCell>{element['ReferrelRecordingSite']}</StyledTableCell>
                <StyledTableCell>{element['services_referred']}</StyledTableCell>
                <StyledTableCell>{element['reason_for_referral']}</StyledTableCell>
              </StyledTableRow>))}
          </TableBody>
        </Table>
      </TableContainer>: null}
      </div>
    )

}