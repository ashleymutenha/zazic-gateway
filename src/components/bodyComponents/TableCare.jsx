import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export default function TableCare({headings, rowElements}){

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
        <TableContainer component={Paper}>
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

              
                 <StyledTableCell>{element['district']}</StyledTableCell>
                 <StyledTableCell>{element['site']}</StyledTableCell>
                <StyledTableCell>{element['hivPositive']}</StyledTableCell>
                <StyledTableCell>{element['hivPositiveUC']}</StyledTableCell>
                <StyledTableCell>{element['hivCare']}</StyledTableCell>
              </StyledTableRow>))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    )

}